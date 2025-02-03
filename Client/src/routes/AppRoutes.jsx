import { BrowserRouter, Route, Routes } from 'react-router-dom'
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
import { PersonalData } from '../pages/User/PersonalData/PersonalData'
import { ForgotPassword } from '../pages/Auth/ForgotPassword/ForgotPassword'
import { ResetPassword } from '../pages/Auth/ResetPassword/ResetPassword'
import { AllUsers } from '../pages/User/AllUsers/AllUsers'
import { Researcher } from '../pages/User/Researcher/Researcher'
import { FooterApp } from '../components/navigationComps/FooterApp/FooterApp'
import { NavbarApp } from '../components/navigationComps/NavbarApp2/NavbarApp'
import { Chat } from '../pages/Chat/Chat'
import ScrollToTopAuto from '../components/navigationComps/ScrollToTop/ScrollToTopAuto'
import { useContext } from 'react'
import { AgoraContext } from '../context/ContextProvider'

export const AppRoutes = () => {

  const {user} = useContext(AgoraContext) 

  return (
    <BrowserRouter >
        <ScrollToTopAuto />
        <NavbarApp />
        <main className='ppal'>
        <Routes>
            <Route path='/' element={<Home />}/>

            <Route path='/infolayout' element={< InfoLayout />} >
                 {/* <Route index element={<AboutUs/>} /> */}
                 <Route path='about' element={<AboutUs/>} />
                 <Route path='metrics' element={<Metrics/>} />
                 <Route path='partnership' element={<Partnership/>} />
                 <Route path='contact' element={<Contact/>} />
            </Route> 

            <Route path='/register' element={<Register />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/forgotPassword' element={<ForgotPassword />}/>
            <Route path='/accountverified/:token' element={<AccountVerified />}/>
            <Route path='/resetPassword/:token' element={<ResetPassword />}/>

            { user &&
              <>
              <Route path='/profile' element={<Profile />}/>
              <Route path='/editprofile' element={<EditProfile />}/> 
              <Route path='/PersonalData' element={<PersonalData />}/> 
              <Route path='/researchers' element={<AllUsers />}/> 
              <Route path='/researcher/:id' element={<Researcher />}/> 

              <Route path='/createoffer/:id' element={<CreateOffer />}/>
              <Route path='/oneoffer' element={<OneOffer />}/>
              <Route path='/alloffer' element={<AllOffers />}/>
              <Route path='/edit/:id' element={<EditOffer />}/>

              <Route path='/allprojects' element={<AllProjects />}/>
              <Route path='/oneproject/:id' element={<OneProject />}/>
              <Route path='/editproject/:id' element={<EditProject />}/>
              <Route path='/createproject' element={<CreateProject />}/>
              
              <Route path='/chat/:receiver_id' element={<Chat />}/>
            </>} 

              {/* <Route path='/admin' element={<AdminLayout />}/> */}

              <Route path='*' element={<ErrorPage />}/>  
        </Routes>
        </main>
        <footer>
          <FooterApp />
        </footer>
    </BrowserRouter>
  )
}
