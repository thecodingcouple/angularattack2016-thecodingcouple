import { bootstrap }    from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core'
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ROUTER_PROVIDERS} from '@angular/router-deprecated';

import { AppComponent } from './component/app.component';
import 'rxjs/Rx';

bootstrap(AppComponent, [
    ROUTER_PROVIDERS, provide(LocationStrategy, {useClass: HashLocationStrategy})
]);