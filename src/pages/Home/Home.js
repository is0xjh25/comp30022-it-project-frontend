import Button from '@material-ui/core/Button';
import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';


import Sidebar from '../../components/Sidebar/Sidebar';
import Members from '../../components/Members/Members';
import Organization from '../../components/Manage/Organization';
import Department from '../../components/Manage/Department';

require('dotenv').config();

class Home extends React.Component {
  constructor(props) {
    super(props);
    // Use state to control current viewing page
    this.state = {
      selectedPage: 'dashboard',
      organizationDisplay: -1
    };
    this.changePage = this.changePage.bind(this);
    this.changeOrg = this.changeOrg.bind(this);
  }

  changePage(nowSelected) {
    this.setState({
      selectedPage: nowSelected
    })
  }

  changeOrg(organization_id) {
    this.setState({
      organizationDisplay: organization_id
    })
  }

  render() {
    var body;

    if(this.state.selectedPage === 'Manage') {
      body = (
        <Organization changePage={this.changePage} changeOrg={this.changeOrg}/>
      )
    }

    if(this.state.selectedPage === 'Department') {
      body = (
        <Department organization={this.state.organizationDisplay}/>
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
