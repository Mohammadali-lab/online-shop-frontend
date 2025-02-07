import {Customer} from "./customer";
import {Order} from "./order";
import {OrderItem} from "./order-item";

export class Purchase {

  // @ts-ignore
  customer: Customer;
  // @ts-ignore
  shippingAddress: Address;
  // @ts-ignore
  billingAddress: Address;
  // @ts-ignore
  order: Order;
  // @ts-ignore
  orderItems: OrderItem[];

}
