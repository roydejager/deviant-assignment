// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { ClarityModule } from '@clr/angular';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Store
import { reducers, metaReducers } from './store/reducers';
import { effects } from './store/effects';

// Services
import { InMememoryDataService } from '../app/services/in-memory-data.service';
import { ApiService } from '../app/services/api.service';
import { LocalStorageService } from '../app/services/local-storage.service';

// Components
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '../environments/environment';
import { AssignmentComponent } from './modules/assignment/assignment.component';
import { QuestionComponent } from './modules/assignment/components/question/question.component';
import { IntroductionComponent } from './modules/assignment/components/introduction/introduction.component';
import { CalculateTotalPercentagePipe } from './pipes/delta-calculations.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AssignmentComponent,
    QuestionComponent,
    IntroductionComponent,
    CalculateTotalPercentagePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClarityModule,
    HttpClientModule,
    SharedModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
