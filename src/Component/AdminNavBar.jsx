import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

export default class AdminNavBar extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="#">Administer Dashboard</a>
            <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"> </span>
            </button>
            <div className="collapse navbar-collapse justify-content-md" id="navbar1">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/admin/dashboard" className="nav-link">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/dashboard/manageadmin" className="nav-link">
                            Manage Administers
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/dashboard/instructors" className="nav-link">
                            Manage Instructors
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/admin/dashboard/courses" className="nav-link">
                            Manage Courses
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    }
}