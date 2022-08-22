import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(customer: ICustomer): Promise<ICustomer[] | undefined> {
    const customers = await this.customersRepository.findAll(customer);

    return customers;
  }
}

export default ListCustomerService;
