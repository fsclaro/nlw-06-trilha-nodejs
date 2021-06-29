import { UsersRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";
interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({ name, email, admin, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error("Email incorrect");
    }

    if (!password) {
      throw new Error("Empty password");
    }

    const userAlredyExists = await usersRepository.findOne({ email });

    if (userAlredyExists) {
      throw new Error("User alredy exists");
    }

    const user = usersRepository.create({
      name,
      email,
      admin,
      password
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
