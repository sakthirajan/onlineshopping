import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  showMenu = false;
  login = true;
  username;
  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem("UserDetails") != null) {
      let localUser = localStorage.getItem("UserDetails");
      this.username = JSON.parse(localUser).userEmail;
      this.showMenu = true;
      this.login = false;
    }
    else {
      this.showMenu = false;
      this.login = true;
    }
  }

  logOut() {
    localStorage.removeItem("UserDetails");
    this.router.navigateByUrl("/login");
  }

  /*responsive mennu start*/
  navMenu() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  /*responsive mennu end*/

}
