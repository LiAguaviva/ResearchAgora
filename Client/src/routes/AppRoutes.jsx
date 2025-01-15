import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavbarApp } from '../components/NavbarApp/NavbarApp'
import { FooterApp } from '../components/FooterApp/FooterApp'
import { AboutUs } from '../pages/Dashboard/AboutUs/AboutUs'
import { Login } from '../pages/Auth/Login/Login'
import { Register } from '../pages/Auth/Register/Register'
import { Contact } from '../pages/Info/Contact'
import { ErrorPage } from '../pages/ErrorPage/ErrorPage'
import { AllOffers } from '../pages/Offer/AllOffers/AllOffers'
import { CreateOffer } from '../pages/Offer/CreateOffer/CreateOffer'
import { EditOffer } from '../pages/Offer/EditOffer/EditOffer'
import { OneOffer } from '../pages/Offer/OneOffer/OneOffer'
import { AllProjects } from '../pages/Project/AllProjects/AllProjects'
import { Home } from '../pages/Dashboard/Home/Home'
import { OneProject } from '../pages/Project/OneProject/OneProject'
import { EditProject } from '../pages/Project/EditProject/EditProject'
import { CreateProject } from '../pages/Project/CreateProject/CreateProject'
import { Profile } from '../pages/User/Profile/Profile'
import { EditProfile } from '../pages/User/EditProfile/EditProfile'
import { Metrics } from '../pages/Info/Metrics'
import { Partnership } from '../pages/Info/Partnership'
import { InfoLayout } from '../pages/Info/InfoLayout'
import { AdminLayout } from '../pages/Admin/AdminLayout'
import { AccountVerified } from '../pages/Auth/AccountVerified/AccountVerified'

export const AppRoutes = () => {
  return (
    <BrowserRouter >
        <NavbarApp />
        <main className='ppal'>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/aboutus' element={<AboutUs />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/accountverified/:token' element={<AccountVerified />}/>
            <Route path='/alloffer' element={<AllOffers />}/>
            <Route path='/createoffer' element={<CreateOffer />}/>
            <Route path='/edit' element={<EditOffer />}/>
            <Route path='/oneoffer' element={<OneOffer />}/>
            <Route path='/allprojects' element={<AllProjects />}/>
            <Route path='/oneproject' element={<OneProject />}/>
            <Route path='/editproject' element={<EditProject />}/>
            <Route path='/createproject' element={<CreateProject />}/>
            <Route path='/allprojects' element={<AllProjects />}/>
            <Route path='/profile' element={<Profile />}/>
            <Route path='/editprofile' element={<EditProfile />}/> 
            <Route path='/infolayout' element={< InfoLayout />} >
                 <Route index element={<Contact/>} />
                 <Route path='metrics' element={<Metrics/>} />
                 <Route path='partnership' element={<Partnership/>} />
            </Route> 
            <Route path='/admin' element={<AdminLayout />}/>
            <Route path='*' element={<ErrorPage />}/>   
        </Routes>
        </main>
        <footer>
          <FooterApp />
        </footer>
    </BrowserRouter>
  )
}
