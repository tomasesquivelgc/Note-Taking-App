import { Box } from "@mui/material";
import { NoteForm } from "./NoteForm"
import { NoteData, Tag } from "../App";
import { useNote } from "./NoteLayout";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function EditNote({onSubmit, onAddTag, availableTags}: EditNoteProps) {
  const note = useNote();
  return (
    <Box p={4}>
      <h1>Edit Note</h1>
      <NoteForm onSubmit={data => onSubmit(note.id, data)} onAddTag={onAddTag} availableTags={availableTags} />
    </Box>
  )
}
