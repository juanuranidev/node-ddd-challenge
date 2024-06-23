export class UserEntity {
  constructor(
    public id: string,
    public username: string,
    public token?: string
  ) {}

  public static create(data: { [key: string]: any }): UserEntity {
    const { id, username, token } = data;

    if (!id) throw "id is required";
    if (!username) throw "username is required";

    return new UserEntity(id, username, token);
  }
}
