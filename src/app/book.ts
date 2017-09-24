export class Book {
  private id : number;
  public title : string;
  public description : string;
  public img : string;
  constructor(id : number, title : string, desc : string) {
    this.id = id;
    this.title = title;
    this.description = desc;
  }
}
