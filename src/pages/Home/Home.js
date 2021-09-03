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
    return(
      <div className='home-main-container'>
        <Sidebar selectedPage={this.state.selectedPage} changePage={this.changePage}/>

      </div>
    )
  }
}

export default Home;
