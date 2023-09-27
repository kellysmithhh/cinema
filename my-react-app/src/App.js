import './App.css';
import HomePage from './components/HomePage/HomePage';
// import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation'
import CheckoutUI from './components/CheckoutUI/CheckoutUI';

function App() {
  return (
    <div className="App">
      <HomePage />
      <CheckoutUI />
    </div>
  );
}

export default App;
