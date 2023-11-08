import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { PrismaService } from "src/prisma.service"; // Ensure correct path
import { Prisma } from "@prisma/client";

describe("ProductsController", () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, PrismaService],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  describe("getProducts", () => {
    it("should return an array of products", async () => {
      jest.spyOn(productsService, "getProducts").mockResolvedValueOnce([
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

      const result = await productsController.getProducts();

      expect(result).toBeDefined();
    });
  });

  describe("getProduct", () => {
    it("should return a product by ID", async () => {
      const mockProductId = 1; // Replace with an existing product ID
      jest.spyOn(productsService, "getProduct").mockResolvedValueOnce({
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
      });

      const result = await productsController.getProduct(mockProductId);

      expect(result).toBeDefined();
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

      jest.spyOn(productsService, "createProduct").mockResolvedValueOnce({
        id: 1,
        ...mockProductData,
      });

      const result = await productsController.createProduct(mockProductData);

      expect(result).toBeDefined();
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product by ID", async () => {
      const mockProductId = 1; // Replace with an existing product ID
      jest.spyOn(productsService, "deleteProduct").mockResolvedValueOnce({
        id: mockProductId,
        title: "New Product",
        price: 19.99,
        description: "A brand new product for testing",
        brand: "TestBrand",
        category: "TestCategory",
        discountPercentage: 10,
        rating: 4.5,
        stock: 100,
        thumbnail: "newThumbnailURL",
      });

      const result = await productsController.deleteProduct(mockProductId);

      expect(result).toBeDefined();
    });
  });
});
