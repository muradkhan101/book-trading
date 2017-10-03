export class User {
  public id : string;
  public email : string;
  public password : string;
  public lastName : string;
  public firstName : string;
  constructor(id: string, firstName: string, email: string, password: string) {
    this.id = id;
    this.firstName = firstName;
    this.email = email;
    this.password = password;
  }

  getPassword(): string {
    return this.password;
  }
}
