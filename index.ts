import "dotenv/config";
import express, {
  type Application,
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc, {
  type Options as SwaggerJSDocOptions,
} from "swagger-jsdoc";

import connectMongo from "./db/db.ts";
import activitiesRoutes from "./routes/activities.routes.ts";
import subActivitiesRoutes from "./routes/subActivity.routes.ts";
import transactionTypesRoutes from "./routes/transactionType.routes.ts";
const app: Application = express();

let isDbConnected = false;
async function ensureDbConnection(): Promise<void> {
  if (!isDbConnected) {
    await connectMongo();
    console.log("MongoDB connected successfully.");
    isDbConnected = true;
  }
}

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try {
    await ensureDbConnection();
    next();
  } catch (err) {
    console.error("Failed to connect to Mongo:", err);
    res.status(500).json({ error: "Database connection error" });
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const swaggerOptions: SwaggerJSDocOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "FMS Wassel App Express API with Swagger",
      version: "0.1.0",
      description: "",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:8080/api/v1",
      },
    ],
  },
  apis: ["./docs/*.ts"],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use("/api/v1/activities", activitiesRoutes);
app.use("/api/v1/sub-activities", subActivitiesRoutes);
app.use("/api/v1/transaction-types", transactionTypesRoutes);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
