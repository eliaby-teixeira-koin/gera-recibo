import { receipts, type Receipt, type InsertReceipt } from "@shared/schema";

export interface IStorage {
  getReceipt(id: number): Promise<Receipt | undefined>;
  getReceipts(): Promise<Receipt[]>;
  createReceipt(receipt: InsertReceipt): Promise<Receipt>;
}

export class MemStorage implements IStorage {
  private receipts: Map<number, Receipt>;
  currentId: number;

  constructor() {
    this.receipts = new Map();
    this.currentId = 1;
  }

  async getReceipt(id: number): Promise<Receipt | undefined> {
    return this.receipts.get(id);
  }

  async getReceipts(): Promise<Receipt[]> {
    return Array.from(this.receipts.values());
  }

  async createReceipt(insertReceipt: InsertReceipt): Promise<Receipt> {
    const id = this.currentId++;
    const now = new Date();
    const receipt: Receipt = { 
      ...insertReceipt, 
      id,
      createdAt: now
    };
    this.receipts.set(id, receipt);
    return receipt;
  }
}

export const storage = new MemStorage();
