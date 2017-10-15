import { Book } from '../books/book';

export class Trade {
  public wantBook : Book;
  public offerBook : Book;
  public from : Object;
  public status : string;
  public uuid : string;
  public completed : Date;
  public _id : string;
  constructor(obj) {
    this.wantBook = new Book(obj.wantBook);
    this.offerBook = new Book(obj.offerBook);
    this.from = obj.from;
    this.status = obj.status;
    this.uuid = obj.uuid;
    this.completed = obj.completed;
    this._id = obj._id;
  }
}
