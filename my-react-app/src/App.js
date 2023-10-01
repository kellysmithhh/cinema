import './App.css';
import HomePage from './components/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import LoginPage from './components/LoginPage/LoginPage'
import MovieInformation from './components/MovieInformation/MovieInformation';
import ManagerView from './components/ManagerView/ManagerView';
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
            <Route path ="/ManagerView" element ={<ManagerView />}/>
            <Route path = "/MovieInformation" element ={<MovieInformation />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
