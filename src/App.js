import { Routes, Route } from 'react-router-dom';
import { Authorization, Main } from './pages';
import { Error } from './components';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import { setUser } from './store/user-slice';

function App() {

  const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = localStorage.getItem('userData');

		if(!currentUserDataJSON) {
			return;
		}

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(setUser(currentUserData));
	}, [dispatch]);

  return (
    <div className="App">
      <>
        <Routes>
          <Route exact  path="/" element={<Main />} />
          <Route exact  path="/login" element={<Authorization />} />
          <Route path="*" element={<Error>Такая страница не существует</Error>} />
        </Routes>
      </>
    </div>
  );
}

export default App;
