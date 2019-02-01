import {Component, OnInit} from '@angular/core';
import {XkcdService} from "../services/xkcd.service";
import {Comic} from "../models/comic";

@Component({
  selector: 'app-xkcd-list',
  templateUrl: './xkcd-list.component.html',
  styleUrls: ['./xkcd-list.component.css']
})
export class XkcdListComponent implements OnInit {

  comics: Comic[];

  constructor(private xkcdService: XkcdService) { }

  ngOnInit() {
    this.xkcdService.findComics().subscribe(
      comics => this.comics = comics
    );
  }

}
