import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {XkcdService} from '../services/xkcd.service';
import {Comic} from '../models/comic';

@Component({
  selector: 'app-xkcd-detail',
  templateUrl: './xkcd-detail.component.html',
  styleUrls: ['./xkcd-detail.component.css']
})
export class XkcdDetailComponent {

  comic: Comic;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private xkcdService: XkcdService) {
    this.route.params.subscribe(params => {
      this.loadComicById(params.id);
    });
  }

  next() {
    this.navigate(this.comic.num + 1);
  }

  previous() {
    this.navigate(this.comic.num - 1);
  }

  private navigate(id: number): void {
    this.router.navigateByUrl('/xkcd/' + id);

  }

  private loadComicById(id: number): void {
    this.xkcdService.getComicById(id).subscribe(comic =>
      this.comic = comic
    );
  }

}
