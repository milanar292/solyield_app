import { useEffect, useState } from "react";
import { AppState } from "react-native";
import { database } from "../src/database";

export function useSyncEngine() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        syncPendingData();
      }
    });
    return () => subscription.remove();
  }, []);

  const syncPendingData = async () => {
    try {
      const allForms = await database.get("maintenance_forms").query().fetch();

      const unsynced = allForms.filter((f) => f._getRaw("is_synced") === false);

      if (unsynced.length === 0) return;

      await database.write(async () => {
        for (const form of unsynced) {
          await form.update((f) => {
            f._setRaw("is_synced", true);
          });
        }
      });

      console.log(`Synced ${unsynced.length} forms`);
    } catch (e) {
      console.error("Sync failed:", e);
    }
  };

  return isOnline;
}
