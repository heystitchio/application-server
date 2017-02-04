import { Component, AfterViewInit, Renderer, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

// import { ModelService } from '../shared/model/model.service';
import { MetaSetterService } from '../shared/services/meta-setter.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'discover',
  styleUrls: [ './discover.component.css' ],
  templateUrl: './discover.component.html'
})
export class DiscoverComponent implements AfterViewInit {
  data: any = {};
  constructor(
    // public model: ModelService,
    private metaSetter: MetaSetterService,
    public renderer: Renderer
  ) {
    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    //this.universalInit();
  }

  /*universalInit() {
    this.model.get('/data.json').subscribe(data => {
      this.data = data;
    });
  }*/

  ngAfterViewInit(): void {
      this.metaSetter.setMeta(
        this.renderer,
        'Stitch » Discover',
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
