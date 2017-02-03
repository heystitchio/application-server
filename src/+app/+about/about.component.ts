import { Component, AfterViewInit, Renderer, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { MetaSetterService } from '../shared/services/meta-setter.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'about',
  template: 'About component'
})
export class AboutComponent implements AfterViewInit { 

  constructor(
    private metaSetter: MetaSetterService,
    public renderer: Renderer) { }

  ngAfterViewInit(): void {
      this.metaSetter.setMeta(
        this.renderer,
        'Stitch » About',
        {
          author: 'Stitch',
          description: 'Test description set by the meta service.'
        },
        {
          url: 'heystitch.io',
          title: 'Stitch',
          description: 'Test description set by the meta service.',
          image: 'https://placehold.it/350x150'
        },
        {
          creator: 'Stitch Online Services',
          title: 'Stitch',
          description: 'Test description set by the meta service.',
          image: 'https://placehold.it/350x150'
        });
  }

}
