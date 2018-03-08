import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TestComponentComponent } from './generated/test-component/test-component.component';
import { TestPipePipe } from './generated/test-pipe.pipe';
import { CardInfoService } from './services/card-info.service';
import { DeckBuilderService } from './services/deck-builder.service';
import { KeywordHelperService } from './services/keyword-helper.service';
import { TriggerHelperService } from './services/trigger-helper.service';
import { TargetPipe } from './pipes/target-pipe';
import { Logger } from './util/logger.util';
import { DeckBuilderComponent } from './views/deck-builder/deck-builder.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
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
    TriggerHelperService,
    DeckBuilderService,
    KeywordHelperService,
    Logger
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
