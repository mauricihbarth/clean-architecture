import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import CreateProductUseCase from "../create/create.product.usecase";

describe("Test update product use case", () => {
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

    it("should update a product", async () => {

        const productRepository = new ProductRepository();
        const usecaseCreate = new CreateProductUseCase(productRepository);

        var product = new Product("123", "Anador", 10.5);
        await productRepository.create(product);
        const inputCreate = {
            id: '123',
            name: 'Teste',
            price: 1.5
        };
        await usecaseCreate.execute(inputCreate);
        await productRepository.find(product.id);

        const usecaseUpdate = new UpdateProductUseCase(productRepository);
        product.changeName("Desodorante");
        product.changePrice(1.9);
        await productRepository.update(product);

        const inputUpdate = {
            id: product.id,
            name: product.name,
            price: product.price
        };
        var output = await usecaseUpdate.execute(inputUpdate);

        expect(output).toEqual({
            id: expect.any(String),
            name: inputUpdate.name,
            price: inputUpdate.price
        });
    });
});
