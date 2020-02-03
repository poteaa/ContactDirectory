import { Injectable } from '@angular/core';
import { IdentificationSystemService } from 'src/app/core/http/external-services/identification-system.service';
import { IdentificationSystemUser } from 'src/app/shared/models/identification-system-user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JudicialSystemService } from 'src/app/core/http/external-services/judicial-system.service';
import { HttpBackendService } from 'src/app/core/http/http-backend.service';
import { User } from './shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly identificationUsersUrl = 'users';
  private readonly judicialUsersUrl = 'users';
  private readonly backendScoreUrl = 'users';
  private readonly minimumValidScore = 50;

  constructor(private identificationSystemService: IdentificationSystemService,
              private judicialSystemService: JudicialSystemService,
              private httpBackendService: HttpBackendService) { }

  getRegisteredUsers(): Observable<User[]> {
    return this.httpBackendService.get<User[]>(this.backendScoreUrl);
  }

  registerUser(user: User): Observable<User> {
    return this.httpBackendService.post<User, User>(this.backendScoreUrl, user);
  }

  getIdentificationSystemUser(id: string): Observable<IdentificationSystemUser> {
    return this.identificationSystemService.get<IdentificationSystemUser>(`${this.identificationUsersUrl}/${id}`);
  }

  isValidUserAgainstIdentificationSystem(user: IdentificationSystemUser): Observable<boolean> {
    return this.getIdentificationSystemUser(user.identificationNumber)
      .pipe(map(u => {
        return this.compareUsers(user, u);
      }))
  }

  hasJudicialProblems(userId: string): Observable<boolean> {
    return this.judicialSystemService.get(`${this.judicialUsersUrl}/${userId}`)
      .pipe(map(u => {
        if (u) {
          return true;
        } else {
          return false;
        }
      }))
  }

  hasValidScore(userId: string): Observable<boolean> {
    return this.httpBackendService.get(`${this.judicialUsersUrl}/${userId}/score`)
    .pipe(map(score => {
      if (score > this.minimumValidScore) {
        return true;
      } else {
        return false;
      }
    }))
  }

  private compareUsers(user: IdentificationSystemUser, identificationSystemUser: IdentificationSystemUser) {
    return user.firstName === identificationSystemUser.firstName &&
      user.lastName === identificationSystemUser.lastName &&
      user.identificationType === identificationSystemUser.identificationType &&
      user.identificationNumber === identificationSystemUser.identificationNumber;
  }

}
