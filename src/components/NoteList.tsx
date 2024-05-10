import { Grid, Stack, Button, Container, Box, TextField, Autocomplete } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Tag } from "../App";

type NoteListProps = {
  availableTags: Tag[]
}

export function NoteList({ availableTags }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [titleValue, setTitleValue] = useState('');
  return (
      <Grid container alignItems="center" width={"100%"} p={2}>
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
      </Grid>
  );
}