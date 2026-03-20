import { useState } from "react";
import { Container } from "@mui/material";
import FormList from "./components/FormList";
import FormBuilder from "./components/FormBuilder";
import type { Form } from "../types";

let nextFormId = 1;

function App() {
  const [forms, setForms] = useState<Form[]>([]);
  const [view, setView] = useState<"list" | "builder">("list");
  const [editingForm, setEditingForm] = useState<Form | null>(null);

  function handleCreate() {
    setEditingForm(null);
    setView("builder");
  }

  function handleEdit(form: Form) {
    setEditingForm(form);
    setView("builder");
  }

  function handleDelete(id: number) {
    setForms((prev) => prev.filter((f) => f.id !== id));
  }

  function handleSave(data: Omit<Form, "id"> & { id?: number }) {
    if (data.id !== undefined) {
      setForms((prev) =>
        prev.map((f) => (f.id === data.id ? (data as Form) : f)),
      );
    } else {
      setForms((prev) => [...prev, { ...data, id: nextFormId++ }]);
    }
    setView("list");
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {view === "list" && (
        <FormList
          forms={forms}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
      {view === "builder" && (
        <FormBuilder
          editing={editingForm}
          onSave={handleSave}
          onCancel={() => setView("list")}
        />
      )}
    </Container>
  );
}

export default App;
