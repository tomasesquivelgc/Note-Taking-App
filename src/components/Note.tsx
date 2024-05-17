import { Grid, Stack, Chip, Button, Typography, Divider } from "@mui/material";
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
    <Grid container p={3} alignItems={"center"}>
      <Grid item xs={9}>
          <Typography variant="h1">{note.title}</Typography>
          <Stack direction={"row"} gap={1} flexWrap={"wrap"} >
            {note.tags.map(tag => {
              return <Chip color="primary" key={tag.id} label={tag.label} />
            })}
          </Stack>
      </Grid>    
      <Grid item xs={3} alignItems={"center"} >
        <Stack direction={"row"} justifyContent={"right"} gap={2} flexWrap={"wrap"}>
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
      <Grid item xs={12} sx={{marginTop: "50px"}}>
      <Divider />
        <Markdown>{note.markdown}</Markdown>
      </Grid>
    </Grid>
  )
}