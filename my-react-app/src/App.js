import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './components/LoginPage/LoginPage'
import ManagerView from './components/ManagerView/ManagerView';
import Browse from './components/Browse/Browse';
import ShowtimeSelection from './components/ShowtimeSelection/ShowtimeSelection'
import MovieInformation from './components/MovieInformation/MovieInformation';
import TheaterBooking from './components/TheaterBooking/TheaterBooking';
import OrderSummary from './components/OrderSummary/OrderSummary';
import CheckoutUI from './components/CheckoutUI/CheckoutUI';
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation'
import CreateAccount from './components/CreateAccount/CreateAccount';
import RegisterConfirmation from './components/RegistrationConfirmation/RegistrationConfirmation';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ChangePassword from './components/ChangePassword/ChangePassword';
import AddCard from './components/AddCard/AddCard';
import EditProfile from './components/EditProfile/EditProfile';
import SignedInNavBar from './components/SignedInNavBar/SignedInNavBar';

function App() { 
  if (localStorage.getItem('sessionID') == null) {
    localStorage.setItem('sessionID', "");
  }
  
  return (
    <Router>
      <div className="App">
        <NavBar />

        <div className="contents">
          <Routes>
            <Route path ="/" element ={<HomePage />}/>
            <Route path ="/LoginPage" element = {<LoginPage />}/>
            <Route path ="/ManagerView" element ={<ManagerView />}/>
            <Route path ="/Browse" element ={<Browse/>}/>
            <Route path ="/MovieInformation" element ={<MovieInformation/>}/>
            <Route path ="/ShowtimeSelection" element = {<ShowtimeSelection/>}/>
            <Route path ="/TheaterBooking" element = {<TheaterBooking/>}/>
            <Route path ="/OrderSummary" element = {<OrderSummary />}/>
            <Route path ="/CheckOut" element = {<CheckoutUI />}/>
            <Route path ="/OrderConfirmation" element = {<OrderConfirmation/>}/>
            <Route path ="/CreateAccount" element ={<CreateAccount/>}/>
            <Route path = "/RegisterConfirmation" element ={<RegisterConfirmation/>}/>
            <Route path ="/ForgotPassword" element ={<ForgotPassword/>}/>
            <Route path = "/VerifyCode/:verificationCode/:page/:email" element = {<VerifyCode/>}/>
            <Route path = "/ChangePassword/:email" element = {<ChangePassword/>}/>
            <Route path ="/AddCard" element = {<AddCard/>}/>
            <Route path ="/EditProfile" element = {<EditProfile/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
