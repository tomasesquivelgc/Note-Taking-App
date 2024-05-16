import { Box, Typography, Modal, Backdrop, Fade, List, ListItem, ListItemButton, TextField, Button, IconButton } from '@mui/material';
import { Tag } from '../App';
import { DeleteForever } from '@mui/icons-material';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '80vh', // Restrict the height of the modal box
  display: 'flex',
  flexDirection: 'column',
};

type ModalProps = {
  open: boolean,
  handleClose: () => void,
  availableTags: Tag[],
  updateTag: (id: string, label: string) => void,
  deleteTag: (id: string) => void

}

export default function TagsModal({ open, handleClose, availableTags, updateTag, deleteTag }: ModalProps) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Edit Tags
          </Typography>
          <List sx={{overflow: 'auto',}}>
            {availableTags.map(tag => (
              <ListItem disablePadding key={tag.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                <TextField onChange={(event) => updateTag(tag.id, event.target.value)} defaultValue={tag.label} fullWidth sx={{ flexGrow: 1, marginRight: '8px' }} />
                <ListItemButton onClick={()=>deleteTag(tag.id)} sx={{
                  border: '1px solid red',
                  width: '40px',
                  height: 'full',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <IconButton>
                    <DeleteForever />
                  </IconButton>
                </ListItemButton>
              </ListItem>
            ))}
            <Button variant="contained" fullWidth onClick={handleClose}>
              Close
            </Button>
          </List>
        </Box>
      </Fade>
    </Modal>
  )
}
