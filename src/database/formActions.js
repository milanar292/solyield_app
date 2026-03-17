import { database } from "./index";

export const saveOfflineForm = async (formData) => {
  await database.write(async () => {
    await database.get("maintenance_forms").create((form) => {
      form._setRaw("inverter_serial", formData.inverter_serial ?? "");
      form._setRaw("generation_kw", formData.generation_kw ?? 0);
      form._setRaw("panel_condition", formData.panel_condition ?? "");
      form._setRaw("photo_path", formData.photo_path ?? "");
      form._setRaw("is_synced", false);
      form._setRaw("created_at", Date.now());
    });
  });
};

export const getUnsyncedForms = async () => {
  const forms = await database.get("maintenance_forms").query().fetch();
  return forms.filter((f) => f._getRaw("is_synced") === false);
};
