# Getting Started With Angular Development

<p align="center">
<img src="./angular.svg" width="100"/>
</p>

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

Definition: A component is a directive with a template. There are 3 types of directives, Components, Structural and 

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


The angular styleguide has an acronym LIFT where the T stands for 'Try to be DRY (don't repeat yourself)'. One was of doing that is creating reusable component. We'll create a header component 3 ways.


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


