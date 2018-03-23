IN GAME OBJECTS

IMPORTANT NOTE: We DO NOT NEED 2 way data binding on every object. In fact, most objects should only import their dependencies, not their dependents

(reorganizing the folder structure of the repo)
PROPOSED FUTURE STRUCTURE:

src/
  core/
    GameInstance
    Battlefield
    Deck
    Player
    Card
  in-game-objects/
    components/
      ActivatedAbility
      Modifier
      KeywordHandler
      ManaAbility
      StaticEffect
    Permanent
      Creature
      Artifact
      Enchantment
      Planeswalker
      Land
    Spell
      Instant
      Sorcery
    TheStack
    ManaCost
    Cost
  game-structure/
    Turn
    Phase
    Zone
      Graveyard
      Exile
      Library
      Hand
      Command Zone
      Battlefield
    Priority
  triggerHandlers/
    Trigger
    TriggerResolver
  services/
    CardInfoService
    DeckBuilderService
    KeywordHelperService
    TriggerHelperService




Trigger
  public id: string;
  public conditions?: Array<string>;
  public actions?: string[];
  public source?: Source;
  public target?: Target;
  public effect?: Array<string>;

ActivatedAbility
  public id: string;
  public cost: Cost;
  public type: string;
  public target: Target;
  public targets: Array<string>; // array of uuids
  public originId: string;
  public effect: Function;

ManaAbility extends ActivatedAbility
  public id: string;
  public cost: Cost;
  public type: string;
  public target: Target;
  public targets: Array<string>;
  public source: string;
  ---
  public amount: number;
  public taponly: boolean;
  public color: string;

Target
  targetType: string;
  targetId?: string;
  targetIds?: Array<string>;
  reference?: any;

StaticEffect
  public endsAt: string;
  public effect: string;
  public target: Target;

Cost
  public tap: boolean;
  public manaCost?: ManaCost;
  public loyaltyCost?: string;
  public discardCost?: number; 
  public lifeCost?: number;
  public additionalCosts?: Array<any>;

Source
  public type: string;
  public id?: string;
  public reference?: any;

---

ToDo:

BoardState Class (could also be a function in InfoService or player.class)
  constructor(game: GameInstance, player: Player)
  public controller: Player;
  public field: Array<Permanent>;
  public yard: Array<Card>;
  public hand: Hand;
  public knownInformation: KnownInformation (see infoService);

UnknownInfo Class // used to represent unknown information, like what card you draw in future decision trees
  // also, unknown cards should have a threat level equal to the average of all the cards we've seen thus far. If we are playing around certain cards or know about cards that are in a hidden zone (perhaps because opp revealed them), then those get added too. For example, if player.library.cardsLeft = 36 and we attacked with a Goblin Guide earlier and saw a Lightning Bolt, then (1/36) * LB's threat level gets added to the cumulative average and at least 1 of the decision trees treats this as "known information" (i.e. they will replace the unknown information in that node)

DecisionTree Class
  public instance: GameInstance;
  public player: Player;
  public opponent: Player;
  public state: BoardState;
  public children: Array<DecisionTree>; // unlike a binary tree, each node can have lots of children because Magic is a hella complex game
  public parent?: DecisionTree || null;

  public constructor(state: BoardState);

  public calculateChildren(node: DecisionTree): DT // looks at all our available actions in the current state and makes a new tree for each one, then pushes them all to the children[]  array.



DecisionHelperService
  // aggregates creature.threatLevel(), known information, etc to determine whether to play aggressively or defensively
  
  public findBeneficialAttacks(ourBoard: BoardState, oppBoard: BoardState): CombatPhase (see combatController)
  
  public findBlocks(incoming: Array<AttackingCreature>): Array<BlockingCreature> (see combatController)
  
  public playAround(card: Card): void // play as though we are blocked from taking actions that card could interfere with; for example, playAround(cis.findCardByName('Spell Pierce')) would cause us to not take actions if in the resulting board state infoService.manaAvailable(self) =< 2 (discard all decision trees where tree.infoService.manaAvailable(self) <== 2)

  public canRespond(): boolean // looks at the stack, our board, and our hand to determine whether or not we can respond to something (answers question "is it possible for me to respond to this?")

  public shouldRespond(): boolean // determines whether responding will help us or not (answers question "is it beneficial for me to respond to this?")

  public shouldBlock(attacker: Creature, blocker: Creature): boolean // does some simple calculations to determine whether we should block. findBlocks calls this method a bunch of times

  public shouldAttack(c: Creature): boolean // see above

  public shouldHoldUpMana(): boolean // looks at our instant-speed interaction and known info about what the opponent has / their current board state to determine whether we should take no action (true) or if we should spend mana / tap out to try to resolve something at sorcery speed

  public mustResolve(c: Card): void // used for non-state-based win conditions (i.e. Approach of the Second Sun, Coalition Victory, etc) and spells for which there exist no winning DecisionTrees if we don't resolve that spell to indicate that we won't cast it unless we can play around their responses / hold up counter magic

  public ignorePossibleResponses(c: Card): void // used for things that are uncounterable or otherwise don't matter if they resolve (Approach on the first cast, for instance). By default the computer should play around Counterspells if the opponent is playing blue and removal otherwise



DecisionTreeService
  public buildDecisionTree(n: number): DecisionTree
  // builds a decision tree with a height of n (resulting in sum(2^n) nodes where each node has a boardState, gameInstance, etc).

  public findBestValueTree(tree: DecisionTree): DecisionTree // returns the tree that results in us accumulating the most resources (cards, life, permanents, etc)

  public findBestDamageTree(tree: DT): DT // returns the tree in which we cause the most damage

  public findBestPillowFortTree(tree: DT): DT // returns the tree in which we take the least damage

  public findSafestTree(tree: DT): DT // similar to findBestPillowFortTree, will pick the tree that allows it to play around the most things

  public findGoldfishTree(tree: DT): DT // returns a tree in which we make linear plays and don't interact at all with the opponent (AKA "Goldfishing"). Nothing is played around and for fair decks this is otherwise the same as findBestDamageTree. Use for Dredge, Merfolk, Storm, and other decks that don't really care about what the opponent is doing

  public addChild(tree: DT): void // maybe  

Note: V2 will probably go into a new repo so I don't have to mess with telling tsconfig which dirs to compile and which to ignore

3/15/18 Proposal for new data structure:
(V2 Refactor)
/Core/
  /AI/
    DecisionTree
  /Card/
    Card
    CreatureCard
    NonCreatureCard
    Spell
    CreatureSpell
    <Permanent>Spell
    Instant
    Sorcery
  /Mechanics/
    GameInstance
    ostensibly, additional helper classes around modifying objects
    Turn
    Phase
    --> idea: Turn should have all 12 phases; the triggerHelperService can, at the beginning of each turn, register triggers on each phase change as is appropriate
    Player
    TheStack
    Game(?)
    Match
  /Zones/
    Zone
    Battlefield
    Graveyard
    Hand
    Deck
    Exile
  /Tangibles/
    Permanent
    Creature
    Artifact
    Enchantment
    Planeswalker
    Land
    ActivatedAbility
    ManaAbility
  /Intangibles/
    Cost
    ManaCost
    Priority
    Emblem
    Modifier
    TriggeredAbility
    StaticEffect
    Trigger
    Condition
    Source
    Target
  /Analytics/
    DeckStats
    ThreatLevel
    KnownInfo
  /Tools/
    TriggerResolver
    BoardState
    Util
    Parser
    Oper
  /Services/
    InfoService
    DecisionHelperService
    etc
/Prototype/
  /cards/
    /creatures/
      DeathShadow
      SnapcasterMage
      TasigurGoldenFang
      GurmagAngler
      StreetWraith
    /instants/
      StubbornDenial
      Opt
    /sorceries/
      Thoughtseize
      InquisitionKozilek
      SerumVisions
    /land/
      Island
      Swamp
      Steam Vents
      Watery Grave
      Blood Crypt
      Bloodstained Mire
      Polluted Delta
      Scalding Tarn
/DeckBuilder/


To be clear, we MUST NOT HAVE circular dependencies.

Each class 