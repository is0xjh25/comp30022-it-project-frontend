import React from 'react';
import './Login.css';
import Image from '../../images/road.jpg';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Resend from './Resend';


class Login extends React.Component {
	
	constructor (props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState = () => ({status: "signIn"});

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
			<React.Fragment>
				<div className = {'Login-imageBlock'} >
					<img src={Image} className = {'Login-image'} alt = ""/>
				</div>
				<div className = {'Login-sideBlock'}>
					{status === 'signIn' ? (
							<SignIn
							setStatus={this.setStatus} />
						) : status === 'signUp' ? (
							<SignUp
							setStatus={this.setStatus} />
						) : status === 'resend' ? (
							<Resend 
							setStatus={this.setStatus} />
						) : null 
					}
				</div>
			</React.Fragment>
		);
	}
}
export default Login;