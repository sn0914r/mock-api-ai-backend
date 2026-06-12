import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index";
import errorHandler from "./middlewares/errorHandler";

import { openApiSpec } from "./configs/openapi";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(routes);

app.use("/docs", (req, res, next) => {
  import("@scalar/express-api-reference")
    .then(({ apiReference }) => {
      apiReference({
        content: openApiSpec,
        theme: "deepSpace",
        customCss: ".darklight, .integrations { display: none !important; }",
      })(req as any, res as any, next);
    })
    .catch(next);
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.use(errorHandler);
export default app;
