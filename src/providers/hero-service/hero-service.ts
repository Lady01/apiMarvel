import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import 'rxjs/add/operator/map';

/*
  Generated class for the HeroServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HeroServiceProvider {
data: any;
  constructor(public http: Http) {
    console.log('Hello HeroServiceProvider Provider');
  }
  load() {
    if (this.data) {
      return Promise.resolve(this.data);}
    return new Promise(resolve => {
      let md5 = new Md5();
      var timestamp = Number(new Date());
      /*(ts+privateKey+publicKey)*/
      var hash = Md5.hashStr(timestamp + '9b73a5103893285e18437dc968c6605aba8fb85c9b168c98e6de55c5134925aaf6dca077');
      debugger;
      console.log(hash +"hash");
      /*Apikey = publicKey*/
      this.http.get('https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&orderBy=name&limit=10&apikey=9b168c98e6de55c5134925aaf6dca077&hash=${hash}')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
}
