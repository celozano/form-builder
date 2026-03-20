import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import type { Form } from "../../types";

interface Props {
  forms: Form[];
  onCreate: () => void;
  onEdit: (form: Form) => void;
  onDelete: (id: number) => void;
}

export default function FormList({ forms, onCreate, onEdit, onDelete }: Props) {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">My Forms</Typography>
        <Button variant="contained" onClick={onCreate}>
          Create Form
        </Button>
      </Box>

      {forms.length === 0 && (
        <Typography color="text.secondary">No forms yet. Create one!</Typography>
      )}

      <List disablePadding>
        {forms.map((form, index) => (
          <Box key={form.id}>
            <ListItem
              disableGutters
              secondaryAction={
                <Box display="flex" gap={1}>
                  <IconButton size="small" aria-label={`edit-${form.id}`} onClick={() => onEdit(form)} data-testid={`edit-${form.id}`}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" aria-label={`delete-${form.id}`} onClick={() => onDelete(form.id)} data-testid={`delete-${form.id}`}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText
                primary={form.name}
                secondary={`${form.items.length} field${form.items.length !== 1 ? "s" : ""}`}
              />
            </ListItem>
            {index < forms.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Box>
  );
}
