export class Book {
  public title : string;
  public description : string;
  public image : string;
  public uuid : string;
  public published : string;
  public author : string;
  public _id : string;
  constructor(obj) {
    this.title = obj.title;
    this.description = obj.description;
    this.image = obj.image;
    this.uuid = obj.uuid;
    this.published = obj.published;
    this.author = obj.author;
    this._id = obj._id;
  }
}
