import 'reflect-metadata';
import CreateCustomerService from '../CreateCustomerService';
import FakeCustomerRepository from '@modules/customers/domain/repositories/fakes/FakeCustomersRepository';
import AppError from '@shared/errors/AppError';

let fakeCustomerRepository: FakeCustomerRepository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    createCustomer = new CreateCustomerService(fakeCustomerRepository);
  });
  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Lucas Carvalho',
      email: 'Lucascarvalho@hotmail.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customer with the same email', async () => {
    await createCustomer.execute({
      name: 'Lucas Carvalho',
      email: 'Lucascarvalho@hotmail.com',
    });

    expect(
      createCustomer.execute({
        name: 'Lucas Carvalho',
        email: 'Lucascarvalho@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
