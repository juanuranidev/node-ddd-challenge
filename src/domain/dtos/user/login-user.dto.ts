export class LoginUserDto {
  private constructor(
    public readonly username: string,
    public readonly password: string
  ) {}

  static create(data: { [key: string]: any }): [string?, LoginUserDto?] {
    const { username, password } = data;

    if (!username) return ["username is required", undefined];
    if (!password) return ["password is required", undefined];

    return [undefined, new LoginUserDto(username, password)];
  }
}
