import React, { useState, FormEvent } from 'react';
import { Box, TextField, Button, Grid, Autocomplete } from '@mui/material';

export function NoteForm(): JSX.Element {
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Form submitted');
    console.log('Tags:', tags);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            multiple
            freeSolo
            id="note-tags"
            options={["Personal", "Work", "Others"]}
            onChange={(event, value) => setTags(value)}
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
      </Grid>

      <TextField
        label="Content"
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
      />
      <Button
        type="submit"
        variant="contained"
      >
        Submit
      </Button>
    </Box>
  );
}
