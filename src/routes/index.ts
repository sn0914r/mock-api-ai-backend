import { Router } from "express";
import { generateController } from "../controllers/generate.controller";
import {
  deleteFakeApiController,
  getFakeApiController,
  patchFakeApiController,
  postFakeApiController,
  putFakeApiController,
} from "../controllers/fakeApi.controller";
import { validate } from "../middlewares/validation";
import { generateApiSchema } from "../schemas/generateAPiSchema";

const router = Router();

router.post("/generate", validate(generateApiSchema), generateController);
router.get("/api/:apiId/:route", getFakeApiController);
router.post("/api/:apiId/:route", postFakeApiController);
router.put("/api/:apiId/:route/:elementId", putFakeApiController);
router.patch("/api/:apiId/:route/:elementId", patchFakeApiController);
router.delete("/api/:apiId/:route/:elementId", deleteFakeApiController);

export default router;
