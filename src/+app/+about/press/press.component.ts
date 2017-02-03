import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'press',
  template: 'Press component'
})
export class PressComponent {
  constructor(@Inject('req') req: any) {
    console.log('req', req)

  }
}
