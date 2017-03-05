import { Component, Inject, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'single-project',
  template: 'Single Project component'
})
export class SingleProjectComponent {
  constructor(@Inject('req') req: any) {
    console.log('req', req)

  }
}
