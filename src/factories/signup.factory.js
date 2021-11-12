import faker from "faker";

function validBodyFactorySignup() {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

export { validBodyFactorySignup };
