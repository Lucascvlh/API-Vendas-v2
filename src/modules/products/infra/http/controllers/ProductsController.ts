import { Request, Response } from 'express';
import CreateProductService from '../../../services/CreateProductService';
import DeleteProductService from '../../../services/DeleteProductServices';
import ListProductService from '../../../services/ListProductService';
import ShowProductService from '../../../services/ShowProductService';
import UpdateProductService from '../../../services/UpdateProductService';

export default class ProductsController {
  /*Mostrar a lista de produtos */
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = new ListProductService();

    const products = await listProducts.execute();

    return response.json(products);
  }
  /*Mostrar um único produto através do ID */
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowProductService();

    const produtc = await showProduct.execute({ id });

    return response.json(produtc);
  }
  /*Criar um novo produto*/
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();

    const produtc = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json(produtc);
  }
  /*Atualizar um produto*/
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;

    const { id } = request.params;

    const updateProduct = new UpdateProductService();

    const produtc = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(produtc);
  }
  /*Deletar um produto*/
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    return response.json([]);
  }
}
