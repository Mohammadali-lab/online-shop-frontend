import {Component, OnInit} from '@angular/core';

import myAppConfig from "../../config/my-app-config";
import OktaSignIn from "@okta/okta-signin-widget";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuth) {

    this.oktaSignin = new OktaSignIn(
      {
        logo: 'assets/images/logo.png',
        baseUrl: myAppConfig.oidc.issuer.split('/oauth2')[0],
        clientId: myAppConfig.oidc.clientId,
        redirectUri: myAppConfig.oidc.redirectUri,
        authParams: {
          pkce: true,
          issuer: myAppConfig.oidc.issuer,
          scopes: myAppConfig.oidc.scopes
        }
      }
    );
  }
  ngOnInit(): void {
    this.oktaSignin.remove();

    this.oktaSignin.renderEl({
      el: 'okta-sign-in-widget'}, // this name should be same as div tag id in login.component.html
      (response) => {
        if (response.status === 'SUCCESS') {
          this.oktaAuthService
        }
      }
      )
  }

}
