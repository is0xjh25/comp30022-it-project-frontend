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
		this.setActive = this.setActive.bind(this);
		this.setEmail = this.setEmail.bind(this);
		this.setPassword = this.setPassword.bind(this);
	}

	setActive(a) {
		this.setState({active: a});
	};

	setEmail(e) {
		this.setState({email: e});
	};

	setPassword(p) {
		this.setState({email: p});
	};

	validateForm() {
		return (this.email.length > 0 && this.password.length > 0);
	};

	getInitialState = () => ({
		active: "welcome",
		email:"",
		password:"",
		details: {
			firstName:"",
			lasName:"",
			email:"",
			password:"",
			phone:"",
			organisation:"",
		}
	});

    reset() {
        this.setState(this.getInitialState());
    };

	render() {
		let active = this.state.active;
		return(
			<div>
				<div className = {'Login-imageBlock'} >
					<img src={Image} className = {'Login-image'} alt = ""/>
				</div>
				<div className = {'Login-sideBlock'}>
					{active === 'welcome' ? (
							<Welcome setEmail={this.setEmail} 
							setPassword={this.setPassword}
							setActive={this.setActive} />
						) : active === 'register' ? (
							<Register />
						) : active === 'forgetPassword' ? (
							<ForgetPassword setEmail={this.setEmail} 
							setPassword={this.setPassword}
							setActive={this.setActive} />
						) : null 
					}
				</div>
			</div>
		);
	}
}
export default Login;