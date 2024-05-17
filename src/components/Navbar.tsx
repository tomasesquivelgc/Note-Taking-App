import { AppBar, Toolbar, Typography, IconButton, PaletteMode } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function Navbar({ toggleTheme, mode}: {toggleTheme: () => void, mode: PaletteMode}){
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Notes
        </Typography>
        <IconButton onClick={toggleTheme} color="inherit">
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      </Toolbar>
    </AppBar>
  );
}