import { Component, OnInit } from '@angular/core';
import { MoralisService } from 'src/app/shared/services/moralis.service';
declare var ethereum;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  biggestWiners = [] as ITable1[];
  biggestLosers = [] as ITable1[];
  biggestBets = [] as ITable2[];
  isLoggedIn = false;
  amount = 0;

  constructor(private moralisService: MoralisService) { }

  ngOnInit(): void {
    this.moralisService.userLoggedIn.subscribe(loggedIn => {
      if (loggedIn) {
        this.isLoggedIn = true;
        this.moralisService.biggestWiners.then(x => {
          this.biggestWiners = x;
          console.log(this.biggestWiners);
        });
        this.moralisService.biggestLosers.then(x => {
          this.biggestLosers = x;
          console.log(this.biggestLosers);
        });
        this.moralisService.biggestBets.then(x => {
          this.biggestBets = x;
          console.log(this.biggestBets);
        });
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  async flip(side) {
    const contractInstance = await this.moralisService.getFlipContract()
    contractInstance['methods'].flip(side == "heads" ? 0 : 1).send({ value: this.amount, from: ethereum.selectedAddress })
      .on('receipt', (receipt) => {
        console.log(receipt);
        if (receipt.events.bet.returnValues.win) {
          alert("you won");
        } else {
          alert("you lost");
        }
      });
  }

}

interface ITable1 {
  objectId: string;
  total_sum: number;
}

interface ITable2 {
  user: string;
  bet: number;
  win: boolean;
}
