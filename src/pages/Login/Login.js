import React from 'react';
import './Login.css';
import Image from './road.jpg';
import Welcome from './Welcome';
import ForgetPassword from './ForgetPassword';
import Register from './Register';

class Login extends React.Component {
	
	constructor (props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState = () => ({status: "welcome"});

    reset = () => this.setState(this.getInitialState());

	setStatus = (a) => this.setState({status: a});

	// Staying(incorrect) or jumping to dashboard(correct).
	handleLogin = (e, p) => {};
	
	// Jumping to welcome and alert.
	handleForgetPassword = (e) => {};

	// Jumping to welcome and alert.
	handleRegister = (d) => {};

	render() {
		let status = this.state.status;
		return(
			<div>
				<div className = {'Login-imageBlock'} >
					<img src={Image} className = {'Login-image'} alt = ""/>
				</div>
				<div className = {'Login-sideBlock'}>
					{status === 'welcome' ? (
							<Welcome
							setStatus={this.setStatus} />
						) : status === 'register' ? (
							<Register setStatus={this.setStatus} />
						) : status === 'forgetPassword' ? (
							<ForgetPassword 
							setStatus={this.setStatus} />
						) : null 
					}
				</div>
			</div>
		);
	}
}
export default Login;