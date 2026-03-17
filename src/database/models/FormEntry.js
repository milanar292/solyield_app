import { Model } from "@nozbe/watermelondb";
import { date, field, readonly } from "@nozbe/watermelondb/decorators";

export default class FormEntry extends Model {
  static table = "form_entries";

  @field("form_id") formId;
  @field("site_id") siteId;
  @field("site_name") siteName;
  @field("technician_id") technicianId;
  @field("form_data") formData;
  @field("media_paths") mediaPaths;
  @field("is_synced") isSynced;

  @readonly @date("created_at") createdAt;
  @date("updated_at") updatedAt;

  get parsedFormData() {
    try {
      return JSON.parse(this.formData);
    } catch {
      return {};
    }
  }

  get parsedMediaPaths() {
    try {
      return JSON.parse(this.mediaPaths);
    } catch {
      return [];
    }
  }
}
