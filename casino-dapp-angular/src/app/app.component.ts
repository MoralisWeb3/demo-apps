import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var Moralis;
Moralis.start({ serverUrl: environment.server_url, appId: environment.app_id });

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'casino-dapp-angular';
}
