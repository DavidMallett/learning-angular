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