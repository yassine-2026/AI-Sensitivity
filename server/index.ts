import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import rateLimit from "express-rate-limit";
import path from "path";
import { createServer as createViteServer } from "vite";

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

async function startServer() {
  const app = express();
  const isProd = process.env.NODE_ENV === "production";

  // Security and performance middleware
  app.use(helmet({
    contentSecurityPolicy: isProd ? {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "blob:"],
        workerSrc: ["'self'", "blob:"],
        connectSrc: ["'self'", "https://huggingface.co", "https://cdn-lfs.huggingface.co"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "blob:", "https://images.unsplash.com"],
      }
    } : false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false
  }));
  
  app.use(cors());
  app.use(compression());
  app.use(express.json());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: "Too many requests from this IP, please try again later." }
  });
  app.use("/api", limiter);

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.get("/api/version", (req, res) => {
    res.json({ version: "1.0.0" });
  });

  app.get("/api/config", (req, res) => {
    res.json({ 
      maintenance: false,
      aiModelStatus: "active"
    });
  });

  app.get("/api/status", (req, res) => {
    res.json({ status: "online" });
  });

  // Vite middleware for development or static serving for production
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { maxAge: '1y' }));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Global Error Handler
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("Global Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT} in ${isProd ? 'production' : 'development'} mode`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
