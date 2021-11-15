import faker from "faker";

function validBodyFactoryProduct() {
    return {
        name: faker.name.findName(),
        price: faker.datatype.number(),
        imgeUrl: faker.internet.avatar(),
        descrition: faker.lorem.text(),
    };
}

function invalidBodyFactoryProduct() {
    return {
        name: faker.name.findName(),
        imgeUrl: faker.internet.avatar(),
        descrition: faker.lorem.text(),
    };
}

export { validBodyFactoryProduct, invalidBodyFactoryProduct };
