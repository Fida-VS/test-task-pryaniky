import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import { Slide, Toolbar } from '@mui/material';
import { useDispatch } from "react-redux";
import { setUser } from "../../store/user-slice";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import CssBaseline from '@mui/material/CssBaseline';




function HideOnScroll(props) {
	const { children, window } = props;

	const trigger = useScrollTrigger({
	  target: window ? window() : undefined,
	});
  
	return (
	  <Slide appear={false} direction="down" in={!trigger}>
		{children}
	  </Slide>
	);
  }

  
export const Header = ({setIsOpen, props}) => {

	const dispatch = useDispatch();

	const onPostAdd = () => {
		setIsOpen(true);
	};

	const onLogout = () => {
		dispatch(setUser(null))
		localStorage.removeItem('userData');
	};


return (
	<>
	<CssBaseline />
      <HideOnScroll {...props}>
	<AppBar>
		<Toolbar>
		<Button sx={{ flexGrow: 1, marginLeft: '4rem' }} size="large" color="inherit" type="button" onClick={onPostAdd}>
			Add new  record </Button>
		<Button size="small" color="inherit" type="button" onClick={onLogout}>Logout</Button>
		</Toolbar>
		
	</AppBar>
	</HideOnScroll>
	</>
	);
};
