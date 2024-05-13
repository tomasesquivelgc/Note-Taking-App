import { Grid, Stack, Button, Container, Box, TextField, Autocomplete, Card, CardContent, Typography, Chip, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Tag, Note } from "../App";

type SimplifiedNote = {
  tags: Tag[],
  title: string,
  id: string
}

type NoteListProps = {
  availableTags: Tag[],
  notes: SimplifiedNote[]
}

export function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [titleValue, setTitleValue] = useState('');

  const filteredNotes = useMemo(() => {
    return notes.filter(note =>{
      return (titleValue === "" || note.title.toLowerCase().includes(titleValue.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
    })
  }, [notes, titleValue, selectedTags])

  return (
      <Grid container alignItems="center" width={"100%"} p={2}  gap={2}>
        <Stack direction={"row"} width={"100%"} alignItems={"center"}>
          <Grid item xs={5}>
          <h1>Notes</h1>
        </Grid>
        <Grid item xs={7}>
          <Stack direction="row" spacing={2} justifyContent={"right"}>
            <Link to="/new">
              <Button variant="contained">
                Create Note
              </Button>
            </Link> 
            <Button variant="outlined">
              Edit Tags
            </Button>
          </Stack>
        </Grid>
        </Stack>
        
        <Box component="form" width="100%" display="flex" gap={2} justifyContent={"center"} justifySelf={"center"}>
          <Grid item xs={6}>
            <TextField
              onChange={(event) => setTitleValue(event.target.value)}
              label="Search"
              variant="outlined"
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
          <Autocomplete
            multiple
            id="note-tags"
            options={availableTags}
            getOptionLabel={(tag) => tag.label}
            onChange={(_, value) => {
              setSelectedTags(value)
            }}

            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                variant="outlined"
                margin="normal"
                fullWidth
              />
            )}
          />
          </Grid>
        </Box>
        <Grid container spacing={2}>
          {filteredNotes.map(note => {
            return <NoteCard key={note.id} id={note.id} title={note.title} tags={note.tags} />
          })}
        </Grid>
      </Grid>
  );
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Grid item xs={12} md={6} lg={4} textAlign={"center"}>
      <Link to={`${id}`} style={{textDecoration: 'none'}}>
      <CardActionArea  sx={{ height: "100%" }}>
        <Card elevation={3}  sx={{ height: "100%" }}>
          <CardContent>
            <h2>
              {title}
            </h2>
            <Stack direction={"row"} spacing={1} justifyContent={"center"}>
              {tags.map(tag => {
              return <Chip color="primary" key={tag.id} label={tag.label} />
            })}
            </Stack>
          </CardContent>
        </Card>
      </CardActionArea>
      </Link>
    </Grid>
  )
}