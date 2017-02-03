import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { MetaSetterService } from './shared/services/meta-setter.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent { }
