import { Request, Response } from "express";
import { CategoryMongoRepository } from "../../repositories/mongoRepositories/CategoryMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { DeleteCategoryService } from "../../services/categories/DeleteCategoryService.js";

class DeleteCategoryController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const categoryRepository = new CategoryMongoRepository();
      const categoryService = new DeleteCategoryService(categoryRepository);

      const result = await categoryService.execute(id);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const deleteCategoryController = new DeleteCategoryController();
