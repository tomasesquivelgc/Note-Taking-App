import { useLocalStorage } from './hooks/useLocalStorage';
import NoteList from './components/NoteList';
import NoteLayout from './components/NoteLayout';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NewNote } from './components/NewNote';
import { useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Note } from './components/Note';
import { EditNote } from './components/EditNote';
import { PaletteMode } from '@mui/material';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from './components/Navbar';



export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

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
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', []);
  const [mode, setMode] = useState<PaletteMode>('dark'); // Explicitly type the mode state


  const theme = useMemo(() => createTheme({
    typography: {
      h1: {
        fontSize: 50,
        fontWeight: 500,
      },
    },
    palette: {
      mode: mode,
    },
  }), [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  function onCreateNote({tags, ...data}: NoteData) {
    setNotes(prevNotes => {
      return [...prevNotes, {...data, id: uuidv4(), tagIds: tags.map(tag => tag.id)}]
    })
  }

  function onUpdateNote(id: string, {tags, ...data}: NoteData){
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if(note.id === id){
          return {...note, ...data, tagIds: tags.map(tag => tag.id)}
        }else{
          return note;
        }
      })
    })
  }

  function onDeleteNote(id: string){
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if(tag.id === id){
          return {...tag, label}
        }else{
          return tag;
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar toggleTheme={toggleTheme} mode={mode} />
      <Routes>
        <Route path="/" element={<NoteList notes={notesWithTags} availableTags={tags} updateTag={updateTag} deleteTag={deleteTag} />} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags}/>}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route path="edit" element={<EditNote onSubmit={onUpdateNote} onAddTag={addTag} availableTags={tags} />} />
        </Route>
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
