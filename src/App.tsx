import Button from '@mui/material/Button';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Button>Hello World</Button>} />
        <Route path="/new" element={<h1>This is the new section</h1>} />
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
