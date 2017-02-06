import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { DomAdapter, getDOM } from '@angular/platform-browser/src/dom/dom_adapter';
import { isNode } from 'angular2-universal';


export interface MetaDefinition {
  charset?: string;
  content?: string;
  httpEquiv?: string;
  id?: string;
  itemprop?: string;
  name?: string;
  property?: string;
  scheme?: string;
  url?: string;
  [prop: string]: string;
}


@Injectable()
export class Meta {
  private _dom: DomAdapter = getDOM();

  constructor(
    @Inject(DOCUMENT) private _document: any
  ) {}

  setTitle(title: string): void {
    this._document.title = `Stitch » ${title}`;
  }

  addTags(...tags: Array<MetaDefinition|MetaDefinition[]>): HTMLMetaElement[] {
    if (isNode) {
      const presentTags = this._flattenArray(tags);
      if (presentTags.length === 0) return [];
      return presentTags.map((tag: MetaDefinition) => this._addInternal(tag));
    }
  }

  private _addInternal(tag: MetaDefinition): HTMLMetaElement {
    const meta: HTMLMetaElement = this._createMetaElement();
    this._prepareMetaElement(tag, meta);
    this._appendMetaElement(meta);
    return meta;
  }

  private _createMetaElement(): HTMLMetaElement {
    return this._dom.createElement('meta') as HTMLMetaElement;
  }

  private _prepareMetaElement(tag: MetaDefinition, el: HTMLMetaElement): HTMLMetaElement {
    Object.keys(tag).forEach((prop: string) => this._dom.setAttribute(el, prop, tag[prop]));
    return el;
  }

  private _appendMetaElement(meta: HTMLMetaElement): void { 
    const head = this._document.head; 
    this._dom.appendChild(head, meta);
  }

  private _removeMetaElement(meta: HTMLMetaElement): void {
    const head = this._dom.parentElement(meta);
    this._dom.removeChild(head, meta);
  }

  private _flattenArray(input: any[], out: any[] = []): any[] {
    if (input) {
      for (let i = 0; i < input.length; i++) {
        const item: any = input[i];
        if (Array.isArray(item)) {
          this._flattenArray(item, out);
        } else if (item) {
          out.push(item);
        }
      }
    }
    return out;
  }
}
