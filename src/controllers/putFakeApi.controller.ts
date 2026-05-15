import type { Request, Response } from "express";
import { putFakeApi } from "../services/putFakeApi.service";

export const putFakeApiController = async (
  req: Request<{ apiId: string; elementId: string; route: string }, {}, any>,
  res: Response<{ success: boolean; message: string; data: any }>,
) => {
  const { apiId, elementId, route } = req.params;
  const { body } = req;

  const result = await putFakeApi(apiId, route, elementId, body);

  res.json({
    success: true,
    message: "updated the doc successfully",
    data: result,
  });
};
