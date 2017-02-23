export interface AuthService {

  login(username?, password?): void;
  loginWithGoogle(): void;
  logout(): void;
  signup(email?, password?): void;
  isAuthenticated(): boolean;

}
