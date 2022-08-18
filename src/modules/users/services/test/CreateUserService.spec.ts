import 'reflect-metadata';
import CreateUserService from '../CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvides';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Lucas Carvalho',
      email: 'Lucascarvalho@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create two customer with the same email', async () => {
    await createUser.execute({
      name: 'Lucas Carvalho',
      email: 'Lucascarvalho@hotmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Lucas Carvalho',
        email: 'Lucascarvalho@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
