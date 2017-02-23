import { AuthService } from './auth.service';


export class NodeAuthService implements AuthService {

  constructor(
    private authenticationId,
    private isLoggedIn:boolean
  ) {}

  public login(): void {
    throw new Error("Login event cannot be called while doing server side rendering");
  }

  public loginWithGoogle(): void {
    throw new Error("Login event cannot be called while doing server side rendering");
  }

  public logout(): void {
    throw new Error("Logout event cannot be called while doing server side rendering");
  }

  public signup(): void {
    throw new Error("Signup event cannot be called while doing server side rendering");
  }

  public isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

}
