import type { Request, Response } from "express";
import { patchFakeApi } from "../services/patchFakeApi.service";

interface PatchFakeApiResponse {
  success: boolean;
  message: string;
  data: any;
}

export const patchFakeApiController = async (
  req: Request<{ apiId: string; route: string; elementId: string }, {}, any>,
  res: Response<PatchFakeApiResponse>,
) => {
  const { apiId, route, elementId } = req.params;
  const data = req.body;

  const result = await patchFakeApi(apiId, route, elementId, data);

  res.status(200).json({
    success: true,
    message: "Updated the data successfully",
    data: result,
  });
};
