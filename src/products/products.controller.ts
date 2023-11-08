import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Product } from "./interfaces/product.interface";
import { Prisma } from "@prisma/client";

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
    data: Prisma.ProductCreateInput
  ): Promise<Product> {
    return this.productService.createProduct(data);
  }

  @Patch("products/:id")
  async updateProduct(
    @Param("id") id: number,
    @Body() data: Prisma.ProductUpdateInput
  ) {
    return this.productService.updateProduct({ where: { id }, data });
  }

  @Delete("products")
  async deleteProduct(@Param("id") id: number): Promise<Product> {
    return this.productService.deleteProduct({ id });
  }
}
