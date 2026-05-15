import type { Request, Response } from "express";
import { postApiService } from "../services/postApi.service";

interface PostApi {
  success: boolean;
  message: string;
  data: any;
}

export const postFakeApiController = async (
  req: Request<{ apiId: string; route: string }, {}, any>,
  res: Response<PostApi>,
) => {
  const { body } = req;
  const { apiId, route } = req.params;

  const result = await postApiService(apiId, route, body);
  res.json({
    success: true,
    message: "Added successfully",
    data: result,
  });
};
