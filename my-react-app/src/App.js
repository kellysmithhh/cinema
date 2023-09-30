import './App.css';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './components/LoginPage/LoginPage'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />

        <div className="contents">
          <Routes>
            <Route path ="/" element ={<HomePage />}/>
            <Route path ="/LoginPage" element = {<LoginPage />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
