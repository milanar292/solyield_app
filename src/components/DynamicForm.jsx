import { useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { formSchema } from "../data/form_schema";
import { saveFormOffline } from "../database/formActions";

export default function DynamicForm({ siteId = "site_001" }) {
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  const updateField = (fieldId, value) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSave = async () => {
    // Check required fields
    for (const section of formSchema.sections) {
      for (const field of section.fields) {
        if (field.required && !formData[field.id]) {
          Alert.alert("Required", `Please fill in: ${field.label}`);
          return;
        }
      }
    }
    setSaving(true);
    try {
      await saveFormOffline({
        formId: formSchema.id,
        siteId,
        formData,
        mediaPaths: [],
      });
      Alert.alert(
        "Saved Offline ✅",
        "Form saved locally. Will sync when online.",
      );
      setFormData({});
    } catch (e) {
      Alert.alert("Error", e.message);
    }
    setSaving(false);
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
      case "number":
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.label}>
              {field.label}
              {field.required ? " *" : ""}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={field.placeholder}
              keyboardType={field.type === "number" ? "numeric" : "default"}
              value={formData[field.id] || ""}
              onChangeText={(val) => updateField(field.id, val)}
            />
          </View>
        );

      case "select":
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.label}>
              {field.label}
              {field.required ? " *" : ""}
            </Text>
            <View style={styles.optionsRow}>
              {field.options.map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.chip,
                    formData[field.id] === opt && styles.chipSelected,
                  ]}
                  onPress={() => updateField(field.id, opt)}
                >
                  <Text
                    style={
                      formData[field.id] === opt
                        ? styles.chipTextSelected
                        : styles.chipText
                    }
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case "radio":
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.label}>{field.label}</Text>
            {field.options.map((opt) => (
              <TouchableOpacity
                key={opt}
                style={styles.radioRow}
                onPress={() => updateField(field.id, opt)}
              >
                <View
                  style={[
                    styles.radio,
                    formData[field.id] === opt && styles.radioSelected,
                  ]}
                />
                <Text style={styles.radioLabel}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );

      case "checkbox":
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.label}>{field.label}</Text>
            <View style={styles.optionsRow}>
              {field.options.map((opt) => {
                const checked = (formData[field.id] || []).includes(opt);
                return (
                  <TouchableOpacity
                    key={opt}
                    style={[styles.chip, checked && styles.chipSelected]}
                    onPress={() => {
                      const current = formData[field.id] || [];
                      const updated = checked
                        ? current.filter((v) => v !== opt)
                        : [...current, opt];
                      updateField(field.id, updated);
                    }}
                  >
                    <Text
                      style={
                        checked ? styles.chipTextSelected : styles.chipText
                      }
                    >
                      {opt}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );

      case "file":
        return (
          <View key={field.id} style={styles.fieldContainer}>
            <Text style={styles.label}>
              {field.label}
              {field.required ? " *" : ""}
            </Text>
            <TouchableOpacity style={styles.fileButton}>
              <Text style={styles.fileButtonText}>
                {field.uploadType === "Capture"
                  ? "📷 Take Photo"
                  : "📎 Upload File"}
              </Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{formSchema.title}</Text>
      {formSchema.sections.map((section) => (
        <View key={section.id} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.fields.map(renderField)}
        </View>
      ))}
      <TouchableOpacity
        style={[styles.saveButton, saving && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={saving}
      >
        <Text style={styles.saveButtonText}>
          {saving ? "Saving..." : "💾 Save Offline"}
        </Text>
      </TouchableOpacity>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a2e",
    marginBottom: 16,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#16213e",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  fieldContainer: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: "600", color: "#333", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: "#fafafa",
  },
  optionsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  chipSelected: { backgroundColor: "#4CAF50", borderColor: "#4CAF50" },
  chipText: { fontSize: 13, color: "#555" },
  chipTextSelected: { fontSize: 13, color: "#fff", fontWeight: "600" },
  radioRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#aaa",
    marginRight: 10,
  },
  radioSelected: { borderColor: "#4CAF50", backgroundColor: "#4CAF50" },
  radioLabel: { fontSize: 14, color: "#333" },
  fileButton: {
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    borderStyle: "dashed",
  },
  fileButtonText: { color: "#4CAF50", fontSize: 14, fontWeight: "600" },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonDisabled: { backgroundColor: "#aaa" },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
