import Button from '@material-ui/core/Button';
import React from 'react';
import {Link} from 'react-router-dom';
import './Home.css';

import Sidebar from '../../components/Sidebar/Sidebar'


class Home extends React.Component {
  constructor(props) {
    super(props);
    // Use state to control current viewing page
    this.state = {
      currentPage: 'dashboard'
    };
  }

  render() {
    return(
      <div className='home-main-container'>
        <Sidebar currentPage={this.state.currentPage}/>

      </div>
    )
  }
}

export default Home;
