import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeckBuilderService } from '../../services/deck-builder.service';
import { CardInfoService } from '../../services/card-info.service';
import { Deck } from '../../deck.component';
import { DeckStats } from '../../deckstats/deck-stats.class';

const uuid = require('uuid/v4');

@Component({
  selector: 'app-deck-builder',
  templateUrl: './deck-builder.component.html',
  styleUrls: ['./deck-builder.component.css']
})
export class DeckBuilderComponent implements OnInit {

  public dbs: DeckBuilderService;
  public cis: CardInfoService;
  public currentDeckList: Deck;
  public name: string;
  public stats: DeckStats;

  constructor() { }

  ngOnInit() {
    this.dbs = new DeckBuilderService();
    this.cis = new CardInfoService();
    this.name = 'no name';
    this.currentDeckList = new Deck([], this.name);
    this.stats = new DeckStats(this.currentDeckList);

    // const path = '../../../../decks/espershadow.json';

    // const deck = dbs.readDeckFromJson('Esper Shadow', path);
  }

  submit(list: string): Deck {
    this.currentDeckList = this.dbs.readDeckFromBrowser(this.name, list);
    // const path: string = this.dbs.writeDeckToFile(uuid(), list);
    // this.currentDeckList = this.dbs.readDeckFromTxt(this.name, path);
    this.stats = new DeckStats(this.currentDeckList);
    return this.currentDeckList;
  }

  setDeckName(value: string): void {
    this.name = value;
    this.currentDeckList.name = value;
  }

}

