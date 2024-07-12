import { Container, Typography } from "@mui/material";

 export const Loader = () => {


	return (
	<Container sx={{
		width: '17rem',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '7rem'
	  }}>
		<div>
		<Typography variant="h3" gutterBotto>Loading...</Typography>
		</div>
	</Container>

);
};
