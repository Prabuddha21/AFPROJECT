import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Switch} from "react-router-dom";
import AdminLogin from './Component/AdminLogin';

export default class AppComponent extends Component{

    constructor(props) {
        super(props);
    }

    render() {

        if(window.location.pathname === '/'){
            return <div>
                <h1>Hello User</h1>
            </div>
        }
        else {
            return <div>
                <h1>Hello Admin</h1>
                <AdminLogin/>
            </div>
        }

    }
}