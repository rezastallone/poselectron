import { SSL_OP_EPHEMERAL_RSA } from 'constants';
import { db, Product } from '../data/AppDatabase';

export function syncProducts(networkCall: (product: Product) => Promise<any>) {
  return new Promise<void>(
    async function (resolve, reject) {

      db.products.limit(10).toArray((products) => {

        let promises: Promise<Product>[] = []
        let error = false

        products.forEach(product => {
          let promise = new Promise<Product>(
            async function (resolve1, reject1) {
              try {
                await networkCall(product)
                await db.products.delete(product.id)
              } catch( err ){
                error = true
              }
              resolve1(product)
            }
          )

          promises.push(promise)
        })

        Promise.allSettled(promises)
          .then((results) => {
            console.log(results)
            if (error) {
              alert("Beberapa data gagal dikirim, coba lagi lain waktu")
            } else {
              alert("Berhasil sync semua data")
            }
            resolve()
          }
          );
      })
    }
  )
}

export function clearProducts() {
  return new Promise<void>(
    async function (resolve, reject) {
      await db.products.clear()
      resolve()
    }
  )
}

export function saveProduct(desc: string) {
  return new Promise<Product>(
    async function (resolve, reject) {
      let product = new Product(desc)
      product.id = await db.products.add(product)
      resolve(product)
    }
  )
}

export function printProductsLocal(){
  return new Promise<Product[]>(
    async function (resolve, reject) {
      const all = await db.products.toArray()
      resolve(all)
    }
  )
}
