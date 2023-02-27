import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import store from './redux/store';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>

	</Router>

);

