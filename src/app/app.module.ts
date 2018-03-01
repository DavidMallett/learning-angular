import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TestComponentComponent } from './generated/test-component/test-component.component';
import { TestPipePipe } from './generated/test-pipe.pipe';
import { CardInfoService } from './services/card-info.service';
import { DeckBuilderService } from './services/deck-builder.service';
import { KeywordHelperService } from './services/keyword-helper.service';
import { TriggerHelperService } from './services/trigger-helper.service';


@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent,
    TestPipePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    CardInfoService,
    TriggerHelperService,
    DeckBuilderService,
    KeywordHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
