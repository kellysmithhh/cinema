import './App.css';
import HomePage from './components/HomePage/HomePage';
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation'
import CheckoutUI from './components/CheckoutUI/CheckoutUI';
import TheaterBooking from './components/TheaterBooking/TheaterBooking';
import ShowtimeSelection from './components/ShowtimeSelection/ShowtimeSelection';

function App() {
  return (
    <div className="App">
      <HomePage />
      <OrderConfirmation />
      <CheckoutUI />
      <TheaterBooking />
      <ShowtimeSelection />
    </div>
  );
}

export default App;
