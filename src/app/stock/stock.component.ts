import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { NgForm, FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class StockComponent implements OnInit {
  stockDetails;
  update = false;
  stockinfo;
  stockname;
  current_pri_Url;
  cuprice;
  stockPrice;
  cols;
  Quantity = 1;
  updateForm: FormGroup;
  userid;
  userName;

  constructor(private service: StockService, private messageService: MessageService,
    private confirmationService: ConfirmationService, private http: HttpClient, private fb: FormBuilder) { }

  ngOnInit() {
    if (localStorage.getItem("user") != null) {
      let localUser = localStorage.getItem("user");
      this.userid = JSON.parse(localUser).userId;
      this.userName = JSON.parse(localUser).userName;
    }

    this.getStock();

    this.updateForm = this.fb.group({
      'stockQuantity': new FormControl(''),
      'stockPrice': new FormControl(''),
      'oldstockPrice': new FormControl(''),
      'stockName': new FormControl(''),
    });

    // this.service.getData().subscribe(res => this.stockDetails = res);
    this.cols = [
      { field: 'stockName', header: 'Name' },
      { field: 'stockPrice', header: 'Price' },
      { field: 'stockQuantity', header: 'Quantity' },
      { field: 'buy', header: 'Buy' }
    ];
  }

  getStock() {
    this.service.stockdisplay().subscribe(res => {
      this.stockDetails = res;
      for (let i = 0; i < this.stockDetails.length; i++) {
        this.stockname = this.stockDetails[i].stockName;
        this.current_pri_Url = this.stockname;
      }
    });
  }

  onRowUpdate(id) {
    this.stockinfo = id;
    let cur_price = "http://10.117.189.65:9098/marketManagement/api/stocks/" + id.stockName + "/price";
    this.http.get(cur_price).subscribe(res => {
      let stockPrice: any = res;
      this.stockinfo.cuprice = stockPrice.stockPrice;
    });
    this.update = true;
  }
  onBuy(obj) {
    obj['userId'] = this.userid;
    this.confirmationService.confirm({
      message: 'Are you sure do you want Buy?',
      accept: () => {
        let buyUrl = "http://10.117.189.65:9098/marketManagement/stocks/"
        this.http.post(buyUrl, this.updateForm.value).subscribe(res => console.log(res))
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Buy Stock successfully ' });
        this.update = false;
      }
    });
    this.update = false;
  }

}
