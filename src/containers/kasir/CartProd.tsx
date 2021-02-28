import { Product } from "../../data/AppDatabase";

export class CartProd {
  product: Product;
  count: number;

  constructor(product: Product,
    count: number) {
    this.product = product
    this.count = count
  }
}
