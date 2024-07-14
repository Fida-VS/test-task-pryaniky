
import { Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Error, Header, PostForm, MyTable, Loader } from '../../components';
import { fetchPosts } from '../../store/post-slice';
import { Navigate } from 'react-router';
import { useState } from 'react';



export const Main = () => {

	const posts = useSelector(state => state.posts.posts);
	const {status, error} = useSelector(state => state.posts);
	const [isOpen, setIsOpen] = useState(false);
	

	const token = useSelector(state => state.user.token);
	

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchPosts(token));
	}, [dispatch, token]);


	return token ? (
		<Container maxWidth='md' sx={{ marginTop: '6rem'}}>
			<Header setIsOpen={setIsOpen}/>
			{status === 'loading' && <Loader />}
			{error && <Error>An error occured: {error}</Error>}
			<Container>
				{(posts !== null && posts.length > 0) ? (
					<div className="post-list">
						{posts.map(
							({
								id,
								companySigDate,
								companySignatureName,
								documentName,
								documentStatus,
								documentType,
								employeeNumber,
								employeeSigDate,
								employeeSignatureName,
							}) => (
								<MyTable
									key={id}
									id={id}
									companySigDate={companySigDate}
									companySignatureName={companySignatureName}
									documentName={documentName}
									documentStatus={documentStatus}
									documentType={documentType}
									employeeNumber={employeeNumber}
									employeeSigDate={employeeSigDate}
									employeeSignatureName={employeeSignatureName}
								/>
							),
						)}
					</div>
					
				) : (
					<Container sx={{display: 'flex', alignItems: 'center',
						justifyContent: 'center'}}><Typography sx={{marginTop: '7rem', justifyContent: 'space-between'}} variant="h5">Статьи не найдены</Typography></Container>
				)}
			</Container>
			{isOpen && <PostForm  setIsOpen={setIsOpen} />}
		</Container>
	
): (
	<Navigate to="https://fida-vs.github.io/test-task-pryaniky/login" />
)
};
