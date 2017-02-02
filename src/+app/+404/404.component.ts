import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: '404',
  template: '404 component'
})
export class NotFoundComponent {
  constructor(@Inject('req') req: any) {
    console.log('req', req)

  }
}
