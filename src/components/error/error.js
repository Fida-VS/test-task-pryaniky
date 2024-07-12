import { Alert, Stack } from "@mui/material";


export const Error = ({children}) => {
	return (
		<Stack sx={{ width: '100%' }} spacing={1}>
		  <Alert severity="error">{children}</Alert>
		</Stack>
	  );
}
