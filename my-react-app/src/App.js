import NavBar from './components/NavBar/NavBar';
import CreateAccount from './components/CreateAccount/CreateAccount'
import LoginPage from './components/LoginPage/LoginPage';
import RegistrationConfirmation from './components/RegistrationConfirmation/RegistrationConfirmation'
import EditProfile from './components/EditProfile/EditProfile'

import './App.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <NavBar />
      <CreateAccount />
      <LoginPage />
      <RegistrationConfirmation />
      <EditProfile />
    
    </div>
  );
}

export default App;
