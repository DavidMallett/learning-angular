
export class Oper {

  public constructor() {}

  // a method that removes the first instance of an item from an array
  public removeFirst(arr: Array<any>, item: any): any {
    // validate that the array is truthy and not empty, null, or undefined
    // validate that item is an instanceof the Array type

    // deliberately use a for loop for greater efficiency

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === item) {
        return arr.splice(i, 1)[0];
      }
    }
  }

}
