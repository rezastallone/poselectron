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

  clearProduct(product: Product) {
    this.products.delete(product.id)
  }

  updateDiscount(diskon: number, product: Product) {
    let productExist = this.products.get(product.id)
    if (productExist) {
      productExist.diskon = diskon
      productExist.product.diskon = diskon
      this.products.set(product.id, productExist)
    }
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
      this.products.set(product.id, cartProd)
    } else {
      this.clearProduct(product)
    }
  }

  getSubtotal() {
    let harga = 0
    this.products.forEach((cartProd: CartProd) => {
      harga = +harga + (+cartProd.product.harga * cartProd.count)
    })
    return harga
  }

  getDiscountPrice() {
    let diskonPrice = 0
    this.products.forEach((cartProd: CartProd) => {
      if (cartProd.product.diskon > 0) {
        diskonPrice = +diskonPrice + ( ( +cartProd.product.harga * (cartProd.product.diskon / 100)) * cartProd.count )
      }
    })
    return diskonPrice
  }

  getSubtotalWithDiscount() {
    return this.getSubtotal() - this.getDiscountPrice()
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
