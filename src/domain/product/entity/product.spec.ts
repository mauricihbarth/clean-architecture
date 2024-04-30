import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let product = new Product("", "Product 1", 100);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let product = new Product("123", "", 100);
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    let product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    let product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });

  it("should throw error when price is less than zero", () => {
    var t = expect(() => {
      let product = new Product("123", "NameSS", -1);
    // }).toThrowError("Price must be zero or greater");
     }).toThrowError("Price must be greater than zero");
  });

  // it("should throw error when name is empty and price is less than zero", () => {
  //   var t = expect(() => {
  //     let product = new Product("123", "", -1);
  //   }).toThrowError("product: Name is required,product: Price must be zero or greater");

  // });
});

