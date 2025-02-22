import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../common/product";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {CartService} from "../../services/cart.service";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    NgForOf,
    NgIf,
    RouterLink,
    NgbPagination,
    FormsModule
  ],
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number = 1;
  private previousCategoryId: number = 1;
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;
  // @ts-ignore
  previousKeyword: string = null;
  selectedValue: string = '5';
  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
  }

  listProducts(){

      this.searchMode = this.route.snapshot.paramMap.has('keyword');

      if(this.searchMode){
        this.handleSearchProducts();
      }else{
        this.handleListProducts();
      }

  }

  handleListProducts(){
    // check if "id" parameter is available
    const hasCategoryId = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId){
      // get the "id" param string. convert string to a number using the "+" symbol
      // @ts-ignore
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }else{
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    //
    // Check if we have a different category than previous
    // Note: Angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`)

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               this.currentCategoryId)
                                               .subscribe(data => {
                                                 this.products = data._embedded.products;
                                                 this.thePageNumber = data.page.number + 1;
                                                 this.thePageSize = data.page.size;
                                                 this.theTotalElements = data.page.totalElements;
                                               });
  }

  private handleSearchProducts() {

    // @ts-ignore
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    // if we have a different keyword than previous
    // then set thePageNumber to 1

    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }

    // @ts-ignore
    this.previousKeyword = theKeyword;

    // now search for the products using keyword
    this.productService.searchProductsPaginate(this.thePageNumber - 1,
                                                this.thePageSize,
                                                theKeyword)
                                                .subscribe(data => {
                                                this.products = data._embedded.products;
                                                this.thePageNumber = data.page.number + 1;
                                                this.thePageSize = data.page.size;
                                                this.theTotalElements = data.page.totalElements;
                                              });

  }

  updatePageSize(pageSize: number) {
    this.thePageSize = pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  addToCart(theProduct: Product) {
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    // TODO ... do the real work
    const theCartItem = new CartItem(theProduct);

    this.cartService.addToCart(theCartItem);
  }
}
