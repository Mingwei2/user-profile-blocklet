import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h2" color="error">
          404
        </Typography>
        <Typography variant="h4" sx={{ marginTop: 2 }}>
          Oops! The page you're looking for doesn't exist.
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2, color: 'text.secondary' }}>
          It may have been moved or deleted.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" color="primary" component={Link} to="/">
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
