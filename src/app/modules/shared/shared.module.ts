// Angular
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Modules
import { ClarityModule } from '@clr/angular';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// Pipes
import { CalculateTotalPercentagePipe } from './pipes/delta-calculations.pipe';

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
    CalculateTotalPercentagePipe
  ],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InMememoryDataService),
  ],
  exports: [
    TextareaComponent,
    RadioButtonsComponent,
    CalculateTotalPercentagePipe
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
