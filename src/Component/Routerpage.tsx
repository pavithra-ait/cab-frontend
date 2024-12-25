import React from 'react'
import Header from './Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Userregister from './Userlogin'
import Driverregister from './Driverregister'
import Login from './Login'

export default function Routerpage() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Header/>}></Route>
                    <Route path='/user-register' element={<Userregister/>}></Route>
                    <Route path='/driver-register' element={<Driverregister/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}