import { Request, Response } from "express";
import { CategoryMongoRepository } from "../../repositories/mongoRepositories/CategoryMongoRepository.js";
import { serverErrorResponse, sucessfulResponse } from "../../responses/appResponses.js";
import { GetByGuideIdCategoryService } from "../../services/categories/GetByGuideIdCategoryService.js";

class GetByGuideIdCategoryController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];

      const categoryRepository = new CategoryMongoRepository();
      const categoryService = new GetByGuideIdCategoryService(categoryRepository);

      const result = await categoryService.execute(id);

      return sucessfulResponse(res, { data: result });
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const getByGuideIdCategoryController = new GetByGuideIdCategoryController();
