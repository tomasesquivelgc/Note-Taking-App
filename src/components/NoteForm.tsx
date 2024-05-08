import { Box, TextField, Button } from "@mui/material"

export function NoteForm() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log("Form submitted")
  }
  return (
    <Box component="form">
      <TextField
        label="Title"
        variant="outlined"
        margin="normal"
      />
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
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  )
}