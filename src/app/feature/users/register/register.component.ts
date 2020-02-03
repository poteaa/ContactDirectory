import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IdentificationSystemUser } from 'src/app/shared/models/identification-system-user';
import { UsersService } from '../users.service';
import { IdentificationType } from 'src/app/shared/constants';
import { forkJoin, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  private forkJoinSubscription: Subscription;
  @ViewChild('f') registerForm: NgForm;
  
  constructor(private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const user = new IdentificationSystemUser(form.value.firstname, form.value.lastname, IdentificationType.CC, form.value.idNumber, form.value.expeditionDate);

    const identificationObservable = this.usersService.isValidUserAgainstIdentificationSystem(user);
    const judicialObservable = this.usersService.hasJudicialProblems(user.identificationNumber)
    this.forkJoinSubscription = forkJoin([identificationObservable, judicialObservable])
      .subscribe(([identification, judicial]) => {
        if(identification && !judicial) {
          console.log('Ok');
          this.usersService.hasValidScore(user.identificationNumber)
            .subscribe(validScore => {
              if (validScore) {
                console.log('User was added to the directory');
                // TODO: change IdentificationType when created ddl
                const newUser = new User(user.firstName, user.lastName, IdentificationType.CC, user.identificationNumber, user.expeditionDate);
                this.usersService.registerUser(newUser)
                  .subscribe(() => console.log('User registered successfully.'))
                this.router.navigate(['/users']);
              } else {
                console.log('User was not added to the directory because of the score.');
              }
          });
        } else {
          console.log('Cant be added');
        }
      });
    
    form.reset();
  }

  onClear() {
    this.registerForm.reset();
  }

  ngOnDestroy():void {
    if (this.forkJoinSubscription) {
      this.forkJoinSubscription.unsubscribe();
    }
}

}
