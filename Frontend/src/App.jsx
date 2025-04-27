import './App.css'
import { Navbar } from './Components/Navbar'
import { Home } from './Pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Charges } from './Pages/Charges';
import CaptainSignup from './Pages/CaptainSignup';
import UserSignup from './Pages/UserSignup';
import UserLogin from './Pages/UserLogin';
import CaptainLogin from './Pages/CaptainLogin';
import UserWrapper from './Components/UserWrapper';
import UserConfirmRide from './Pages/UserConfirmRide';
import CaptionHome from './Pages/CaptionHome';
import CaptainWrapper from './Components/CaptainWrapper';

function App() {

  return (
    <>
        <BrowserRouter>
              <Navbar />
               <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/captain-home" element={
                  <CaptainWrapper><CaptionHome /></CaptainWrapper>} />
                {/* <Route path="/book-ride" element={<BookRide />} />
                <Route path="/contact" element={<Contact />} /> */}
                <Route path="/getfare/:pickup/&/:destination" element={<Charges />} />
                <Route path="/captain-signup" element={<CaptainSignup/>} />
                <Route path="/user-signup" element={<UserSignup/>} />
                <Route path="/user-login" element={<UserLogin/>} />
                <Route path="/captain-login" element={<CaptainLogin/>} />
                <Route path="/book-ride/:id"
            element={
              <UserWrapper>
                <UserConfirmRide />
              </UserWrapper>
            }/>
              </Routes>
          </BrowserRouter>
       {/* Add other components or routes here */}
    </>
  )
}

export default App
