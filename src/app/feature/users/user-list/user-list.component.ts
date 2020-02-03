import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {

  registeredUsers: User[];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getRegisteredUsers()
      .subscribe(users => this.registeredUsers = users);
  }

}
