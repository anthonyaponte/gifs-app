import { Injectable } from '@angular/core';
import { filter } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'PWczHJMCQ3LTHGUNB2ekhZnSLjU0rMXN';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {}

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    if (tag.length === 0) return;
    tag = tag.toLocaleLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this.tagsHistory.splice(0, 10);
  }

  searchTag(tag: string): void {
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);
    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((res) => {
        this.gifList = res.data;
      });
  }
}
