import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import routes from './routes';
import { useState } from 'react';
import Header from './header';

function App() {

  const [loggedIn,setLoggedIn] = useState(false)

  return (
    <>
      <Router>
        {
          loggedIn?
            <Header/>
          :null
        }
        <Routes>
          {
            routes.map((i,index)=>{
              return <Route path={i.path} element={i.component} key={index} />
            })
          }
        </Routes>
      </Router>
    </>
  );
}

export default App;
