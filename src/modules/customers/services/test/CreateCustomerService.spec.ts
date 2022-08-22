import 'reflect-metadata';
import CreateCustomerService from '../CreateCustomerService';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { createConnection, getConnection } from 'typeorm';

let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeAll(async () => {
    await createConnection();
  });
  afterAll(async () => {
    const defaultConnection = getConnection('default');
    await defaultConnection.close();
  });
  /*it('should be able to create a new customer', async () => {
    const customer = new CustomersRepository();
    createCustomer = new CreateCustomerService(customer);

    await createCustomer.execute({
      name: 'Lucas Carvalho',
      email: 'lucas@hotmail.com',
    });

    expect(customer).toHaveProperty(customer);
  });*/

  it('should not be able to create two customer with the same email', async () => {
    const customer = new CustomersRepository();
    createCustomer = new CreateCustomerService(customer);

    expect(
      createCustomer.execute({
        name: 'Lucas Carvalho',
        email: 'Lucascarvalho@hotmail.com',
      }),
    ).rejects.toMatch('Error');
  });
});
