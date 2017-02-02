import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'signup',
  template: 'Signup component'
})
export class SignupComponent {
  constructor(@Inject('req') req: any) {
    console.log('req', req)

  }
}
