import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { BetStoreService } from './services/bet-store.service';
import { AppComponent } from './components/app/app.component';

bootstrap(AppComponent, [
  BetStoreService,
  ROUTER_PROVIDERS,
  { provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: 'AUTHOR', useValue: 'Paul Bennett' }
]);
