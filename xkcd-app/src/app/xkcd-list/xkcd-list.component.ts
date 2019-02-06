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
