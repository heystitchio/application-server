import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { HtmlMeta } from '../meta/html.meta';
import { OpenGraphMeta } from '../meta/opengraph.meta';
import { TwitterMeta } from '../meta/twitter.meta';

@Injectable()
export class MetaSetterService {

  constructor(@Inject(DOCUMENT) private document: any) {}

  private renderer: any;

  // TODO: Refactor into Server-only implementation.
  public setMeta(renderer: any, title: string, htmlMeta: HtmlMeta, ogMeta: OpenGraphMeta, tweetMeta: TwitterMeta): void {
    this.renderer = renderer;

    this.setTitle(title);
    this.setHtmlMeta(htmlMeta);
    this.setOpenGraphMeta(ogMeta);
    this.setTwitterMeta(tweetMeta);
  }

  private setTitle(title: string): void {
    var el = this.renderer.selectRootElement('title');
    this.renderer.setText(el, title);
  }

  private setHtmlMeta(htmlMeta: HtmlMeta): void {
    for (var key in htmlMeta) {
      if (htmlMeta.hasOwnProperty(key)) {
        var el = this.renderer.selectRootElement(`meta[name=${key}]`);
        this.renderer.setElementAttribute(el, 'content', htmlMeta[key]);
      }
    }
  }

  private setOpenGraphMeta(ogMeta: OpenGraphMeta): void {
    for (var key in ogMeta) {
      if (ogMeta.hasOwnProperty(key)) {
        var metaRef = `og:${key}`;
        this.replaceMetaData(metaRef, ogMeta[key]);
      }
    }
  }

  private setTwitterMeta(tweetMeta: TwitterMeta): void {
    for (var key in tweetMeta) {
      if (tweetMeta.hasOwnProperty(key)) {
        var metaRef = `twitter:${key}`;
        this.replaceMetaData(metaRef, tweetMeta[key]);
      }
    }
  }

  private replaceMetaData(metaRef, metaContent) {
    var el = this.renderer.selectRootElement(`meta[name=${metaRef}]`);
    this.renderer.setElementAttribute(el, 'content', metaContent);
  }

}