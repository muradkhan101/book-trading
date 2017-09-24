export class User {
  private id : string;
  public name : string;
  public email : string;
  private password : string;

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  getPassword(): string {
    return this.password;
  }
}
