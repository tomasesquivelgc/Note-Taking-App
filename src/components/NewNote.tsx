import { NoteForm } from "./NoteForm"
import { NoteData } from "../App";

type newNoteProps = {
  onSubmit: (data: NoteData) => void;
};

export function NewNote({onSubmit}: newNoteProps) {
  return (
    <div>
      <h1>New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </div>
  )
}
