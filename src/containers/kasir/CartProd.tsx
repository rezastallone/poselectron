import { Product } from "../../data/AppDatabase";

export class CartProd {
  barcode: number;
  diskon: number;
  product: Product;
  count: number;

  constructor(product: Product,
    count: number) {
    this.product = product
    this.count = count
    this.barcode = 0;
    this.diskon = 0;
  }
}
