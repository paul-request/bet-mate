import { Component, Inject } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';
import { FORM_PROVIDERS } from '@angular/common';

import template from './app.template.html';
import { BetComponent } from '../bet-list/bet-list.component';

@Component({
  selector: 'bet-mate-app',
  directives: [ROUTER_DIRECTIVES],
  template: template,
  providers: [FORM_PROVIDERS]
})
@RouteConfig([
  { path: '/:status', component: BetComponent, name: 'Bet' }
])
export class AppComponent {

  constructor(@Inject('AUTHOR') author) {
    this.author = author;
  }

}
