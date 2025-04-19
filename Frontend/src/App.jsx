import './App.css'
import { Navbar } from './Components/Navbar'
import { Home } from './Pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Charges } from './Pages/Charges';

function App() {

  return (
    <>
          <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/book-ride" element={<BookRide />} />
                <Route path="/contact" element={<Contact />} /> */}
                <Route path="/getfare/:pickup/&/:destination" element={<Charges />} />
              </Routes>
          </BrowserRouter>
       {/* Add other components or routes here */}
    </>
  )
}

export default App
