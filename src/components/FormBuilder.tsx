import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import FormPreview from "./FormPreview";
import type { Form, Item } from "../../types";

interface Props {
  editing: Form | null;
  onSave: (form: Omit<Form, "id"> & { id?: number }) => void;
  onCancel: () => void;
}

let nextItemId = 1;

function emptyItem(): Item {
  return {
    id: nextItemId++,
    name: "",
    label: "",
    type: "string",
    required: false,
  };
}

export default function FormBuilder({ editing, onSave, onCancel }: Props) {
  const [formName, setFormName] = useState(editing?.name ?? "");
  const [items, setItems] = useState<Item[]>(editing?.items ?? [emptyItem()]);

  function updateItem(id: number, field: keyof Item, value: string | boolean) {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  }

  function addItem() {
    setItems((prev) => [...prev, emptyItem()]);
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  function handleSave() {
    if (!formName.trim()) return alert("Form name is required.");
    onSave({ id: editing?.id, name: formName.trim(), items });
  }

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5">
          {editing ? "Edit Form" : "Create Form"}
        </Typography>
        <Box display="flex" gap={1}>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        </Box>
      </Box>

      <Box display="flex" gap={4}>
        {/* Left: Builder */}
        <Box flex={1}>
          <TextField
            label="Form Name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="My form"
            fullWidth
            size="small"
            sx={{ mb: 3 }}
          />

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={1}
          >
            <Typography variant="subtitle1" fontWeight={600}>
              Fields
            </Typography>
            <Button variant="outlined" size="small" onClick={addItem}>
              + Add Field
            </Button>
          </Box>

          {items.map((item, index) => (
            <Card key={item.id} variant="outlined" sx={{ mb: 2 }}>
              <CardContent sx={{ pb: "16px !important" }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography variant="body2" fontWeight={600}>
                    Field {index + 1}
                  </Typography>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                  <TextField
                    label="Name"
                    value={item.name}
                    onChange={(e) =>
                      updateItem(item.id, "name", e.target.value)
                    }
                    placeholder="field_name"
                    size="small"
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label="Label"
                    value={item.label}
                    onChange={(e) =>
                      updateItem(item.id, "label", e.target.value)
                    }
                    placeholder="Field Label"
                    size="small"
                    sx={{ flex: 1 }}
                  />
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Type</InputLabel>
                    <Select
                      label="Type"
                      value={item.type}
                      onChange={(e) =>
                        updateItem(item.id, "type", e.target.value)
                      }
                    >
                      <MenuItem value="string">string</MenuItem>
                      <MenuItem value="number">number</MenuItem>
                      <MenuItem value="boolean">boolean</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={item.required}
                        onChange={(e) =>
                          updateItem(item.id, "required", e.target.checked)
                        }
                        size="small"
                      />
                    }
                    label="Required"
                  />
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Divider orientation="vertical" flexItem />

        {/* Right: Preview */}
        <Box flex={1}>
          <Typography variant="subtitle1" fontWeight={600} mb={2}>
            Preview
          </Typography>
          <FormPreview name={formName} items={items} />
        </Box>
      </Box>
    </Box>
  );
}
