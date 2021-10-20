import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Moralis } from 'moralis';

export type User = Moralis.User<Moralis.Attributes>;

@Component({
  selector: 'app-user',
  template: `
    <div
      style="display: flex; flex-direction: column; align-items: center; width: 50vw; margin: 10px auto; border: 1px solid black;"
    >
      <!-- Show some user properties -->
      <ng-container *ngIf="user; else userNotDefined">
        <pre style="display: flex;">
          <strong>Username:</strong>
          <span>{{ user.attributes.username }}</span>
        </pre>
        <pre style="display: flex;">
          <strong>Address:</strong>
          <span>{{ user.attributes.ethAddress }}</span>
        </pre>
      </ng-container>

      <!-- No user -->
      <ng-template #userNotDefined>
        <pre>User not defined, please log in.</pre>
      </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {
  @Input() user?: User;

  ngOnInit() {}
}
