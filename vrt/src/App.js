import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import { ToastContainer} from 'react-toastify';
import Home from './Component/Home';
import Register from './Component/Register';




function App() {

  return (
    <div>
      <ToastContainer position='top-right' />

      <BrowserRouter>
                    <Routes>
                         
                            <Route path='/login' element={<Home></Home>}></Route>
                            <Route  index element={<Register></Register>} />
                           
                            
                  </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App




