import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useState } from 'react';
import RefreshHandler from './RefreshHandler';

function App() {

  //Here create private routing so without logout user can't go into signup or login page using URL
  const [isAuthenticated, setIsAuthenticated] = useState(false); //this contain token in localstorge until user is login , or this set value true for that
  
  const PrivateRoute = ({element}) => {
    return isAuthenticated ? element : <Navigate to="/login" /> //element jo run time pe componet/path hi vo
  }


  //normal routing
  return (
    <div className="App">
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} /> {/*use RefreshHandler for private routing and RefreshHandler say hmm "setIsAuthenticated" ki value la rahe hi on the basis of condion*/}
     <Routes>
        <Route path='/' element={<Navigate to = "/login" />} />
        <Route path='/login' element={<Login />} />
        
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element ={<PrivateRoute element={<Home />} />} />
     </Routes>
    </div>
  );
}

export default App;
