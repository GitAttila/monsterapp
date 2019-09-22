import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Iuser } from '../../models/user.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit, OnDestroy {
  private paramSub: Subscription;
  userForm: FormGroup;
  isLoading = false;
  public mode = 'add';
  private userId: string;

  constructor(
    public dataSvc: DataService,
    public router: Router,
    public route: ActivatedRoute) {}

  generateAvatar(type?: string) {
    type = type || 'fullname';
    let res = '';
    let space = ' ';
    let fn = (this.userForm.get('firstname').value || '');
    let ln = (this.userForm.get('lastname').value || '');
    if (type === 'initials') {
      fn = fn.charAt(0).toUpperCase();
      ln = ln.charAt(0).toUpperCase();
      space = '';
    }
    (fn === '' && ln === '') ? res = '...' : res = fn + space + ln;
    return res;
  }

  onSaveUser() {
    if (this.userForm.invalid) {
      console.log(this.userForm);
      return;
    }
    const newUser: Iuser = {
      id: this.dataSvc.getUsersData().length + 1,
      firstname: this.userForm.get('firstname').value || '',
      lastname: this.userForm.get('lastname').value || '',
      nickname: this.userForm.get('nickname').value || '',
      description: this.userForm.get('description').value || '',
      avatarpath: '',
      phone: this.userForm.get('phone').value || '',
      email: this.userForm.get('email').value || ''
    };
    if (this.mode === 'add') {
      this.dataSvc.addUser(newUser);
    } else if (this.mode === 'edit') {
      this.dataSvc.editUser(parseInt(this.userId, 10), newUser);
    }
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      firstname: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(3)
        ]
      }),
      lastname: new FormControl(null, {
        validators: [Validators.required]
      }),
      nickname: new FormControl(null, {}),
      description: new FormControl(null, {}),
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      phone: new FormControl(null, {})
    });
    console.log(this.userForm.get('firstname').errors );
    this.paramSub = this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('userId')) {
          this.mode = 'edit';
          this.userId = paramMap.get('userId');
          const user = this.dataSvc.getUserDataById(parseInt(this.userId, 10));
          this.userForm.setValue({
            firstname: user.firstname,
            lastname: user.lastname,
            nickname: user.nickname,
            description: user.description,
            phone: user.phone,
            email: user.email
          });
        } else {
          this.mode = 'add';
          this.userId = null;
        }
      });
  }

  ngOnDestroy() {
    this.paramSub.unsubscribe();
  }

}
