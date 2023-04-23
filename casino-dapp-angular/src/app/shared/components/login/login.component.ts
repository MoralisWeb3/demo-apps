import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MoralisService } from 'src/app/shared/services/moralis.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;

  constructor(private moralisService: MoralisService) { }

  ngOnInit(): void {
  }

  logIn() {
    this.moralisService.currentUser.subscribe(user => {
      if (!user) {
        this.moralisService.authenticate().subscribe(x => {
          this.isLoggedIn = true;
        });
      } else {
        this.isLoggedIn = true;
      }
    })
  }

  logOut() {
    this.moralisService.logout().subscribe(x => {
      this.isLoggedIn = false;
    });
  }

}
