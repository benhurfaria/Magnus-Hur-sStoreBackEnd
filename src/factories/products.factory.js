import faker from "faker";

function validBodyFactoryPorduct() {
    return {
        name: faker.name.findName(),
        price: faker.datatype.number(),
        imgeUrl: faker.internet.avatar(),
        descrition: faker.lorem.text(),
    };
}

function invalidBodyFactoryPorduct() {
    return {
        name: faker.name.findName(),
        imgeUrl: faker.internet.avatar(),
        descrition: faker.lorem.text(),
    };
}

export { validBodyFactoryPorduct, invalidBodyFactoryPorduct };
