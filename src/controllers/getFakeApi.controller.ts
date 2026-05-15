import type { Request, Response } from "express";
import { getFakeAPI } from "../services/getFakeApi.service";

export const getFakeApiController = async (
  req: Request<{ apiId: string; route: string }>,
  res: Response,
) => {
  const { apiId, route } = req.params;
  console.log("INFO: ", apiId, route);
  const result = await getFakeAPI(apiId, route);

  res.status(200).json({
    success: true,
    message: "data fetched successfully",
    data: result,
  });
};
