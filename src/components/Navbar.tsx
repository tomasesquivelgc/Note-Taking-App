import { AppBar, Toolbar, Typography, IconButton, PaletteMode, Button, Icon } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function Navbar({ toggleTheme, mode}: {toggleTheme: () => void, mode: PaletteMode}){
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  return (
    <AppBar position="static">
      <Toolbar>
      {!isHomePage ? (
            <IconButton onClick={goBack}>
              <ArrowBackIosNewIcon />
            </IconButton>
        ) : (
          <div style={{ width: '40px' }} />
        )}
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
          <Link to=".." style={{textDecoration: "none", color: "inherit"}}>
          Advanced Note Taker
          </Link>
        </Typography>
        
        <IconButton onClick={toggleTheme} color="inherit">
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
      </Toolbar>
    </AppBar>
  );
}