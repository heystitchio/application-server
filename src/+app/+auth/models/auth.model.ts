export interface Auth {
  token: string;
  error: string;
  current: AuthUser;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  emailConfirm: Boolean;
  password?:string;
}
