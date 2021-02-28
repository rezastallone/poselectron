import { Product } from "../../data/AppDatabase";
import { CartProd } from "./CartProd";

export class Cart {

  hasProduct() {
    return this.getTotalProductCount() > 0
  }

  products: Map<number, CartProd>;

  constructor(products: Map<number, CartProd>) {
    this.products = products;
  }

  addProduct(product: Product) {
    let cartProd = this.getCardProd(product)
    if (!cartProd) {
      cartProd = new CartProd(product, 0)
    }
    cartProd.count++
    this.products.set(product.id, cartProd)
  }

  removeProduct(product: Product) {
    let cartProd = this.getCardProd(product)
    if (cartProd.count > 0) {
      cartProd.count -= 1
    }
    this.products.set(product.id, cartProd)
  }

  getSubtotal() {
    let harga = 0
    this.products.forEach((cartProd: CartProd) => {
      harga = +harga + (+cartProd.product.harga * cartProd.count)
    })
    return harga
  }

  private getCardProd(product: Product) {
    let productExist = this.products.get(product.id)
    if (!productExist) {
      productExist = new CartProd(product, 0)
    }
    return productExist;
  }


  getTotalProductCount(): number {
    let count = 0
    this.products.forEach((cartProd: CartProd) => {
      count = +count + cartProd.count
    })
    return count
  }

  getProductCount(product: Product) {
    return this.getCardProd(product).count
  }

  getProductList() {
    let productList: Product[] = []
    this.products.forEach((cartProd: CartProd) => {
      if (cartProd.product) {
        productList.push(cartProd.product)
      }
    })
    return productList
  }
}
