import { PrismaService } from "src/prisma.service";
import { ProductsService } from "./products.service";
import { Test, TestingModule } from "@nestjs/testing";
import { Prisma } from "@prisma/client";

describe("ProductService", () => {
  let productsService: ProductsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, PrismaService],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(productsService).toBeDefined();
  });

  describe("getProduct", () => {
    it("should return a product", async () => {
      const mockProduct: Prisma.ProductWhereUniqueInput = {
        id: 1,
      };

      jest.spyOn(prismaService.product, "findUnique").mockResolvedValueOnce({
        id: mockProduct.id,
        title: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: "Apple",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      });
    });
  });

  describe("getProducts", () => {
    it("should return an array of products", async () => {
      const mockParams: {
        skip?: number;
        take?: number;
        cursor?: Prisma.ProductWhereUniqueInput;
        where?: Prisma.ProductWhereInput;
        orderBy?: Prisma.ProductOrderByWithRelationInput;
      } = {
        take: 5,
      };

      jest.spyOn(prismaService.product, "findMany").mockResolvedValueOnce([
        {
          id: 1,
          title: "iPhone 9",
          description: "An apple mobile which is nothing like apple",
          price: 549,
          discountPercentage: 12.96,
          rating: 4.69,
          stock: 94,
          brand: "Apple",
          category: "smartphones",
          thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        },
        {
          id: 2,
          title: "iPhone 9",
          description: "An apple mobile which is nothing like apple",
          price: 549,
          discountPercentage: 12.96,
          rating: 4.69,
          stock: 94,
          brand: "Apple",
          category: "smartphones",
          thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
        },
      ]);

      const result = await productsService.getProducts(mockParams);

      expect(result).toBeDefined();
      expect(result).toHaveLength(2);
    });
  });

  describe("createProduct", () => {
    it("should create a new product", async () => {
      const mockProductData: Prisma.ProductCreateInput = {
        title: "New Product",
        price: 19.99,
        description: "A brand new product for testing",
        brand: "TestBrand",
        category: "TestCategory",
        discountPercentage: 10,
        rating: 4.5,
        stock: 100,
        thumbnail: "newThumbnailURL",
      };

      jest.spyOn(prismaService.product, "create").mockResolvedValueOnce({
        id: 3, // Adjust based on your test scenario
        ...mockProductData,
      });

      const result = await productsService.createProduct(mockProductData);

      expect(result).toBeDefined();
      expect(result).toEqual(mockProductData);
    });
  });

  describe("updateProduct", () => {
    it("should update an existing product", async () => {
      const mockUpdateParams: {
        where: Prisma.ProductWhereUniqueInput;
        data: Prisma.ProductUpdateInput;
      } = {
        where: { id: 1 }, // Replace with an existing product ID
        data: {
          title: "Updated Product",
          price: 24.99,
          description: "An updated product for testing",
          brand: "UpdatedBrand",
          category: "UpdatedCategory",
          discountPercentage: 15,
          rating: 4.8,
          stock: 75,
          thumbnail: "updatedThumbnailURL",
        },
      };

      jest.spyOn(prismaService.product, "update").mockResolvedValueOnce({
        id: mockUpdateParams.where.id,
        title: "Updated Product",
        price: 24.99,
        description: "An updated product for testing",
        brand: "UpdatedBrand",
        category: "UpdatedCategory",
        discountPercentage: 15,
        rating: 4.8,
        stock: 75,
        thumbnail: "updatedThumbnailURL",
      });

      const result = await productsService.updateProduct(mockUpdateParams);

      expect(result).toBeDefined();
      expect(result).toEqual(mockUpdateParams);
    });
  });

  describe("deleteProduct", () => {
    it("should delete an existing product", async () => {
      const mockProductToDelete: Prisma.ProductWhereUniqueInput = {
        id: 1,
      };

      jest.spyOn(prismaService.product, "delete").mockResolvedValueOnce({
        id: mockProductToDelete.id,
        title: "iPhone 9",
        description: "An apple mobile which is nothing like apple",
        price: 549,
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        brand: "Apple",
        category: "smartphones",
        thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
      });

      const result = await productsService.deleteProduct(mockProductToDelete);

      expect(result).toBeDefined();
      expect(result).toEqual(mockProductToDelete);
    });
  });
});
