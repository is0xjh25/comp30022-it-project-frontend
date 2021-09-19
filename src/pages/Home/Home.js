import Button from '@material-ui/core/Button';
import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';


import Sidebar from '../../components/Sidebar/Sidebar';
import Members from '../../components/Members/Members';
import Organization from '../../components/Manage/Organization';
import Department from '../../components/Manage/Department';
import Contacts from '../../components/Contact/Contact'
import DisplayCustomer from '../../components/Contact/DisplayCustomer'

require('dotenv').config();


class Home extends React.Component {
  constructor(props) {
    super(props);
    // Use state to control current viewing page
    this.state = {
      selectedPage: 'dashboard'
    };
    this.changePage = this.changePage.bind(this);
  }

  changePage(nowSelected) {
    this.setState({
      selectedPage: nowSelected
    })
  }

  render() {
    var body;

    if(this.state.selectedPage === 'Manage') {
      body = (
        <Organization changePage={this.changePage}></Organization>
      )
    }

    if(this.state.selectedPage === 'Department') {
      body = (
        <Department></Department>
      )
    }

    if(this.state.selectedPage === 'Contacts') {
      body = (
        <Contacts/>
      )
    }

    return(
      <div className='home-main-container'>
        <div className='sidebar-container'>
          <Sidebar selectedPage={this.state.selectedPage} changePage={this.changePage}/>
        </div>
        <div className='sidebar-body'>
          {body}
        </div>
      </div>
    )
  }
}

export default Home;
