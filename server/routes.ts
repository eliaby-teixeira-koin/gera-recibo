import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertReceiptSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.get("/api/receipts", async (req: Request, res: Response) => {
    try {
      const receipts = await storage.getReceipts();
      res.json(receipts);
    } catch (err) {
      console.error("Error fetching receipts:", err);
      res.status(500).json({ message: "Failed to fetch receipts" });
    }
  });

  app.get("/api/receipts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id, 10);
      const receipt = await storage.getReceipt(id);
      
      if (!receipt) {
        return res.status(404).json({ message: "Receipt not found" });
      }
      
      res.json(receipt);
    } catch (err) {
      console.error("Error fetching receipt:", err);
      res.status(500).json({ message: "Failed to fetch receipt" });
    }
  });

  app.post("/api/receipts", async (req: Request, res: Response) => {
    try {
      const validatedData = insertReceiptSchema.parse(req.body);
      const newReceipt = await storage.createReceipt(validatedData);
      res.status(201).json(newReceipt);
    } catch (err) {
      console.error("Error creating receipt:", err);
      
      // Check if it's a validation error
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
      
      res.status(500).json({ message: "Failed to create receipt" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
