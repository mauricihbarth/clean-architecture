import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test list product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const usecase = new ListProductUseCase(productRepository);

        const product = new Product("11", "Anador", 10.5);
        const product2 = new Product("22", "Anador2", 10.9);
        await productRepository.create(product);
        await productRepository.create(product2);
        var output = await productRepository.findAll();

        const result = await usecase.execute([]);

        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe(product.id);
        expect(result.products[0].name).toBe(product.name);
        expect(result.products[0].price).toBe(product.price);
    });
});
