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
