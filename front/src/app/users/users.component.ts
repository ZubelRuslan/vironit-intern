import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { IUser } from '../interfaces';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: IUser[];
  selectedUser: IUser;

  constructor(private userService: UserServiceService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.users = this.userService.getUsers();
  }

  selectUser(user): void { // please remove if not needed
    this.selectedUser = user;
  }
}
