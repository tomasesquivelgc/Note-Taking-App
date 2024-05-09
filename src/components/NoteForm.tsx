import { Autocomplete, Box, Button, Grid, TextField } from '@mui/material';
import { FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NoteData, Tag } from '../App';

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
};

export function NoteForm({ onSubmit }: NoteFormProps): JSX.Element {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLInputElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: [],
    });
    console.log(selectedTags);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ '& button': { m: 1 } }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            ref={titleRef}
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
            options={selectedTags}
            onChange={(_, value) => {setSelectedTags(value as Tag[])}}
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
            ref={markdownRef}
            required
            label="Content"
            variant="outlined"
            margin="normal"
            multiline
            rows={13}
            fullWidth  // Ensure the TextField takes the full width
          />
        </Grid>
        <Grid item xs={12} container justifyContent={'flex-end'}>
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