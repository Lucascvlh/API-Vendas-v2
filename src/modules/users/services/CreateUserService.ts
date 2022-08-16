import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';

import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}
  public async execute({ name, email, password }: IUser): Promise<IUser> {
    const emailExists = await this.userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    /* Criação do hash da senha com BCryptjs*/
    const hashedPassword = await hash(password, 8);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
