import React from 'react'
import Header from './Homepage/Header'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Userregister from './Register/Userlogin'
import Driverregister from './Register/Driverregister'
import Login from './Login/Login'
import Driverlogin from './Login/Driverlogin'
import Adminpanel from './Admin/Adminpanel'
import Driverpanel from './Driver/Driverpanel'
import Adminhome from './Admin/Adminhome'
import Userlist from './Admin/userlist'
import Driverlist from './Admin/Driverlist'
import Taxilist from './Admin/Taxilist'
import AddTaxi from './Admin/Addtaxii'
import Transactionlist from './Admin/Transactionlist'
import Homepage from './Homepage/Homepage'
import About from './Homepage/About'
import Driverhome from './Driver/Driverhome'
import Userpanel from './User/Userpanel'
import Userhome from './User/Userhome'
import Taxiavailable from './User/Taxiavailable'
import Booking from './User/Booking'
import Bookinglist from './Driver/Booinglist'
import Paymentlist from './User/Paymentlist'

export default function Routerpage() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Navigate to='/home' />} />

                    <Route path='/' element={<Header />}>
                        <Route path='home' element={<Homepage />}></Route>
                        <Route path='about' element={<About />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/driver-login' element={<Driverlogin />}></Route>
                    </Route>
                    <Route path='/user-register' element={<Userregister />}></Route>
                    <Route path='/driver-register' element={<Driverregister />}></Route>

                    <Route path='/user-panel' element={<Navigate to='/user-panel/user-home' />} />

                    <Route path='/user-panel' element={<Userpanel />}>
                        <Route path='user-home' element={<Userhome />}></Route>
                        <Route path='taxi-available' element={<Taxiavailable />}></Route>
                        <Route path='booking' element={<Booking />}></Route>
                        <Route path='payment-list' element={<Paymentlist />}></Route>
                    </Route>

                    <Route path='/driver-panel' element={<Navigate to='/driver-panel/driver-home' />} />

                    <Route path='/driver-panel' element={<Driverpanel />}>
                        <Route path='driver-home' element={<Driverhome />}></Route>
                        <Route path='booking-list' element={<Bookinglist />}></Route>

                    </Route>

                    <Route path='/admin-panel' element={<Navigate to='/admin-panel/admin-home' />} />

                    <Route path='/admin-panel' element={<Adminpanel />}>
                        <Route path='admin-home' element={<Adminhome />}></Route>
                        <Route path='user-list' element={<Userlist />}></Route>
                        <Route path='driver-list' element={<Driverlist />}></Route>
                        <Route path='taxi-list' element={<Taxilist />}></Route>
                        <Route path='taxi-add' element={<AddTaxi />}></Route>
                        <Route path='payment-list' element={<Transactionlist />}></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}