// Navbar.tsx
import { AppBar, Toolbar, Typography, IconButton, Select, MenuItem } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { ThemeName } from '../themes';

export default function Navbar({ themeName, handleThemeChange }: { themeName: ThemeName, handleThemeChange: (theme: ThemeName) => void }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {!isHomePage ? (
          <IconButton onClick={goBack}>
            <ArrowBackIosNewIcon color='secondary' />
          </IconButton>
        ) : (
          <div style={{ width: '40px' }} />
        )}

        <Typography variant="h3" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Link to=".." style={{ textDecoration: "none", color: "inherit" }}>
            Advanced Note Taker
          </Link>
        </Typography>

        <Select
          value={themeName}
          onChange={(e) => handleThemeChange(e.target.value as ThemeName)}
          variant="standard"
          color='primary'
        >
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
          <MenuItem value="dracula">Dracula</MenuItem>
          <MenuItem value='coffee'>Coffee</MenuItem>
          <MenuItem value='lemonade'>Lemonade</MenuItem>
          <MenuItem value='bumblebee'>Bumblebee</MenuItem>
        </Select>
      </Toolbar>
    </AppBar>
  );
}
