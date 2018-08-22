import { Action } from '@ngrx/store';
import { User, Authenticate } from './models/user';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  LoginRedirect = '[Auth] Login Redirect'
}

export class Login {
  static readonly type = AuthActionTypes.Login;

  constructor(readonly payload: Authenticate) {}
}

export class LoginSuccess {
  static readonly type = AuthActionTypes.LoginSuccess;

  constructor(readonly payload: { user: User }) {}
}

export class LoginFailure {
  static readonly type = AuthActionTypes.LoginFailure;

  constructor(readonly payload: any) {}
}

export class LoginRedirect {
  static readonly type = AuthActionTypes.LoginRedirect;
}

export class Logout {
  static readonly type = AuthActionTypes.Logout;
}

export type AuthActionsUnion =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout;
