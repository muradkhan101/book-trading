export class Book {
  private id : string;
  public title : string;
  public description : string;
  public image : string;
  public uuid : string;
  public published : string;
  public author : string;
  constructor(obj, id) {
    this.id = id;
    this.title = obj.title;
    this.description = obj.description;
    this.image = obj.image;
    this.uuid = obj.uuid;
    this.published = obj.published;
    this.author = obj.author;
  }
}
