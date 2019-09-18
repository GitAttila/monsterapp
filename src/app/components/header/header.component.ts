import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroyed$: Subject<void> = new Subject();
  public returnToMainPage = false;
  appName = 'MonsterApp';
  appSectionName = 'Users';

  constructor(public router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroyed$)
      )
      .subscribe((navEnd: NavigationEnd) => {
        if (navEnd.url.search('edit') > -1) {
          this.appSectionName = 'Edit user';
          this.returnToMainPage = true;
        } else if (navEnd.url.search('newuser') > -1) {
          this.appSectionName = 'Add new user';
          this.returnToMainPage = true;
        } else  {
          this.appSectionName = 'Users';
          this.returnToMainPage = false;
        }
      }
      );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
