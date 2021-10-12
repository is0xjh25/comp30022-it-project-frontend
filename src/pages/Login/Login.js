import React from 'react';
import BackGroundImage from '../../images/road.jpg';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Resend from './Resend';
import {
	Box,
	Grid
} from '@mui/material';

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
			<Grid container sx={{minWidth:1920}}>
				<Grid item xs={9}>
					<Box component="img" src={BackGroundImage} sx={{height: '100%', width: '100%'}} alt=""/>
				</Grid>
				<Grid item xs={3}>
					{pageStatus === 'signIn' ? (
							<SignIn setPageStatus={this.setPageStatus} />
						) : pageStatus === 'signUp' ? (
							<SignUp setPageStatus={this.setPageStatus} />
						) : pageStatus === 'resend' ? (
							<Resend setPageStatus={this.setPageStatus} />
						) : null 
					}
				</Grid>
			</Grid>
		);
	}
}
export default Login;