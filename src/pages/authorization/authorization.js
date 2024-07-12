import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Error } from '../../components';
import { loginUser } from '../../store/user-slice';
import { Navigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';




const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Неверно заполнен логин. Допускаются только буквы и цифры')
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Допускаются буквы, цифры и знаки # %',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символов')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
});

export const Authorization = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
		},
		resolver: yupResolver(authFormSchema),
	});

	const [serverError, setServerError] = useState(null);

	const dispatch = useDispatch();

	const token = useSelector(state => state.user.token);

	const onSubmit = ({ login, password }) => {
		dispatch(loginUser({ login, password }))
	};

	const formError = errors?.login?.message || errors?.password?.message;

	const errorMessage = formError || serverError;

	
	if (token) {
		return <Navigate to="https://github.com/Fida-VS/test-task-pryaniky" />;
	} else {
	return (
		<Container sx={{
			width: '17rem',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginTop: '7rem'
		  }}>
			<Typography sx={{
				marginBottom: '2rem'
			}} variant='h4'>Авторизация</Typography>
			<Box
			component='form'
			sx={{
				display: 'flex',
				flexDirection: 'column',
				'& .MuiTextField-root': { width: '25ch' },
			  }}
			  noValidate
			  autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}>
				<TextField
				sx={{
					marginBottom: '2rem'
				}}

					label="Login"
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<TextField
				sx={{
					marginBottom: '2rem'
				}}
					id="outlined-password-input"
					label="Password"
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Авторизоваться
				</Button>
				{errorMessage && <Error>{errorMessage}</Error>}
			</Box>
		</Container>
	);
	}
};

