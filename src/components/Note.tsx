import { Grid, Stack, Chip, Button } from "@mui/material";
import { useNote } from "./NoteLayout";
import { Link, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";

type NoteProps = {
  onDelete: (id: string) => void;
}

export function Note({onDelete}: NoteProps){
  const note = useNote();
  const navigate = useNavigate();
  return (
    <Grid container p={3} spacing={2} alignItems={"center"}>
      <Grid item xs={6}>
          <h1>{note.title}</h1> 
          <Stack direction={"row"} spacing={1} >
            {note.tags.map(tag => {
              return <Chip color="primary" key={tag.id} label={tag.label} />
            })}
          </Stack>
      </Grid>    
      <Grid item xs={6} alignItems={"center"} >
        <Stack direction={"row"} justifyContent={"right"} spacing={2}>
          <Link to="edit">
            <Button variant="contained">Edit</Button>
          </Link>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              onDelete(note.id)
              navigate("/")
            }}>
            Delete
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Markdown>{note.markdown}</Markdown>
      </Grid>
    </Grid>
  )
}