import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'how-it-works',
  template: 'How It Works component'
})
export class HowItWorksComponent {
  constructor(@Inject('req') req: any) {
    console.log('req', req)

  }
}
