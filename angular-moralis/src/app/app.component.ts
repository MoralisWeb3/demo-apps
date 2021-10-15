import { Component } from '@angular/core';
import { environment } from './../environments/environment';

declare var Moralis;
Moralis.initialize(environment.app_id);
Moralis.serverURL = environment.server_url;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'Angular + Moralis Login';
  public user: string;
  public isLoggedIn = false;
  public createdAt: string;
  public updatedAt: string;
  public ethAddress: string;
  public isAuthenticated = false;


  // Login 
  async login() {
    this.user = await Moralis.User.current();
    if (!this.user) {
      let user = await Moralis.authenticate();
      console.log("login ==> ", user);
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
      this.ethAddress = user.attributes.ethAddress;
    }
    this.isLoggedIn = true;
  }

  // Logout
  async logOut() {
    await Moralis.User.logOut();
    console.log("logged out ==>");
    this.isLoggedIn = false;


  }




}
