import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {XkcdListComponent} from "./xkcd-list/xkcd-list.component";
import {XkcdDetailComponent} from "./xkcd-detail/xkcd-detail.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/xkcd',
    pathMatch: 'full'
  },
  {
    path: 'xkcd',
    component: XkcdListComponent
  },
  {
    path: 'xkcd/:id',
    component: XkcdDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
