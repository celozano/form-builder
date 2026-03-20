import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import type { Item } from "../../types";

interface Props {
  name: string;
  items: Item[];
}

export default function FormPreview({ name, items }: Props) {
  return (
    <Box>
      <Typography variant="h6" mb={2}>
        {name || "(untitled form)"}
      </Typography>

      {items.length === 0 && (
        <Typography color="text.secondary">No fields yet.</Typography>
      )}

      {items.map((item) => (
        <Box key={item.id} mb={2}>
          {item.type === "boolean" ? (
            <FormControlLabel
              control={<Checkbox size="small" />}
              label={
                <span>
                  {item.label || item.name || "(unnamed)"}
                  {item.required && <span style={{ color: "red" }}> *</span>}
                </span>
              }
            />
          ) : (
            <TextField
              label={
                <span>
                  {item.label || item.name || "(unnamed)"}
                  {item.required && <span style={{ color: "red" }}> *</span>}
                </span>
              }
              type={item.type === "number" ? "number" : "text"}
              fullWidth
              size="small"
            />
          )}
        </Box>
      ))}
    </Box>
  );
}
