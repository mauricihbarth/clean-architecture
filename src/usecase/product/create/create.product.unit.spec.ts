import { UUID, UUIDV4 } from "sequelize";
import { v4 as uuid } from "uuid";

import CreateProductUseCase from "./create.product.usecase";
const input = {
    id: "123",
    type: "a",
    name: "John",
    price: 9.97
};

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            type : null,
            price: input.price
        });
    });

    it("should thrown an error when name is missing", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = "";

        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "Name is required"
        );
    });

    it("should thrown an error when price is less 0", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = "Teste";
        input.price = -1;

        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "Price must be greater than zero"
        );
    });

    it("should thrown an error when id is unknown", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);
        
        input.price = 88;
        input.id = "";

        await expect(productCreateUseCase.execute(input)).rejects.toThrow(
            "Id is required"
        );
    });

});