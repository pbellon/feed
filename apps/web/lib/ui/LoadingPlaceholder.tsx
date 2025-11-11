import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export function LoadingPlaceholder() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
