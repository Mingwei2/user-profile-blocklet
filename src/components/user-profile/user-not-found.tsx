import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function UserNotFound() {
  return (
    <Container
      sx={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
      <Box
        sx={{
          textAlign: 'center',
          marginTop: '20px',
        }}>
        <Typography variant="h4" color="error" gutterBottom>
          User Not Found
        </Typography>
        <Typography variant="body1" gutterBottom>
          The user you are looking for does not exist. They might have been removed or the link might be incorrect.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}
