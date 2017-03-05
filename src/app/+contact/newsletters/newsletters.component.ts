import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'newsletters',
  template: 'Newsletters component'
})
export class NewslettersComponent {
  constructor(@Inject('req') req: any) {
    console.log('req', req)

  }
}
