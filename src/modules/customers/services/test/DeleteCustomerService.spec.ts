import 'reflect-metadata';
import DeleteCustomerService from '../DeleteCustomerService';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { createConnection, getConnection } from 'typeorm';

let deleteCustomer: DeleteCustomerService;

describe('DeleteCustomer', () => {
  beforeAll(async () => {
    await createConnection();
  });
  afterAll(async () => {
    const defaultConnection = getConnection('default');
    await defaultConnection.close();
  });
  beforeEach(() => {
    const customer = new CustomersRepository();
    deleteCustomer = new DeleteCustomerService(customer);
  });
  /*it('should be able to delete at customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Lucas Carvalho',
      email: 'lucas@hotmail.com',
    });

    expect(
      await deleteCustomer.execute({
        id: customer.id,
      }),
    ).toBe(undefined);
  });*/

  it('Costumer not found', async () => {
    expect(
      deleteCustomer.execute({
        id: '1384d8sa6d4a98',
      }),
    ).rejects.toMatch('Error');
  });
});
