import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../interfaces';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() detailsUser: IUser;

  constructor() { }

  ngOnInit() {
  }

}
