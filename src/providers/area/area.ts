import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs";

/*
 Generated class for the AreaProvider provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular DI.
 */
@Injectable()
export class AreaProvider {

  constructor(public http: Http) {
    console.log('Hello AreaProvider Provider');
  }

  load(): Observable<any> {
    return this.http.get('area.json').map(res => res.json());
  }

}
