import { Model } from "@nozbe/watermelondb";

export default class MaintenanceForm extends Model {
  static table = "maintenance_forms";
  static associations = {};

  get inverterSerial() {
    return this._getRaw("inverter_serial");
  }
  set inverterSerial(v) {
    this._setRaw("inverter_serial", v);
  }

  get generationKw() {
    return this._getRaw("generation_kw");
  }
  set generationKw(v) {
    this._setRaw("generation_kw", v);
  }

  get panelCondition() {
    return this._getRaw("panel_condition");
  }
  set panelCondition(v) {
    this._setRaw("panel_condition", v);
  }

  get photoPath() {
    return this._getRaw("photo_path");
  }
  set photoPath(v) {
    this._setRaw("photo_path", v);
  }

  get isSynced() {
    return this._getRaw("is_synced");
  }
  set isSynced(v) {
    this._setRaw("is_synced", v);
  }

  get createdAt() {
    return this._getRaw("created_at");
  }
  set createdAt(v) {
    this._setRaw("created_at", v);
  }
}
