import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { flipContractAbi, flipContractAddress } from '../../../assets/abis/abi.js';

declare var Moralis;
declare var web3;

@Injectable({
  providedIn: 'root'
})
export class MoralisService {

  user = '';
  isLoggedIn = false;
  userLoggedIn = new Subject<boolean>();
  currentUser = of(Moralis.User.current()).pipe(
    tap(x => {
      if (x) {
        this.isLoggedIn = true;
        this.userLoggedIn.next(true);
      }
    })
  );

  biggestWiners = Moralis.Cloud.run("biggestWiners", {});
  biggestLosers = Moralis.Cloud.run("biggestLosers", {});
  biggestBets = Moralis.Cloud.run("biggestBets", {});

  constructor(private httpClient: HttpClient) { }

  authenticate(): Observable<any> {
    return from(Moralis.authenticate()).pipe(
      tap(x => {
        this.isLoggedIn = true;
        this.userLoggedIn.next(true);
      })
    );
  }

  logout(): Observable<any> {
    return from(Moralis.User.logOut()).pipe(
      tap(x => {
        this.isLoggedIn = false;
        this.userLoggedIn.next(false);
      })
    )
  }

  async getFlipContract() {
    window['web3'] = await Moralis.Web3.enable();
    return new web3.eth.Contract(flipContractAbi, flipContractAddress);
  }
}
