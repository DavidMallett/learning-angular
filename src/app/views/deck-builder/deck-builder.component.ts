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

  submit($event): Deck {
    console.log('clicked submit button');
    console.log('value of input:\n' + $event.target.value);
    this.currentDeckList = this.dbs.readDeckFromBrowser(this.name, $event.target.value);
    // const path: string = this.dbs.writeDeckToFile(uuid(), list);
    // this.currentDeckList = this.dbs.readDeckFromTxt(this.name, path);
    this.stats = new DeckStats(this.currentDeckList);
    this.stats.sampleHand();
    return this.currentDeckList;
  }

  setDeckName($event): void {
    // $event.target ? console.log('event has a target') : console.log('event does not have a target');
    this.name = $event.target.value;
    this.currentDeckList.name = $event.target.value;
    console.log('new deck name: ' + this.name);
  }

}

