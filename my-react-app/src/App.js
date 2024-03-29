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

function App() {
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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
