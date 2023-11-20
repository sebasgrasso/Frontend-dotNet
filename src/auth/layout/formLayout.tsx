import { Box } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FormLayout = ({ children }: any) => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: 550,
          py: 2,
          px: 5,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
