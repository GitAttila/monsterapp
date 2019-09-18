import { Injectable } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ParamMap, Params } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(public dataSvc: DataService) {}

  isEnabled(params: Params) {
    return new Promise(
      (resolve, reject) => {
        const numOfUsers = this.dataSvc.getUsersData().length;
        if (params.userId !== undefined) {
          if ((params.userId) - 1 >= 0 && (params.userId - 1) <= numOfUsers) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
  }
}
