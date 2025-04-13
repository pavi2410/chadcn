import { db } from "@/db";
import { registryTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export function getAllRegistries() {
  return db.select().from(registryTable);
}

export function getRegistryById(id: number) {
  return db.select().from(registryTable)
    .where(eq(registryTable.id, id));
}