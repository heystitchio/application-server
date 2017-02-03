import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'welcome',
  template: 'Welcome component'
})
export class WelcomeComponent {
  constructor(@Inject('req') req: any) {
    console.log('req', req)

  }
}
