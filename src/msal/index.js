import * as Msal from 'msal'
import config from '../config'
import { access } from 'fs';

export default class AuthService {
  constructor() {
    this.applicationConfig = {
      clientID: config.clientid,
      authority: config.authority,
      scopes: config.scopes
    }
    this.app = new Msal.UserAgentApplication(
      this.applicationConfig.clientID,
      this.applicationConfig.authority,
      null,
      {
        validateAuthority: false
      })
  }

  login() {
    this.app.loginPopup().then(
      token => {
        console.log("JWT Id token " + token)
      },
      error => {
        console.log("Login error " + error)
      }
    );
  }

  logout() {
    this.app._user = null
    this.app.logout()
  }

  getUser() {
    return this.app.getUser()
  }

  getToken(user) {
    return this.app.acquireTokenSilent(this.applicationConfig.scopes, null, user).then(
      accessToken => {
        console.log(accessToken)
        return accessToken;
      },
      error => {
        return this.app
          .acquireTokenPopup(this.applicationConfig.scopes)
          .then(
            accessToken => {
              console.log(accessToken)
              return accessToken;
            },
            err => {
              console.error(err)
            }
          )
      }
    )
  }
}
