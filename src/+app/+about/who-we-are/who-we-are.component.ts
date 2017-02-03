import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'who-we-are',
  template: 'Who We Arecomponent'
})
export class WhoWeAreComponent {
  constructor(@Inject('req') req: any) {
    console.log('req', req)

  }
}
