import type { Request, Response } from "express";
import {
  deleteFakeApi,
  getFakeApi,
  patchFakeApi,
  postFakeApi,
  putFakeApi,
} from "../services/fakeApi.service";

/**
 * @route GET /api/:apiId/:route
 * @access Public
 */
export const getFakeApiController = async (
  req: Request<{ apiId: string; route: string }>,
  res: Response<{ success: boolean; message: string; data: any }>,
) => {
  const { apiId, route } = req.params;
  const result = await getFakeApi(apiId, route);

  res.status(200).json({
    success: true,
    message: "Data fetched successfully",
    data: result,
  });
};

/**
 * @route POST /api/:apiId/:route
 * @access Public
 */
export const postFakeApiController = async (
  req: Request<{ apiId: string; route: string }, {}, any>,
  res: Response<{ success: boolean; message: string; data: any }>,
) => {
  const { apiId, route } = req.params;
  const result = await postFakeApi(apiId, route, req.body);

  res.status(201).json({
    success: true,
    message: "Data added successfully",
    data: result,
  });
};

/**
 * @route PUT /api/:apiId/:route/:elementId
 * @access Public
 */
export const putFakeApiController = async (
  req: Request<{ apiId: string; elementId: string; route: string }, {}, any>,
  res: Response<{ success: boolean; message: string; data: any }>,
) => {
  const { apiId, route, elementId } = req.params;
  const result = await putFakeApi(apiId, route, elementId, req.body);

  res.status(200).json({
    success: true,
    message: "Data updated successfully",
    data: result,
  });
};

/**
 * @route PATCH /api/:apiId/:route/:elementId
 * @access Public
 */
export const patchFakeApiController = async (
  req: Request<{ apiId: string; route: string; elementId: string }, {}, any>,
  res: Response<{ success: boolean; message: string; data: any }>,
) => {
  const { apiId, route, elementId } = req.params;
  const result = await patchFakeApi(apiId, route, elementId, req.body);

  res.status(200).json({
    success: true,
    message: "Data updated successfully",
    data: result,
  });
};

/**
 * @route DELETE /api/:apiId/:route/:elementId
 * @access Public
 */
export const deleteFakeApiController = async (
  req: Request<{ apiId: string; route: string; elementId: string }>,
  res: Response<{ success: boolean; message: string }>,
) => {
  const { apiId, route, elementId } = req.params;
  await deleteFakeApi(apiId, route, elementId);

  res.status(200).json({
    success: true,
    message: "Deleted successfully",
  });
};
