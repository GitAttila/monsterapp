import { Injectable } from '@angular/core';
import { APP_USERS_DATA } from '../data/users.data';
import { Iuser } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root'})
export class DataService {
  private userData: Iuser[] = APP_USERS_DATA;

  constructor(
    public router: Router
  ) {}

  getUsersData(): Iuser[] {
    if (this.userData !== undefined) {
      return this.userData;
    }
    return [];
  }

  getUserDataById(id: number): Iuser {
    if (this.userData[id - 1] !== undefined) {
      return this.userData[id - 1];
    }
    return;
  }

  addUser(user: Iuser) {
    this.userData.push(user);
    this.router.navigate(['/']);
  }

  editUser(userId: number, newUserData: Iuser) {
    const foundUser: Iuser = this.userData[userId - 1];
    foundUser.firstname = newUserData.firstname;
    foundUser.lastname = newUserData.lastname;
    foundUser.nickname = newUserData.nickname;
    foundUser.description = newUserData.description;
    foundUser.email = newUserData.email;
    foundUser.phone = newUserData.phone;
    this.router.navigate(['/']);
  }
}
