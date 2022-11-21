import { Request, Response } from "express";
import { CategoryMongoRepository } from "../../repositories/mongoRepositories/CategoryMongoRepository.js";
import { serverErrorResponse, sucessfulResponse } from "../../responses/appResponses.js";
import { GetAllCategoriesService } from "../../services/categories/GetAllCategoriesService.js";

class GetAllCategoriesController {
  async handler(req: Request, res: Response) {
    try {
      const categoryRepository = new CategoryMongoRepository();
      const categoryService = new GetAllCategoriesService(categoryRepository);

      const result = await categoryService.execute();

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const getAllCategoriesController = new GetAllCategoriesController();
