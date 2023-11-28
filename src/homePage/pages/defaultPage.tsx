import { Typography, Box, Grid } from '@mui/material';
import logoAzul from '../img/logoAzul.png';

export const DefaultPage = () => {
  return (
    <Box
      style={{
        backgroundColor: "#191b22",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center", // This centers the content vertically
        alignItems: "center" // This centers the content horizontally
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={6} style={{ paddingLeft: '20%' }}> {/* Adjusted grid size and added padding */}
          <Typography variant="h3" sx={{ color: "white", mb: 4 }}>
            Microb.Uy
          </Typography>
          <Typography variant="h5" sx={{ color: "white" }}>
            URL Inválida
          </Typography>
          <Typography sx={{ color: "white", mt: 2 }}>
            ingrese a una instancia (ejemplo: /oleadaverde).
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}> 
            <img src={logoAzul} style={{ maxWidth: '50%' }} alt="Logo" />
        </Grid>
      </Grid>
    </Box>
  );
};
