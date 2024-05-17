import { v4 as uuidv4 } from 'uuid';
import { Autocomplete, Box, Button, Grid, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteData, Tag } from '../App';

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export function NoteForm({ onSubmit, onAddTag, availableTags, title = "", markdown = "", tags = [] }: NoteFormProps): JSX.Element {
  const [titleValue, setTitleValue] = useState(title);
  const [markdownValue, setMarkdownValue] = useState(markdown);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const generateTagWithId = (tag: string | Tag): Tag => {
    if (typeof tag === 'string') {
      // Check if tag already exists
      const existingTag = availableTags.find(t => t.label === tag.trim());
      if (existingTag) {
        return existingTag;
      }
      // Generate unique ID for new tag
      const newTag = { id: uuidv4(), label: tag.trim() };
      onAddTag(newTag);
      return newTag;
    } else {
      // Return existing tag as is
      return tag;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    onSubmit({
      title: titleValue,
      markdown: markdownValue,
      tags: selectedTags,
    });
    navigate('..');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Next') {
      event.preventDefault();
      // Update the inputValue state to trigger the onChange event in Autocomplete
      if (inputValue.trim()) {
        setInputValue(inputValue.trim());
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            defaultValue={title}
            onChange={(event) => setTitleValue(event.target.value)}
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            required
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            defaultValue={tags}
            multiple
            freeSolo
            id="note-tags"
            options={availableTags}
            value={selectedTags}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            onChange={(_, value) => setSelectedTags(value.map(generateTagWithId))}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                variant="outlined"
                margin="normal"
                fullWidth
                onKeyDown={handleKeyDown}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            defaultValue={markdown}
            onChange={(event) => setMarkdownValue(event.target.value)}
            required
            label="Content"
            variant="outlined"
            margin="normal"
            multiline
            rows={13}
            fullWidth  // Ensure the TextField takes the full width
          />
        </Grid>
        <Grid item xs={12} container justifyContent={'flex-end'} gap={2}>
          <Button
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
          <Button onClick={goBack} variant='outlined'>
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
