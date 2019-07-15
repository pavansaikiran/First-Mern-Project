import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import DialogModal from './components/DialogModal'
import {Provider} from 'react-redux'
import store from './store'
import {Container} from 'reactstrap'
import { loadUser } from './actions/authActions'
class App extends React.Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render(){
    return (
      <Provider store={store}>
      <div className="App">
        <AppNavbar/>
        <Container>
          <DialogModal/>
          <ShoppingList/>
        </Container>
      </div>
      </Provider>
    );
  }
}

export default App;
