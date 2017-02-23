import { NgModule,
         ModuleWithProviders }    from '@angular/core';
import { CommonModule }           from '@angular/common';
import { RouterModule }           from '@angular/router';
import { FormsModule,
         ReactiveFormsModule }    from '@angular/forms';

import { SharedComponentsModule } from './components/components.module';
import { ApiService }             from './cache/api.service';
import { HashService }            from './cache/hash.service';


const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
  SharedComponentsModule
];

const PIPES = [
  // put pipes here
];

const COMPONENTS = [
  // put shared components here
];

const PROVIDERS = [
  ApiService,
  HashService
]

@NgModule({
  imports: [
    ...MODULES
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  exports: [
    ...MODULES,
    ...PIPES,
    ...COMPONENTS
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ...PROVIDERS
      ]
    };
  }
}
