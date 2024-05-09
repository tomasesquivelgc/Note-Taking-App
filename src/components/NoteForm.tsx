import { v4 as uuidv4 } from 'uuid';
import { Autocomplete, Box, Button, Grid, TextField } from '@mui/material';
import { FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { NoteData, Tag } from '../App';

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps): JSX.Element {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLInputElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const generateTagWithId = (tag: string | Tag): Tag => {
    if (typeof tag === 'string') {
      // Generate unique ID for new tag
      return {
        id: uuidv4(),
        label: tag
      };
    } else {
      // Return existing tag as is
      return tag;
    }
  };

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
            options={availableTags.map(tag => {
              return {label: tag.label, id: tag.id}
            })}
            onChange={(_, value) => {
              setSelectedTags(value.map(generateTagWithId))
            }}
            onInputChange={(_, value) => {
              const newTag = {id: uuidv4(), label: value};
              onAddTag(newTag);
              setSelectedTags(prev => [...prev, newTag])
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