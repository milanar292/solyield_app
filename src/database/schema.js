import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "maintenance_forms",
      columns: [
        { name: "inverter_serial", type: "string" },
        { name: "generation_kw", type: "number" },
        { name: "panel_condition", type: "string" },
        { name: "photo_path", type: "string", isOptional: true },
        { name: "is_synced", type: "boolean" },
        { name: "created_at", type: "number" },
      ],
    }),
  ],
});
