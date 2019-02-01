import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderOneComponent} from './header-one/header-one.component';
import {HeaderTwoComponent} from './header-two/header-two.component';
import {HeaderThreeComponent} from './header-three/header-three.component';
import {XkcdListComponent} from "./xkcd-list/xkcd-list.component";
import {XkcdDetailComponent} from './xkcd-detail/xkcd-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderOneComponent,
    HeaderTwoComponent,
    HeaderThreeComponent,
    XkcdListComponent,
    XkcdDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
