import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./interfaces/product.interface";

@Controller("products")
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get("products")
  async getProducts(): Promise<Product[]> {
    return this.productService.getProducts({});
  }

  @Get("products/:id")
  async getProduct(@Param("id") id: number): Promise<Product> {
    return this.productService.getProduct({ id });
  }

  @Post("products")
  async createProduct(
    @Body()
    data: {
      title: string;
      price: number;
      description: string;
      brand: string;
      category: string;
      discountPercentage: number;
      rating: number;
      stock: number;
      thumbnail: string;
    }
  ): Promise<Product> {
    return this.productService.createProduct(data);
  }

  @Delete("products")
  async deleteProduct(@Param("id") id: number): Promise<Product> {
    return this.productService.deleteProduct({ id });
  }
}
