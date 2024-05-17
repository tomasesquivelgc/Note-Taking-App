import { Box } from "@mui/material";
import { NoteForm } from "./NoteForm"
import { NoteData, Tag } from "../App";

type newNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NewNote({onSubmit, onAddTag, availableTags}: newNoteProps) {
  return (
    <Box p={3}>
      <h1>New Note</h1>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </Box>
  )
}
