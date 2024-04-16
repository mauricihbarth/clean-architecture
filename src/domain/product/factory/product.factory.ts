import Product from "../entity/product";
import { v4 as uuid } from "uuid";
import ProductInterface from "../entity/product.interface";
import ProductB from "../entity/product-b";

// export default class ProductFactory {

//   public static create(name: string, price: number): ProductInterface {
//     return new Product(uuid() || null, name, price)
//   }
// }

export default class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number
  ): ProductInterface {
    switch (type) {
      case "a":
        return new Product(uuid() || null, name, price);
      case "b":
        return new ProductB(uuid() || null, name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}