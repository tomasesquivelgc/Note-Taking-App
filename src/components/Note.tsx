import { useNote } from "./NoteLayout";

export function Note(){
  const note = useNote();
  console.log(note);
  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.markdown}</p>
      <ul>
        {note.tags.map(tag => <li key={tag.id}>{tag.label}</li>)}
      </ul>
    </div>
  )
}