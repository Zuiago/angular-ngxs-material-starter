export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] Logout'
}

export class ActionAuthLogin {
  static readonly type = AuthActionTypes.LOGIN;
}

export class ActionAuthLogout {
  static readonly type = AuthActionTypes.LOGOUT;
}
