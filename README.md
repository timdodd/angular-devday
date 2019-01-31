# Getting Started With Angular Development

![Angular Logo](./angular.svg)


### Exercise #1 - Create a new project using the Angular CLI

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

