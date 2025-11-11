import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export function LoadingPlaceholder() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
