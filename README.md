# Getting Started With Angular Development

<p align="center">
<img src="./angular.svg" width="100"/>
</p>


Like to see the puzzle before you get started? [This is what we're building](https://timdodd.github.io/angular-devday/xkcd).

### Exercise #1 - Create a new product using the Angular CLI

```
npm install -g @angular/cli
ng new xkcd-app
cd xkcd-app
ng serve
```

[Reference - Angular CLI](https://cli.angular.io/)


### Exercise #2 - Add bootstrap 4 to you project

Install bootstrap 4

*Note: as of NPM 5 installed modules are added as dependencies by default so the --save is no longer needed.*

```
npm install bootstrap
```

And add to styles.css
```
@import '~bootstrap/dist/css/bootstrap.min.css';
```

Modify app.component.html

```
<div class="container">
   <h1>xkcd browser</h1>
   <router-outlet></router-outlet>
</div>
```

[Reference - How to add bootstrap 4...](https://loiane.com/2017/08/how-to-add-bootstrap-to-an-angular-cli-project/)

### Exercise #3 - Creating your first component 3 ways

*What is a Component?*

Definition: A component is a directive with a template. 

There are 3 types of directives: 
 - Components (directives with a template)
 - Structural (adds/removes elements from the DOM ie. *ngIf, *ngFor)
 - Attribute  (change the appearance or behavior of an element, component, or another directive ie. highlighting)

Best Practice: Components normally have element selectors. Element selector should be named in kabab case (w3c). Selectors should be prefixed to avoid name conflicts.

[Reference - Angular Styleguide](https://angular.io/guide/styleguide)

```
good:

   <app-loading-spinner>Good</app-loading-spinner>
   <div appLoadingSpinner>Good</div>

```

```

bad:

   <appLoadingSpinner>Bad not kebab</appLoadingSpinner> 
   <loading-spinner>Bad no prefix</loading-spinner>
   <div app-loading-spinner>Bad not camelCase</div>

```


Let's start by creating a header component 3 ways. Throughout these exercises you can also refer to the [Angular Cheetsheet](https://angular.io/guide/cheatsheet)


### Exercise #3a - Component with input


For the first header we want the following usage:

```
  <app-header-one value="xkcd browser"></app-header-one>
```

```
ng generate component header-one
```

<details><summary>Answer</summary><p>

file: header-one.component.ts

```
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.css']
})
export class HeaderOneComponent {

  @Input() value: string;

}
```

file: header-one.component.html

```
<h1>{{value}}</h1>

```

</p></details>


### Exercise #3b - Component with transcluded content

For the second header we want the following usage. Also in the css/scss file for this component add a style to color your h1.

```
<app-header-two>xkcd browser</app-header-two>
```

```
ng generate component header-two
```


<details><summary>Answer</summary><p>

file: header-two.component.ts

```
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.css']
})
export class HeaderTwoComponent {

}
```

file: header-two.component.html

```
<h1>
  <ng-content></ng-content>
</h1>
```

file: header-two.component.css

```
h1 {
  color: red;
}
```

</p></details>



### Exercise #3c - Attribute selectors

For the second header we want the following usage. Also in the css/scss file for this component add a style to color your h1.

```
<div appHeaderThree>xkcd browser</div>
```


Task: create to methods xkcd.service.ts for
  
```
  getComicById(id: number): Observable<Comic> {
    //TODO implement. Should return the comic by id
  }
  
  findComics(): Observable<Comic[]> {
    //TODO implement. Should return the first 10 comics
  }
```

### Exercise #4 - Routing

We'll generate an xkcd-list component and xkcd-detail component. The xkcd-list component will be the default route and display a list of comics to choose from. The xkcd-detail component will display the image of the comic.

```
ng generate component xkcd-list
ng generate component xkcd-detail
```

To the app-routing.module.ts add routes
- any unknown url path to redirectTo '/xkcd'
- the '/xkcd' path to display the XkcdListComponent
- the '/xkcd/:id' path to display the XkcdDetailComponent


<details><summary>Answer</summary><p>


file: app-routing.module.ts

```

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

```

</p></details>

### Exercise #5 - Services

Now we're going to create a service and populate a table in the XkcdListComponent. You can look at a sample of the json from the service we will be calling [here](https://xkcd.com/2001/info.0.json).
Because we're calling a service on the internet on another domain (not localhost) we're going to need to set up our webpack development server to proxy the requests so we don't have CORS issues.

create file proxy.conf.json (at the same level as your package.json)

```
{
	"/api": {
		"target": "https://xkcd.com",
		"secure": false,
		"headers": {
			"Host": "xkcd.com"
		},
		"pathRewrite": {
			"/api": ""
		}
	}
}

```

modify your package.json start commaind

```
"start": "ng serve --proxy-config proxy.conf.json",
```
create a service and a model class

```
ng generate service services/xkcd
ng generate class models/comic
```

import the HttpClientModule into your app.module.ts

```
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
```

Add the fields num, title, img to the Comic class

<details><summary>Answer</summary><p>

file comic.ts

```
export class Comic {
  num: number;
  img: string;
  title: string;
}
```

</p></details>

Add the following methods to the xkcd.service.ts 


```
  getComicById(id: number): Observable<Comic> {
    //TODO implement. Should return the comic by id
  }
  
  findComics(): Observable<Comic[]> {
    //TODO implement. Should return the first 5 comics (comics with ids 1,2,3,4,5)
  }
```

<details><summary>Hint</summary><p>

1. import the HttpClient into XkcdService to make the http calls
2. Because the proxy configured to look for api the path to the service would be ./api/${id}/info.0.json and will get proxied through to https://xkcd.com/${id}/info.0.json.
3. As far as I know there isn't a list service so you'll have to forkJoin multiple calls for the list.
</p></details>

Add an html table to xkcd-list.component.html and *ngRepeat over a Comic[] and display their id and title.  


<details><summary>Answer</summary><p>

file xkcd.service.ts

```
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {Comic} from "../models/comic";

@Injectable({
  providedIn: 'root'
})
export class XkcdService {

  readonly xkcdServiceUrl = (id) => `./api/${id}/info.0.json`;

  constructor(private http: HttpClient) {
  }

  getComicById(id: number): Observable<Comic> {
    return this.http.get<Comic>(this.xkcdServiceUrl(id));
  }

  findComics(): Observable<Comic[]> {
    return forkJoin(
      this.getComicById(1),
      this.getComicById(2),
      this.getComicById(3),
      this.getComicById(4),
      this.getComicById(5));
  }
}

```

file xkcd.service.ts

```
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {forkJoin, Observable} from "rxjs";
import {Comic} from "../models/comic";

@Injectable({
  providedIn: 'root'
})
export class XkcdService {

  readonly xkcdServiceUrl = (id) => `./api/${id}/info.0.json`;

  constructor(private http: HttpClient) {
  }

  getComicById(id: number): Observable<Comic> {
    return this.http.get<Comic>(this.xkcdServiceUrl(id));
  }

  findComics(): Observable<Comic[]> {
    return forkJoin(
      this.getComicById(1),
      this.getComicById(2),
      this.getComicById(3),
      this.getComicById(4),
      this.getComicById(5));
  }
}

```

</p></details>

### Exercise #6 - Services hooking up the details

We now have a summary screen that lists out comics. 

Modify xkcd-list.component.html and xkcd-list.component.ts so we can click on a row and navigate to the XkcdDetailComponent.


<details><summary>Answer</summary><p>

file xkcd-list.component.html

```
<table class="table table-bordered table-hover">
  <thead>
  <tr>
    <th>Id</th>
    <th>Title</th>
  </tr>
  </thead>
  <tbody *ngFor="let comic of comics">
  <tr (click)="onSelectComic(comic)">
    <td>{{comic.num}}</td>
    <td>{{comic.title}}</td>
  </tr>
  </tbody>
</table>

```

file xkcd-list.component.ts

```

  onSelectComic(comic: Comic) {
    this.router.navigateByUrl('/xkcd/' + comic.num);
  }

```

</p></details>

Modify xkcd-detail.component.ts to listen for changes in the ActivatedRoute (so you can read what number is in the URL) and load the appropriate comic.

<details><summary>Answer</summary><p>


file xkcd-detail.component.ts

```

import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {XkcdService} from "../services/xkcd.service";
import {Comic} from "../models/comic";

@Component({
  selector: 'app-xkcd-detail',
  templateUrl: './xkcd-detail.component.html',
  styleUrls: ['./xkcd-detail.component.css']
})
export class XkcdDetailComponent {

  comic: Comic;

  constructor(private route: ActivatedRoute,
              private xkcdService: XkcdService) {
    this.route.params.subscribe(params => {
      this.loadComicById(params['id']);
    })
  }

  private loadComicById(id: number): void {
    this.xkcdService.getComicById(id).subscribe(comic =>
      this.comic = comic
    );
  }

}

```

</p></details>


Modify xkcd-detail.component.html display the img

<details><summary>Answer</summary><p>


file xkcd-detail.component.html

```
<img *ngIf="comic" [src]="comic.img">

```

</p></details>

Lets get a little fancy and use a [bootstrap card with a top image](https://getbootstrap.com/docs/4.0/components/card/#example). Also add a 'next' and 'previous' button. Do this through navigation and NOT by just changing the internal component state. It's good practice for hard reloads of your page to display the same results (when it makes sense). 


<details><summary>Answer</summary><p>


file xkcd-detail.component.html

```
<div class="card bg-light" *ngIf="comic">
  <img class="card-img-top" [src]="comic.img">
  <div class="card-body">
    <h5 class="card-title">{{comic.title}}</h5>
    <div class="row">
      <div class="col text-right">
        <button type="button" (click)="previous()" class="btn btn-outline-primary mr-2">Prev</button>
        <button type="button" (click)="next()" class="btn btn-outline-primary">Next</button>
      </div>
    </div>
  </div>
</div>
```


file xkcd-detail.component.ts

```
  next() {
    this.navigate(this.comic.num + 1)
  }

  previous() {
    this.navigate(this.comic.num - 1)
  }

  private navigate(id: number) : void {
    this.router.navigateByUrl("/xkcd/" + id);

  }
```

</p></details>


### Exercise #7 - A basic intro to the forms module

Let's flip back to the summary page and add an input in the header of the table to filter the results as we type. There are two ways of doing forms in angular - template-driven and reactive forms. For today we'll just cover template-driven (ngModel) which is what we're used to from angularJS.

1. import the FormsModule into your app.module.ts
2. in xkcd-list.component.ts add a string to store the filter value into and a function to do the filtering.
3. in xkcd-list.component.html add an input to the table header
    - add an two way binding [(ngModel)] to the input to set the filter value
    - add an (keyup) event binding to call the filter method on key up.
    

<details><summary>Answer</summary><p>


file xkcd-list.component.html

```
...
  <tr>
    <th colspan="2">
      <input placeholder="Search for a comic..." class="form-control" [(ngModel)]="filter" (keyup)="onChangeFilter()">
    </th>
  </tr>
...
```


file xkcd-list.component.ts

```
import {Component, OnInit} from '@angular/core';
import {XkcdService} from '../services/xkcd.service';
import {Comic} from '../models/comic';
import {Router} from '@angular/router';

@Component({
  selector: 'app-xkcd-list',
  templateUrl: './xkcd-list.component.html',
  styleUrls: ['./xkcd-list.component.css']
})
export class XkcdListComponent implements OnInit {

  private comics: Comic[] = [];
  filteredComics: Comic[] = [];
  filter: string;

  constructor(private xkcdService: XkcdService,
              private router: Router) {
  }

  ngOnInit() {
    this.xkcdService.findComics().subscribe(
      comics => {
        this.comics = comics;
        this.filterComics();
      });
  }

  onChangeFilter() {
    this.filterComics();
  }

  onSelectComic(comic: Comic) {
    this.router.navigateByUrl('/xkcd/' + comic.num);
  }

  private filterComics(): void {
    if (!this.filter) {
      this.filteredComics = this.comics;
    } else {
      this.filteredComics = this.comics.filter(comic => comic.title.toLowerCase().includes(this.filter.toLowerCase()));
    }
  }

}
  
```

</p></details>


Bonus Round. Angular enforces unidirectional data flow (data down events up) so a two way binding is really just syntaxtic sugar around the following:

```
//an attribute binding on ngModel and an event binding on ngModelChange
<input class="form-control" [ngModel]="filter" (ngModelChange)="filter=$event">

//which means alternatively we can write the functionality as:
<input placeholder="Search for a comic..." class="form-control" [ngModel]="filter" (ngModelChange)="filter=$event; onChangeFilter()">

```

### -- The End -- 
