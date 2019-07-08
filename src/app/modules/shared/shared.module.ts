// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { ClarityModule } from '@clr/angular';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

// Services
import { ApiService } from './services/api.service';
import { InMememoryDataService } from './services/in-memory-data.service';
import { LocalStorageService } from './services/local-storage.service';

// Components
import { TextareaComponent } from './components/textarea/textarea.component';
import { RadioButtonsComponent } from './components/radio-buttons/radio-buttons.component';


@NgModule({
  declarations: [
    TextareaComponent,
    RadioButtonsComponent,

  ],
  imports: [
    CommonModule,
    ClarityModule,
    HttpClientInMemoryWebApiModule.forRoot(InMememoryDataService),
  ],
  exports: [
    TextareaComponent,
    RadioButtonsComponent,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ApiService,
        InMememoryDataService,
        LocalStorageService
      ]
    };
  }
}
