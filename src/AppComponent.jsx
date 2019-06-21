import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AdminLogin from './Component/AdminLogin';
import AdminDashboard from './Component/AdminDashboard';
import AdminAuthentication from './Component/AdminAuthentication';

export default class AppComponent extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return <Router>
            <div className="AppContainer">
                <Switch>
                <Route exact path="/"/>
                <Route exact path="/admin" component={AdminLogin}/>
                <AdminAuthentication path="/admin/dashboard" component={AdminDashboard}/>
                </Switch>
            </div>
        </Router>
    }
}