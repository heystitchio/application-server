import { Component, AfterViewInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { Meta, MetaDefinition } from '../../angular2-meta';


@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'discover',
  styleUrls: [ './discover.component.css' ],
  templateUrl: './discover.component.html'
})
export class DiscoverComponent implements AfterViewInit {
  data: any = {};
  meta: MetaDefinition[] = [];

  constructor(
    private _meta: Meta,
  ) {
    // we need the data synchronously for the client to set the server response
    // we create another method so we have more control for testing
    //this.universalInit();

    this.meta = [
      { name: 'description', content: 'Set by meta setter service', id: 'desc' },
      // Twitter
      { name: 'twitter:title', content: 'Set by meta setter service' },
      // Google+
      { itemprop: 'name', content: 'Set by meta setter service' },
      { itemprop: 'description', content: 'Set by meta setter service' },
      // Facebook / Open Graph
      { property: 'fb:app_id', content: 'Set by meta setter service' },
      { property: 'og:title', content: 'Set by meta setter service' }
    ];
  }

  /*universalInit() {
    this.model.get('/data.json').subscribe(data => {
      this.data = data;
    });
  }*/

  ngAfterViewInit() {
    this._meta.setTitle('Discover')
    this._meta.addTags(this.meta);
  }

}
