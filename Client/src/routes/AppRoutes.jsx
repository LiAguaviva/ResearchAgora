import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { NavbarApp } from '../components/NavbarApp/NavbarApp'
import { FooterApp } from '../components/FooterApp/FooterApp'
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
import { AboutUs } from '../pages/Info/AboutUs'

export const AppRoutes = () => {
  return (
    <BrowserRouter >
        <NavbarApp />
        <main className='ppal'>
        <Routes>
          {/* Dashboard */}
            <Route path='/' element={<Home />}/>

            {/* info */}
            <Route path='/infolayout' element={< InfoLayout />} >
                 <Route index element={<AboutUs/>} />
                 <Route path='metrics' element={<Metrics/>} />
                 <Route path='partnership' element={<Partnership/>} />
                 <Route path='contact' element={<Contact/>} />
            </Route> 

            {/* Auth */}
            <Route path='/register' element={<Register />}/>
            <Route path='/accountverified/:token' element={<AccountVerified />}/>
            <Route path='/login' element={<Login />}/>

            {/* User */}
            <Route path='/profile' element={<Profile />}/>
            <Route path='/editprofile' element={<EditProfile />}/> 

            {/* Offer */}
            <Route path='/createoffer' element={<CreateOffer />}/>
            <Route path='/oneoffer' element={<OneOffer />}/>
            <Route path='/alloffer' element={<AllOffers />}/>
            <Route path='/edit' element={<EditOffer />}/>

            {/* Project */}
            <Route path='/allprojects' element={<AllProjects />}/>
            <Route path='/oneproject' element={<OneProject />}/>
            <Route path='/editproject' element={<EditProject />}/>
            <Route path='/createproject' element={<CreateProject />}/>
            
            {/* Admin */}
            <Route path='/admin' element={<AdminLayout />}/>
             
           {/* Error */}
            <Route path='*' element={<ErrorPage />}/>   
        </Routes>
        </main>
        <footer>
          <FooterApp />
        </footer>
    </BrowserRouter>
  )
}
