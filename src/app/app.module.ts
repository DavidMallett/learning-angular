import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TestPipePipe } from './generated/test-pipe.pipe';
import { CardInfoService } from './services/card-info.service';
import { DeckBuilderService } from './services/deck-builder.service';
import { KeywordHelperService } from './services/keyword-helper.service';
import { TargetPipe } from './pipes/target-pipe';
import { Logger } from './util/logger.util';
import { DeckBuilderComponent } from './views/deck-builder/deck-builder.component';
import { TriggerHelperService } from './services/trigger-helper.service';
import { InfoService } from './services/info-service';
import { DecisionHelperService } from './services/decision-helper.service';


@NgModule({
  declarations: [
    AppComponent,
    TestPipePipe,
    TargetPipe,
    DeckBuilderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    CardInfoService,
    DeckBuilderService,
    KeywordHelperService,
    Logger,
    TriggerHelperService,
    InfoService,
    DecisionHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
