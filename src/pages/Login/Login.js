import React from 'react';
import './Login.css';
import Image from '../../images/road.jpg';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Resend from './Resend';
import { Redirect } from "react-router-dom";

class Login extends React.Component {
	
	constructor (props) {
		super(props);
		this.state = this.getInitialState();
	}
	
	// Check the cookie status
	// componentDidMount() {
	// 	if (localStorage.getItem("Token") !== null) {
	// 	  sessionStorage.setItem("Token", localStorage.getItem("Token"));
	// 	  <Redirect to={'/'} />
	// 	}
	// }

	getInitialState = () => ({status: "signIn"});

    reset = () => this.setState(this.getInitialState());

	setStatus = (a) => this.setState({status: a});

	render() {
		
		// Switch components depending on status
		let status = this.state.status;

		return(
			<React.Fragment>
				<div className={'Login-imageBlock'} >
					<img src={Image} className={'Login-image'} alt=""/>
				</div>
				<div className={'Login-sideBlock'}>
					{status === 'signIn' ? (
							<SignIn setStatus={this.setStatus} />
						) : status === 'signUp' ? (
							<SignUp setStatus={this.setStatus} />
						) : status === 'resend' ? (
							<Resend setStatus={this.setStatus} />
						) : null 
					}
				</div>
			</React.Fragment>
		);
	}
}
export default Login;