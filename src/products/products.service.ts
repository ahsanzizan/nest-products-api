import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Product, Prisma } from "@prisma/client";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProduct(
    productWhereUniqueInput: Prisma.ProductWhereUniqueInput
  ): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: productWhereUniqueInput });
  }

  async getProducts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({ skip, take, cursor, where, orderBy });
  }

  async createProduct(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }): Promise<Product> {
    const { where, data } = params;
    return this.prisma.product.update({ where, data });
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({ where });
  }
}
