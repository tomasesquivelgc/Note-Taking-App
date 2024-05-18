import { v4 as uuidv4 } from 'uuid';
import { Autocomplete, Box, Button, Stack, TextField } from '@mui/material';
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

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  const generateTagWithId = (tag: string | Tag): Tag => {
    if (typeof tag === 'string'){
      // check if tag already exists
      const existingTag = availableTags.find(t => t.label === tag.trim());
      if (existingTag) {
        return existingTag;
      }
      // Generate unique ID for new tag
      const newTag = { id: uuidv4(), label: tag.trim() };
      onAddTag(newTag);
      return newTag;
    } else{
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

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{flexDirection: "column-reverse", display:"flex"}}>
              <Stack direction={'row'} justifyContent={'flex-end'} gap={2}>
          <Button
          type="submit"
          variant="contained"
          >
          Submit
          </Button>
          <Button onClick={goBack} variant='outlined'>
            Cancel
          </Button>
        </Stack>
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
        <Stack direction={'row'}>
          <TextField
            sx={{width: '50%'}}
            defaultValue={title}
            onChange={(event) => setTitleValue(event.target.value)}
            label="Title"
            variant="outlined"
            margin="normal"
            required
          />
          <Autocomplete
            sx={{width: '50%'}}
            defaultValue={tags} 
            multiple
            freeSolo
            id="note-tags"
            options={availableTags.map(tag => {
              return {label: tag.label, id: tag.id}
            })}
            onChange={(_, value) => {
              setSelectedTags(value.map(generateTagWithId))
            }}

            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                variant="outlined"
                margin="normal"
                fullWidth
                rows={3}
              />
            )}
          />
        </Stack>
          

      
    </Box>
  );
}