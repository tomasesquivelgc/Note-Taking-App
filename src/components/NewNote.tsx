import { Box, Typography } from "@mui/material";
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
      <Typography variant="h1">New Note</Typography>
      <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </Box>
  )
}
