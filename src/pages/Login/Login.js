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
	
	getInitialState = () => ({pageStatus: "signIn"});

    reset = () => this.setState(this.getInitialState());

	setPageStatus = (a) => this.setState({pageStatus: a});

	render() {
		
		// Switch components depending on pageStatus
		let pageStatus = this.state.pageStatus;

		return(
			<React.Fragment>
				<div className={'Login-imageBlock'} >
					<img src={Image} className={'Login-image'} alt=""/>
				</div>
				<div className={'Login-sideBlock'}>
					{pageStatus === 'signIn' ? (
							<SignIn setPageStatus={this.setPageStatus} />
						) : pageStatus === 'signUp' ? (
							<SignUp setPageStatus={this.setPageStatus} />
						) : pageStatus === 'resend' ? (
							<Resend setPageStatus={this.setPageStatus} />
						) : null 
					}
				</div>
			</React.Fragment>
		);
	}
}
export default Login;