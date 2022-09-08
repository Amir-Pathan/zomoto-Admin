import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import routes from './routes';
import { useEffect, useState } from 'react';
import Header from './header';
import Services from './services/service';
import store from './redux/store';
import { Provider } from 'react-redux';

function App() {

  const [loggedIn,setLoggedIn] = useState(false)

  useEffect(()=>{

    const slr = localStorage.getItem('zomoto-user')

     if(slr!==null){

      const slrp= JSON.parse(slr)

        Services.isAble(slrp.no).then((res)=>{

          if(res!==0){
            setLoggedIn(true)
          }else{
            setLoggedIn(false)
          }
        }).catch((err)=>{console.log(err);})

    }else{
      if(window.location.pathname!=='/createAccount'){
        if(window.location.pathname==='/login'){
          return
        }else{
          window.location.pathname='/createAccount'
        }
      }
    }

  },[])

  return (
    <>
     <Provider store={store}>
      <Router>
        {
          loggedIn?
            <Header/>
          :
          <div>
            <h1
            style={{
              textAlign:'center'
            }}
            >Network Error</h1>
          </div>
        }
        <Routes>
          {
            routes.map((i,index)=>{
              return <Route path={i.path} element={i.component} key={index} />
            })
          }
        </Routes>
      </Router>
     </Provider>
    </>
  );
}

export default App;
