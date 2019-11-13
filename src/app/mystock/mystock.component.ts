import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mystock',
  templateUrl: './mystock.component.html',
  styleUrls: ['./mystock.component.css']
})
export class MystockComponent implements OnInit {
  cols;
  mystock;
  userid;

  constructor(private service: StockService) { }

  ngOnInit() {
    this.getMyStockdis();

    this.cols = [
      { field: 'purchasedStockId', header: 'S.No' },
      { field: 'stockName', header: 'Name' },
      { field: 'stockPrice', header: 'Price' },
      { field: 'stockQuantity', header: 'Quantity' }
    ];
  }
  getMyStockdis() {
    this.service.getMyStock().subscribe(data => {
      console.log(data);
      this.mystock = data;
    })
  }
}
