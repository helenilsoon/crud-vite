import React, { Children }  from 'react'
import { AuthProvider } from '../context/AuthProvider'
import { BrowserRouter, Route ,Routes } from 'react-router-dom'

import { ProtectedLayout } from './components/ProtectedLayout'
import { Login } from './components/Login/Login'
import { Logged } from './components/Logged'
import { Perfil } from './layout/Perfil'
import { Home } from './layout/home'



function App() {
 
  return (
    
      <AuthProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />        
          <Route path="/login" element={
            
                        
               <Login/>
               
              
          } />
          <Route path="/perfil" element={
            <ProtectedLayout>
             <Perfil/>
            </ProtectedLayout>
            }
             />

          
        </Routes>
        </BrowserRouter>
       </AuthProvider>
    
  )
}

export default App
