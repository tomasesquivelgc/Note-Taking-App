import { useLocalStorage } from './hooks/useLocalStorage';
import Button from '@mui/material/Button';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NewNote } from './components/NewNote';

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
}

export type RawNoteData = {
  title: string,
  markdown: string,
  tagIds: string[]
}

export type NoteData = {
  title: string,
  markdown: string,
  tags: Tag[]
}

export type Tag = {
  id: string,
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', []);
  const [tags, settags] = useLocalStorage<Tag[]>('TAGS', []);
  return (
    <>
      <Routes>
        <Route path="/" element={<Button>Hello World</Button>} />
        <Route path="/new" element={<NewNote />} />
        <Route path="/:id">
          <Route index element={<h1>Show</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </>
  )
}

export default App
