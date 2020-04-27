import React, { useContext, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { Context } from './Store';
import CreateAccount from './pages/create-account';
import EditAccount from './pages/edit-account';
import EditAccountTwo from './pages/edit-account/EditAccountTwo';
import EditFlock from './pages/edit-flock';
import GetReport from './pages/get-report';
import Login from './pages/login';
import MainTabs from './pages/main';
import ManageAccount from './pages/manage-account';
import ManageChicken from './pages/manage-chicken';
import ManageFlock from './pages/manage-flock';
import Nav from './components/Navbar';
import PersonalInfo from './pages/create-account/PersonalInfo';
import ResetPassword from './pages/reset-password';
import ShowHouseData from './pages/show-house-data';
import ShowWorkerData from './pages/show-worker-data';
import axios from 'axios';

function AppRouter() {
    const { dispatch } = useContext(Context);
    useEffect(() => {
        const getCurrentUser = async () => {
            const res = await axios.get('/users/currentuser');

            console.log(res.data);
            if (res.data.role === 'OWNER') {
                const data = {
                    ...res.data,
                    hno: localStorage.getItem('hno'),
                };
                dispatch({
                    type: 'update-user',
                    payload: data,
                });
            }

            if (res.data.role === 'OWNER') {
                const res = await axios.get('/event/hnos');
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
                        <Route path="/edit-flock">
                            <EditFlock />
                        </Route>
                        <Route path="/reset-password">
                            <ResetPassword />
                        </Route>
                        <Route path="/create-account">
                            <CreateAccount />
                        </Route>
                        <Route path="/personal-info">
                            <PersonalInfo />
                        </Route>
                        <Route path="/edit-account-one">
                            <EditAccount />
                        </Route>
                        <Route path="/edit-account-two">
                            <EditAccountTwo />
                        </Route>
                        <Route path="/get-report">
                            <GetReport />
                        </Route>
                        <Route path="/show-house-data">
                            <ShowHouseData />
                        </Route>
                        <Route path="/manage-account">
                            <ManageAccount />
                        </Route>
                        <Route path="/show-worker-data">
                            <ShowWorkerData />
                        </Route>
                        <Route path="/">
                            <MainTabs />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default AppRouter;
