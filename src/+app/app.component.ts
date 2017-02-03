import { Component, ElementRef, AfterViewInit, Renderer, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { MetaSetterService } from './shared/services/meta-setter.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit { 

  constructor(
    private metaSetter: MetaSetterService,
    public renderer: Renderer) { }

  ngAfterViewInit(): void {
      this.metaSetter.setMeta(
        this.renderer,
        'Stitch | Title set by meta service',
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
