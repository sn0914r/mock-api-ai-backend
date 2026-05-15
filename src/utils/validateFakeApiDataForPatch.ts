import { ERROR_CODES } from "../constants/errorCodes";
import AppError from "../errors/AppError";

export const validateFakeApiDataForPatch = (
  schema: Record<string, string>,
  body: Record<string, unknown>,
) => {
  for (const key in body) {
    const expectedType = schema[key];
    const actualValue = body[key];

    if (typeof actualValue !== expectedType) {
      throw new AppError(
        `${key} must be ${expectedType}`,
        400,
        ERROR_CODES.VALIDATION_ERROR,
      );
    }
  }
};
