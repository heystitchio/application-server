import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'about',
  template: 'About component'
})
export class AboutComponent { 

  constructor() {}

}
