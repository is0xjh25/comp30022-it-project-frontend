import Button from '@material-ui/core/Button';
import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';



import Sidebar from '../../components/Sidebar/Sidebar';
import Members from '../../components/Members/Members';
import Organization from '../../pages/Manage/Organization';
import Department from '../../pages/Manage/Department';

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
        // <Members></Members>
        <Organization></Organization>
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
