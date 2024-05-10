import { Grid, Stack, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

export function NoteList() {
  return (
    <Container>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6} md={8}>
          <h1>Notes</h1>
        </Grid>
        <Grid item xs={6} md={4}>
          <Stack direction="row" spacing={2} justifyContent={"center"}>
            <Link to="/new">
              <Button variant="contained">
                Create Note
              </Button>
            </Link>
            
            <Button variant="outlined">
              Edit Tags
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}