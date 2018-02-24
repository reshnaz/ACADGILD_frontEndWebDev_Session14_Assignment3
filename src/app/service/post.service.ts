import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { PersonList } from './../interface/person-model';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class PostService {

  personsUrl = 'api/persons';  // URL to web api

  constructor(private http: HttpClient) { }

  /** GET persons from the server */
  getPersons(): Observable<PersonList[]> {
    return this.http.get<PersonList[]>(this.personsUrl);
  }

  /** POST: add a new person to the database */
  addPerson(person: PersonList): Observable<PersonList> {
    return this.http.post<PersonList>(this.personsUrl, person, httpOptions);
  }

  // This function returns person based on parameter passed in URL
  getPersonWithId(id: number): Observable<PersonList> {
    const url = `${this.personsUrl}/${id}`;
    return this.http.get<PersonList>(url);
  }

  // This function deletes person having particular id.
  deletePerson(id: number): Observable<{}> {
    const url = `${this.personsUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

} 
