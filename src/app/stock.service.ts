import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock, User } from './entries/stock.entries';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  userid;
  stockURL: string = "http://10.117.189.65:9098/marketManagement/stocks";

  constructor(private http: HttpClient) {
    if (localStorage.getItem("user") != null) {
      let localUser = localStorage.getItem("user");
      this.userid = JSON.parse(localUser).userId;
    }
  }

  stockdisplay() {
    return this.http.get(this.stockURL)
  }

  // getData() {
  //   return this.http.get("http://localhost:3000/stock");
  // }

  getMyStock() {
    return this.http.get("http://10.117.189.65:9098/marketManagement/users/" + this.userid + "/stocks");
  }

}
