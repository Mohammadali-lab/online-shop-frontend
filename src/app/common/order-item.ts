import {CartItem} from "./cart-item";

export class OrderItem {

  // @ts-ignore
  imageUrl: string;
  // @ts-ignore
  unitPrice: number;
  // @ts-ignore
  quantity: number;
  // @ts-ignore
  productId: string;

  constructor(cartItem: CartItem) {

    this.imageUrl = cartItem.imageUrl;
    this.quantity = cartItem.quantity;
    this.unitPrice = cartItem.unitPrice;
    this.productId = cartItem.id;
  }
}
