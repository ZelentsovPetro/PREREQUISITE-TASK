import { faker } from "@faker-js/faker";
import { IUser} from "../interfaces/interfaces";

export class UserFactory {
  static getRandomUser(): IUser {
    return {
      userName: faker.internet.email(),
      password: faker.internet.password({ length: 10 }),
    };
  };

  static getRandomIP()  {
    return {
      ip: faker.internet.ipv4()
    }
  }
}
