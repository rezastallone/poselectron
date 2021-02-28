import Dexie from 'dexie';

export class AppDatabase extends Dexie {

    products: Dexie.Table<Product, number>;

    constructor() {

        super("FashionStoreDatabase");

        var db = this;

        //
        // Define tables and indexes
        //
        db.version(1).stores({
            products: '++id, description',
        });

        // Let's physically map Contact class to contacts table.
        // This will make it possible to call loadEmailsAndPhones()
        // directly on retrieved database objects.
        db.products.mapToClass(Product);
    }
}

export class Product {
  id: number;
  description: string;
  harga: number;

  constructor(description: string, id?:number, harga?: number,){
    this.description = description;

    if (harga) this.harga = harga;
    if (id) this.id = id;
  }
}

export var db = new AppDatabase();

