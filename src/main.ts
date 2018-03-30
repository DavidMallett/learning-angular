import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { Card } from './app/card';
import { CardInfoService } from './app/services/card-info.service';
import { Turn } from './app/turn.class';
import { Parser } from './app/util/parser.util';
import { Permanent, Creature, Land, Artifact, Enchantment, Planeswalker } from './app/core/permanent.component';
import { TheStack } from './app/core/theStack';
import { GameInstance } from './app/core/game-instance.class';
import { Phase } from './app/phase.class';
import { Logger } from './app/util/logger.util';
import { Player } from './app/player';
import { Zone } from './app/models/zone.class';
import { Match } from './app/models/match';
import { Trigger } from './app/kersplat/trigger.class';
import { TriggerHelperService } from './app/services/trigger-helper.service';
import { Source } from './app/models/source';
import { DeckBuilderService } from './app/services/deck-builder.service';
import { Cost } from './app/kersplat/cost.class';
import { AbilityResolver } from './app/kersplat/ability-resolver.class';
import { Deck } from './app/deck.component';
import { DeckBuilderComponent } from './app/views/deck-builder/deck-builder.component';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));

const uuidv4 = require('uuid/v4');
const lib: Array<Card> = [];
const dbs = new DeckBuilderService();

// todo: find a way to do this without dbs.readDeckFromJson
// const esperShadow: Deck = dbs.readDeckFromJson('Esper Shadow', '../decks/espershadow.json');
// const grixisShadow: Deck = dbs.readDeckFromJson('Grixis Shadow', '../decks/grixisshadow.json');

// const player1: Player = new Player('David', esperShadow);
// const player2: Player = new Player('Computer', grixisShadow);

// const theGame: GameInstance = new GameInstance('modern', [player1, player2]);

// theGame.start();
