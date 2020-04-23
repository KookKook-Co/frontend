import React, { useContext, useEffect } from 'react';
import {
    Redirect,
    Route,
    BrowserRouter as Router,
    Switch,
} from 'react-router-dom';

import ChickenInfo from './pages/chicken-info';
import { Context } from './Store';
import CreateAccount from './pages/create-account';
import GetReport from './pages/get-report';
import Login from './pages/login';
import MainTabs from './pages/main';
import ManageChicken from './pages/manage-chicken';
import ManageFlock from './pages/manage-flock';
import Nav from './components/Navbar';
import PersonalInfo from './pages/create-account/PersonalInfo';
import ShowHouseData from './pages/show-house-data';
import Temp from './pages/temperature';
import axios from 'axios';

function AppRouter() {
    const { state, dispatch } = useContext(Context);
    useEffect(() => {
        const getCurrentUser = async () => {
            const res = await axios.get('/users/currentuser');
            console.log(res.data);
            dispatch({
                type: 'update-user',
                payload: res.data,
            });
            console.log('++++++++USER++++');
            console.log(state.user);

            if (res.data.role === 'OWNER') {
                const res = await axios.get('/event/hnos');
                console.log('+++getHNO');
                console.log(res.data);
                dispatch({
                    type: 'update-hno',
                    payload: res.data,
                });
            }
        };
        getCurrentUser();
    }, []);

    return (
        <div id="outer-container">
            <Router>
                <Nav />
                <div id="page-wrap">
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/temp">
                            <Temp />
                        </Route>
                        <Route path="/">
                            <MainTabs />
                        </Route>
                        <Route path="/dead-chicken">
                            <MainTabs />
                        </Route>
                        <Route path="/daily-data">
                            <MainTabs />
                        </Route>
                        <Route path="/manage-chicken">
                            <ManageChicken />
                        </Route>
                        <Route path="/manage-flock">
                            <ManageFlock />
                        </Route>
                        <Route path="/create-account">
                            <CreateAccount />
                        </Route>
                        <Route path="/chicken-info">
                            <ChickenInfo />
                        </Route>
                        <Route path="/personal-info">
                            <PersonalInfo />
                        </Route>
                        <Route path="/get-report">
                            <GetReport />
                        </Route>
                        <Route path="/show-house-data">
                            <ShowHouseData />
                        </Route>
                        {/* 
                        <Route path="/">
                            <Redirect to="/login" />
                        </Route> */}
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default AppRouter;
