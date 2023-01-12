import { Request, Response } from "express";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { CategoryMongoRepository } from "../../repositories/mongoRepositories/CategoryMongoRepository.js";
import { DeleteLogicCategoryService } from "../../services/categories/DeleteLogicCategoryService.js";

class DeleteLogicCategoryController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const categoryRepository = new CategoryMongoRepository();
      const categoryService = new DeleteLogicCategoryService(categoryRepository);

      if (!req.currentUser._id) {
        return clientErrorResponse(res, "User ID not found");
      }

      const result = await categoryService.execute(id, req.currentUser._id);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const deleteLogicCategoryController = new DeleteLogicCategoryController();
