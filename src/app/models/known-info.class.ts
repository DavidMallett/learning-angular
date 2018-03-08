import { Card } from '../card';

export class KnownInformation {

  opponentCards?: Array<Card>;
  // opponentBottomCard?: Card;
  // opponentTopCard?: Card;
  // for now, we will limit this to known cards in opp's hand.
  // in the future, we will include topCardLibrary, opponentTopCardLibrary, bottomCard, morphed/face-down cards in exile, etc
  // also, should account for cards with the same name but different art

  constructor() {
    this.opponentCards = [];
  }

  public push(card: Card) {
    this.opponentCards.push(card);
  }

}
