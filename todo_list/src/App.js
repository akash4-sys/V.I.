import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

// rafce -- react arrow export function 

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg:message,
      type:type
    });
    setTimeout(() => {
      setAlert(null);
    },4500);
  }

  return (
    <>
      <NoteState>
        <Router>
        <Navbar/>
        <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}/>}/>
              <Route path="/login" element={<Login showAlert={showAlert}/>}/>
              <Route path="/signup" element={<Signup showAlert={showAlert}/>}/>
              <Route path ="/about" element ={<About/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;