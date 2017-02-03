import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'main-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class MainNavComponent { }