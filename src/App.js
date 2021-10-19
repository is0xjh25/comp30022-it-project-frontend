import './App.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import PageNavigator from './pages/PageNavigator'
import {SnackbarProvider} from 'notistack';

class App extends React.Component {
  render() {
      return( 
          <SnackbarProvider maxSnack={3} 
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            iconVariant={{
                success: '✅',
                error: '✖️',
                warning: '⚠️',
                info: 'ℹ️',
            }}>
                <BrowserRouter>
                    <PageNavigator/>
                </BrowserRouter>
          </SnackbarProvider>
      );
  }
}

export default App;
