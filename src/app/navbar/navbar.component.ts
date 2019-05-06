import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../model/app-user';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

appUser: AppUser;
shoppingCartItemCount: number;
collapse = false;

  constructor(private auth: AuthService,
              private shoppingCartService: ShoppingCartService
    ) { 
    
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe( appUser => this.appUser = appUser);
    let cart$ = await this.shoppingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0 ;
      for (let productId in cart.items) {
          this.shoppingCartItemCount += cart.items[productId].quantity
      }
    });
  }

  logout() {
    this.auth.logout();
  }

}
