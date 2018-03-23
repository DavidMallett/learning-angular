
export interface Modifier {
  id: string;
  keywords?: Array<string>;
  duration?: string;
  host?: any; // reference to the thing being modified, if applicable

  apply(): void;

  expire(): void;


}
