import { Container, Typography, Box } from '@mui/material';

export const DefaultPage = () => {
  return (
    <Box
      style={{
        backgroundColor: "#191b22",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // This centers the content vertically
        alignItems: "center" // This centers the content horizontally
      }}
    >
      <Container>
        <Typography variant="h3" sx={{ color: "white", mb: 4 }}>
          Microb.Uy
        </Typography>
        <Typography variant="h5" sx={{ color: "white" }}>
          URL Inválida
        </Typography>
        <Typography sx={{ color: "white", mt: 2 }}>
          ingrese a una instancia.
        </Typography>
      </Container>
    </Box>
  );
};
