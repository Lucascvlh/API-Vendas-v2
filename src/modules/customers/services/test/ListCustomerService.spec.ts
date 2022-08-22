import 'reflect-metadata';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';
import { createConnection, getConnection } from 'typeorm';
import ListCustomerService from '../ListCustomerService';

let listCustomer: ListCustomerService;

describe('ListCustomer', () => {
  beforeAll(async () => {
    await createConnection();
  });
  afterAll(async () => {
    const defaultConnection = getConnection('default');
    await defaultConnection.close();
  });
  beforeEach(() => {
    const customer = new CustomersRepository();
    listCustomer = new ListCustomerService(customer);
  });

  it('List Costumer', async () => {
    const customer = new CustomersRepository();
    expect(listCustomer.execute(customer.findAll()))
    );
  });
});
