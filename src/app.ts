import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(routes);
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.use(errorHandler);
export default app;
