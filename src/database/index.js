import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import MaintenanceForm from "./models/MaintenanceForm";
import { mySchema } from "./schema";

const adapter = new SQLiteAdapter({
  schema: mySchema,
  jsi: false,
  onSetUpError: (error) => console.error("DB Setup Error:", error),
});

export const database = new Database({
  adapter,
  modelClasses: [MaintenanceForm],
});
