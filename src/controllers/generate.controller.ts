import type { Request, Response } from "express";
import { generateApiService } from "../services/generate.service";

interface GenerateApiRequest {
  prompt: string;
  limit: number;
}

interface GenerateApiResponse {
  success: boolean;
  message: string;
  data: {
    apiId: string;
    route: string;
    apiUrl: string;
  };
}

export const generateController = async (
  req: Request<{}, {}, GenerateApiRequest>,
  res: Response<GenerateApiResponse>
) => {
  const { prompt, limit } = req.body;
  const result = await generateApiService(prompt, limit);

  res.status(200).json({
    success: true,
    message: "API created successfully",
    data: result,
  });
};
