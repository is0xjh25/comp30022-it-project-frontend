import React from 'react';
import {BrowserRouter} from 'react-router-dom';
class Login extends React.Component {
	
	constructor (props) {
		super(props);
		this.state = {
			active: 'Login',
			// Register_1, Register_2, forgetPassword
			email:"",
			password:"",
			available: false,
			lostPassword: false 
		};
	}

	setEmail = (e) => this.state({email: e});

	setPassword = (p) => this.state({email: p});

	validateForm = () => {
		return (this.email.length > 0 && this.password.length > 0);
	}
}
export default Login;