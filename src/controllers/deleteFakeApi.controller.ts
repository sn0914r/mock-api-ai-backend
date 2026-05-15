import type { Request, Response } from "express";
import { deleteFakeApi } from "../services/deleteFakeApi.service";

export const deleteFakeApiController = async (
  req: Request<{ apiId: string; route: string; elementId: string }>,
  res: Response<{ success: true; message: string }>,
) => {
  const { apiId, route, elementId } = req.params;
  await deleteFakeApi(apiId, route, elementId);

  res.status(200).json({
    success: true,
    message: "deleted successfully",
  });
};
