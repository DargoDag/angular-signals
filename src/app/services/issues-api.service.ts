import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, of} from "rxjs";

import {Issue} from "../models/issue";

@Injectable({
  providedIn: 'root'
})
export class IssuesApiService {
  public issues: WritableSignal<Issue[]> = signal<Issue[]>([]);
  private apiUrl: string = 'https://run.mocky.io/v3/';
  private apiKey: string = 'bf941e36-c5a1-476b-889a-05d012c39aab';
  private httpClient: HttpClient = inject(HttpClient);

  constructor() {
    this.loadIssues();
  }

  private loadIssues(): void {
    this.httpClient.get<Issue[]>(`${this.apiUrl}${this.apiKey}`).pipe(map(issues => this.issues.set(issues)), catchError(error => {
      console.error('Error ', error);
      return of([]);
    })).subscribe();
  }
}
