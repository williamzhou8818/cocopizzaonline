import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent implements OnInit {

  categories$;

  @Input('category') category;

  constructor(categoryService: CategoryService) { 
    this.categories$ = categoryService.getCategories();

  }

  ngOnInit() {
  }

}
