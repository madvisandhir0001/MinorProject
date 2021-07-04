import React, { useEffect } from 'react';
import './App.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth, companies as companiesRef, users } from './utils/firebase';
import HomeScreen from './screens/HomeScreen';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen';
import AboutUs from './screens/AboutUs';
import ContactUs from './screens/ContactUs';
import Dashboard from './screens/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUserData, setCompanyData, selectCompanies, setCompanies } from './features/appSlice';
import CategoryScreen from './screens/CategoryScreen';
import Header from './components/Header';
import HeaderMobile from './components/HeaderMobile';
import AdminBlock from './screens/AdminBlock';
import Company from './screens/Company';
import AppUser from './screens/AppUser';

function App() {
  const [user, loading] = useAuthState(auth);
  const userData = useSelector(selectUserData);
  const companies = useSelector(selectCompanies);
  const dispatch = useDispatch();
  const smallScreen = window.innerWidth < 960 ? true : false

  useEffect(() => {
    if (user) {
      users.doc(user.email || userData.email).onSnapshot(snapshot => dispatch(login(snapshot.data())));
      companiesRef.onSnapshot(snapshot => dispatch(setCompanies(snapshot.docs.map(doc => doc.data()))));
    }
  }, [user]);

  useEffect(() => {
    if (companies) {
      companies.map(company => {
        if (company.userEmail === user.email) {
          return dispatch(setCompanyData(company))
        }
      })
    }
  }, [companies])



  return (
    <div className="app">
      <Router>

        {!smallScreen ? <Header /> : <HeaderMobile />}
        <Switch>
          {loading && <LoadingScreen userData={userData} />}
          <Route path="/user/login"><LoginScreen /></Route>
          <Route path="/user/register"><RegisterScreen /></Route>
          <Route path="/user/dashboard" ><Dashboard /></Route>
          <Route path="/categories/:id" ><CategoryScreen /></Route>
          <Route path="/contact" ><ContactUs /></Route>
          <Route path="/about" ><AboutUs /></Route>
          <Route path="/admin" ><AdminBlock /></Route>
          <Route path="/company/:id" ><Company /></Route>
          <Route path="/appuser/:id" ><AppUser /></Route>
          <Route path="/" exact><HomeScreen /></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;