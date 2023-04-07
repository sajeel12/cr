import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-notifications/lib/notifications.css';

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import './App.css';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';
import store from './store';
import ItemModal from './components/ItemModal';

import { loadUser } from './actions/authActions';
import { Component } from 'react';

import Main from './components/Main';
import AgreementForm from './components/client/AgreementForm';

import { BrowserRouter, Router, Route } from 'react-router-dom';

class App extends Component {

  componentDidMount = async () => {

    await store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store} >
        <BrowserRouter>
          {/* <AppNavbar /> */}
          {/* <Container> */}

          <Main />
          {/* <AgreementForm/> */}

          {/* <ShoppingList /> */}
          {/* </Container> */}


        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
