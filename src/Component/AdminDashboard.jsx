import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";

import NavBar from './AdminNavBar';
import Home from './AdminHome';
import AdminRegister from './AdminRegister';

export default class AdminDashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Router>
            <div className="AdminDashboard">
                <NavBar/>
                <div>
                    <Route exact path="/admin/dashboard" component={Home}/>
                    <Route exact path="/admin/dashboard/admin/add" component={AdminRegister}/>
                </div>
            </div>
        </Router>
    }
}