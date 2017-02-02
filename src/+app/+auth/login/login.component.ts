import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'login',
  template: 'Login component'
})
export class LoginComponent {
  constructor(@Inject('req') req: any) {
    console.log('req', req)

  }
}
