import { Grid, Stack, Button, Box, TextField, Autocomplete, Card, CardContent, Chip, CardActionArea, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Tag} from "../App";
import  TagsModal  from "./TagsModal";

type SimplifiedNote = {
  tags: Tag[],
  title: string,
  id: string
}

type NoteListProps = {
  availableTags: Tag[],
  notes: SimplifiedNote[],
  updateTag: (id: string, label: string) => void,
  deleteTag: (id: string) => void
}

export default function NoteList({ availableTags, notes, updateTag, deleteTag }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [titleValue, setTitleValue] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredNotes = useMemo(() => {
    return notes.filter(note =>{
      return (titleValue === "" || note.title.toLowerCase().includes(titleValue.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
    })
  }, [notes, titleValue, selectedTags])

  return (
    <>
      <Grid container alignItems="center" width={"100%"} p={3}  gap={2}>
        <Stack direction={"row"} width={"100%"} alignItems={"center"}>
          <Grid item xs={5}>
            <Typography variant="h1">
              Notes
            </Typography>
        </Grid>
        <Grid item xs={7}>
          <Stack direction="row" gap={2} justifyContent={"right"} flexWrap={"wrap"}>
            <Link to="/new">
              <Button variant="contained">
                Create Note
              </Button>
            </Link> 
            <Button variant="outlined" onClick={handleOpen}>
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
      <TagsModal open={open} handleClose={handleClose} availableTags={availableTags} updateTag={updateTag} deleteTag={deleteTag} />
    </>
  );
}

function NoteCard({ id, title, tags }: SimplifiedNote) {
  return (
    <Grid item xs={12} md={6} lg={4} textAlign={"center"}>
      <Link to={`${id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <CardActionArea sx={{ height: "100%" }}>
          <Card 
            elevation={3} 
            sx={{ 
              height: "100%", 
              transition: 'background-color 0.3s ease, color 0.3s ease',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              '&:active': {
                backgroundColor: 'action.selected',
              }
            }}
          >
            <CardContent>
              <h2>
                {title}
              </h2>
              <Stack direction={"row"} gap={1} justifyContent={"center"} flexWrap={"wrap"}>
                {tags.map(tag => {
                  return <Chip color="primary" key={tag.id} label={tag.label} />
                })}
              </Stack>
            </CardContent>
          </Card>
        </CardActionArea>
      </Link>
    </Grid>
  );
}

