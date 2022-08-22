import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user: IUser): Promise<IUser | undefined> {
    const users = await this.usersRepository.findAll(user);

    return users;
  }
}

export default ListUserService;
