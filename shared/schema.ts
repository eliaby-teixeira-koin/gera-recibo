import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const receipts = pgTable("receipts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  document: text("document").notNull(),
  date: text("date").notNull(),
  description: text("description").notNull(),
  amount: text("amount").notNull(),
  paymentMethod: text("payment_method").notNull(),
  location: text("location").notNull(),
  signature: text("signature").notNull(),
  logo: text("logo"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertReceiptSchema = createInsertSchema(receipts).omit({
  id: true,
  createdAt: true
});

export type InsertReceipt = z.infer<typeof insertReceiptSchema>;
export type Receipt = typeof receipts.$inferSelect;
