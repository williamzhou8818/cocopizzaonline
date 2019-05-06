import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import 'rxjs/add/operator/switchMap';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  providers: [NgbModalConfig, NgbModal]

})
export class MyOrdersComponent implements OnInit {
  userId;
  product;
  address;
  productIds;
  pickUptime;
  orders$;
  myOrder=[];
  orderDetail=[];
  subTotal;
  i;
  item = [] ;
  title=[];
  price;
  qty;

  key;


  constructor(private authService: AuthService,
              private orderService: OrderService,
              private route: ActivatedRoute,
              config: NgbModalConfig, 
              private modalService: NgbModal
    ) {
      // this.orders$ = authService.user$.switchMap(u => orderService.getOrdersByUser(u.uid).valueChanges());
         let orders$ =  orderService.getOrders().valueChanges().subscribe(product =>{
         this.product = product;
        
        console.log(this.product);
        // this.key = Object.keys(product.items);
        // console.log(this.key);
         
  
      });


      config.backdrop = 'static';
      config.keyboard = false;

    }

  ngOnInit() {
   
  }

  open(content) {
    this.modalService.open(content);
  }

}
