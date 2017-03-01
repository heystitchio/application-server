import { Component,
         ChangeDetectionStrategy,
         OnDestroy,
         ViewEncapsulation }      from '@angular/core';
import { Subscription }           from 'rxjs/Subscription';

import { AuthModelService,
         AuthUser }               from '../../../+auth/models';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'main-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class MainNavComponent implements OnDestroy {

  public authUser: AuthUser;

  private authUserSubscription: Subscription;

  constructor(
    public _auth: AuthModelService
  ) {
    this.authUserSubscription = this._auth.current$.subscribe(user => this.authUser = user);
  }

  ngOnDestroy(): void {
    this.authUserSubscription.unsubscribe();
  }

}