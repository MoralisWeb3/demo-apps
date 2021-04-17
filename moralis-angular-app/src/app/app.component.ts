import { Component } from '@angular/core';
import Moralis from 'moralis'
import { environment } from '../environments/environment'

Moralis.initialize(environment.moralisAppId);
Moralis.serverURL = environment.moralisUrl;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'moralis-angular-app';

  authenticate () {
    Moralis.authenticate()
    .then((user) => {
      console.log(user)
    })
  }
}
