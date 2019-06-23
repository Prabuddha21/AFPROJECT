import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AdminLogin from './component/AdminLogin';
import AdminDashboard from './component/AdminDashboard';
import AdminAuthentication from './component/AdminAuthentication';
import AdminPassReset from "./component/AdminPassReset";

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
                <Route exact path="/admin/reset" component={AdminPassReset}/>
                <AdminAuthentication path="/admin/dashboard" component={AdminDashboard}/>
                </Switch>
            </div>
        </Router>
    }
}