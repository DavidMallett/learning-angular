
export class Source {

  public type: string;
  public id?: string;
  public reference?: any;

  public constructor(t: string, ref?: any) {
    this.type = t;
    this.reference = ref;
    this.id = ref.id;
  }
}
