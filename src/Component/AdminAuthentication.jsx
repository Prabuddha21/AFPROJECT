import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
import jwt from 'jsonwebtoken';

export default class AdminAuthentication extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        const {path} = this.props.path;
        const Component =  this.props.component;
        const admintoken = sessionStorage.getItem('admintoken');
        const isLoggedIn = admintoken != null;

        return <Route path={path} render={() => {
            return isLoggedIn ? <Component/> : <Redirect to="/admin"/> }
        }/>
    }
}

// const AdminAuthentication = ({ component: Component, ...rest }) => {
//
//     const usertoken = localStorage.getItem('usertoken');
//     const isLoggedIn = usertoken != null;
//
//     console.log(rest);
//
//     return (
//         <Route
//             {...rest}
//             render={props =>
//                 isLoggedIn ? (
//                     <Component {...props} />
//                 ) : (
//                     <Redirect to={{ pathname: '/admin', state: { from: props.location } }} />
//                 )
//             }
//         />
//     )
// };
//
// export default AdminAuthentication;