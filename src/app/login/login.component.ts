import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  userform: FormGroup;
  error = false;

  constructor(private fb: FormBuilder, private route: Router, private service: StockService, private http: HttpClient) { }

  ngOnInit() {
    this.userform = this.fb.group({
      'userEmail': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
    });
  }

  onSubmit() {
    let LOGIN_URL: string = "http://10.117.189.65:9098/marketManagement/login";
    this.http.post(LOGIN_URL, this.userform.value).subscribe((res: Response) => {
      localStorage.setItem("UserDetails", JSON.stringify(this.userform.value));
      localStorage.setItem("user", JSON.stringify(res));
      this.route.navigate(['/stock']);
    }, (err) => {
      this.error = true;
      console.log(err)
    });
  }
}
