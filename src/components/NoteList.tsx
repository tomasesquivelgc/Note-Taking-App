import { Grid, Stack, Button, Container, Box, TextField, Autocomplete } from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Tag } from "../App";

type NoteListProps = {
  availableTags: Tag[]
}

export function NoteList({ availableTags }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} md={8}>
          <h1>Notes</h1>
        </Grid>
        <Grid item xs={6} md={4}>
          <Stack direction="row" spacing={2} justifyContent={"center"}>
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
        <Box component="form" width="100%" display="flex" gap={2}>
          <Grid item xs={6}>
            <TextField
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
    </Container>
  );
}