import { Request, Response } from "express";
import { CategoryMongoRepository } from "../../repositories/mongoRepositories/CategoryMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { UpdateCategoryService } from "../../services/categories/UpdateCategoryService.js";

class UpdateCategoryController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];
      const body = req.body;

      const categoryRepository = new CategoryMongoRepository();
      const categoryService = new UpdateCategoryService(categoryRepository);

      const result = await categoryService.execute(id, body);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const updateCategoryController = new UpdateCategoryController();
