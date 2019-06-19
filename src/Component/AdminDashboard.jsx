import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import NavBar from './AdminNavBar';

export default class AdminDashboard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Router>
            <NavBar/>
            <div>
                something here
            </div>
        </Router>
    }
}