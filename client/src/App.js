import './App.css';
import Home from "./components/Home"
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import User from './components/User';

function App() {
  return (
    <div classNameName="App">
      <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/UserDash" element={<User/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
