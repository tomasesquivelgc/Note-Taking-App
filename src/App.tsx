import Button from '@mui/material/Button';
import { Routes, Route, Navigate } from 'react-router-dom';
import { NewNote } from './components/NewNote';

function App() {

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
