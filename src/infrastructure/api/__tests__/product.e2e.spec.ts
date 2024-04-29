import product from "../../../domain/product/entity/product";
import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                id: "1",
                name: "Anador",
                price: 1.90
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Anador");
        expect(response.body.price).toBe(1.90);
    });

    it("should not create a product", async () => {
        const response = await request(app).post("/product").send({
            name: "Anador",
        });
        expect(response.status).toBe(500);
    });

    it("should list all product", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                id: "1",
                name: "Anador",
                price: 1.90
            });
        expect(response.status).toBe(200);
        const response2 = await request(app)
            .post("/product")
            .send({
                id: "2",
                name: "Dorflex",
                price: 4.99
            });
        expect(response2.status).toBe(200);

        const listResponse = await request(app).get("/product").send();

        expect(listResponse.status).toBe(200);
        expect(listResponse.body.products.length).toBe(2);
        const product = listResponse.body.products[0];
        expect(product.name).toBe("Anador");
        const product2 = listResponse.body.products[1];
        expect(product2.name).toBe("Dorflex");

        const listResponseXML = await request(app)
            .get("/product")
            .set("Accept", "application/xml")
            .send();

        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXML.text).toContain(`<products>`);
        expect(listResponseXML.text).toContain(`<product>`);
        expect(listResponseXML.text).toContain(`<name>Anador</name>`);
        expect(listResponseXML.text).toContain(`<price>1.9</price>`);
        expect(listResponseXML.text).toContain(`<name>Dorflex</name>`);
        expect(listResponseXML.text).toContain(`<price>4.99</price>`);
        expect(listResponseXML.text).toContain(`</product>`);
        expect(listResponseXML.text).toContain(`</products>`);
    });
});
