import 'reflect-metadata';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvides';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';
import CreateSessionsService from '../CreateSessionsService';

let fakeUserRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let fakeHashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUserRepository.create({
      name: 'Lucas Carvalho',
      email: 'Lucascarvalho@hotmail.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'Lucascarvalho@hotmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate with non existent user', async () => {
    expect(
      createSession.execute({
        email: 'Lucascarvalho@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUserRepository.create({
      name: 'Lucas Carvalho',
      email: 'Lucascarvalho@hotmail.com',
      password: '123456',
    });

    expect(
      createSession.execute({
        email: 'Lucascarvalho@hotmail.com',
        password: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
