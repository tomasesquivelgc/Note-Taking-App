import { Box, Grid, Stack, Chip, Button } from "@mui/material";
import { useNote } from "./NoteLayout";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";

export function Note(){
  const note = useNote();
  return (
    <Grid container p={4} spacing={2} alignItems={"center"}>
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
          <Button variant="outlined" color="error">Delete</Button>
          <Link to="..">
            <Button
              sx={{
                border: '1px solid gray',
                color: 'gray',
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                  border: '1px solid gray',
                },
              }}
              variant="outlined"
            >
              Back
            </Button>
          </Link>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Markdown>{note.markdown}</Markdown>
      </Grid>
    </Grid>
  )
}