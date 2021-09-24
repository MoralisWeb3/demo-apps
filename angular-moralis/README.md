# Angular Moralis

This project using Angular + Boostrap + Moralis

## Bootstrap 

Go to `https://getbootstrap.com/docs/5.1/getting-started/introduction/`  and copy the CDN´s and paste on index.html file


```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angular Moralis</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">

  <!-- bootstrap -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">

  <!-- Moralis -->
  <!-- Note -->
  <!-- You can use npm info moralis versions to obtain a list of the available versions and replace <VERSION> below with the latest value. -->
  <script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
  <script src="https://unpkg.com/moralis/dist/moralis.js"></script>

</head>
<body>
  <app-root></app-root>

  <!-- bootstrap -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>
</body>
</html>



```

## Install Moralis
**npm install moralis**


import Moralis and environment to angular module file path


angular.module.ts
```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
import { Moralis } from 'moralis/dist/moralis';

Moralis.initialize(environment.app_id);
Moralis.serverURL = environment.server_url;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


```

app.component.ts
```js
import { Component } from '@angular/core';
import { Moralis } from 'moralis/dist/moralis';

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

```

app.component.html
```html
<div class="container">
  <div class="row">
    <div class="col"></div>
    <div class="col">
      <h3 class="mt-5 mb-5">{{ title }}</h3>
      <div class="card text-center" style="width: 18rem">
        <img src="../assets/moralis-logo.png" class="card-img-top" alt="..." />
        <div class="card-body">
          <a class="btn btn-outline-primary" (click)="login()">Login with MetaMask</a>
        </div>
      </div>
    </div>
    <div class="col">
      <div *ngIf="isLoggedIn">
        <h3 class="mt-5">Log in</h3>
        <div class="card text-dark bg-light mt-5" style="max-width: 18rem">
          <div class="card-header">You are login</div>
          <div class="card-body">
            <h5 class="card-title">CreatedAt</h5>
            <p class="card-text">{{ createdAt | date: "dd/MM/yyyy" }}</p>
            <h5 class="card-title">UpdateAt</h5>
            <p class="card-text">{{ updatedAt | date: "dd/MM/yyyy" }}</p>

            <h5 class="card-title">ETH Address</h5>
            <p class="card-text">{{ ethAddress }}</p>
            <hr />
            <div class="text-center mt-5">
              <a class="btn btn-outline-primary" (click)="logOut()">Log Out</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<router-outlet></router-outlet>

```

## Start Project 

Run `npm run start` 


## Dont´t forget the unit tests.

Run `ng test` to execute the unit tests
