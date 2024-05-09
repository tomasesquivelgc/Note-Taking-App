import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Box, TextField, Button, Grid, Autocomplete } from '@mui/material';

export function NoteForm(): JSX.Element {
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('Form submitted');
    console.log('Tags:', tags);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& button': { m: 1 } }}>
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
        <Grid item xs={12}>
          <TextField
            required
            label="Content"
            variant="outlined"
            margin="normal"
            multiline
            rows={13}
            fullWidth  // Ensure the TextField takes the full width
          />
        </Grid>
        <Grid item xs={12}>
          <Button
          type="submit"
          variant="contained"
          >
          Submit
          </Button>
          <Link to="..">
            <Button variant="outlined">Cancel</Button>
          </Link>
        </Grid>
      </Grid>
      
    </Box>
  );
}