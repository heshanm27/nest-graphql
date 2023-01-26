import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductFilterInput } from './dto/filter_product_input';
import { ProductSearchInput } from './dto/search_product_Input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    return await this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'findAllProduct' })
  async findAll(
    @Args('FilterOptions') filteroptions: ProductFilterInput,
  ): Promise<Product[]> {
    return this.productService.findAll(filteroptions);
  }

  @Query(() => Product, { name: 'findOneProduct' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Query(() => [Product], { name: 'searchProduct' })
  searchProduct(
    @Args('search') search: ProductSearchInput,
  ): Promise<Product[]> {
    return this.productService.search(search);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => Product)
  removeProduct(@Args('id', { type: () => Int }) id: number): Promise<Product> {
    return this.productService.remove(id);
  }
}
