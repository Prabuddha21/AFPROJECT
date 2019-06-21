import React, {Component} from 'react';

class AdminNotice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            values: this.props.values,
        };
    }

    render() {
        return <div className="jumbotron mt-1">
            <div className="row">
                <div className="col-sm-8 col-md-6 mx-auto">
                    <h2>{this.state.values.title}</h2>
                    <table className="table col-md-2 mx-auto">
                        <tbody>
                        <tr>
                            <td>{this.state.values.content}</td>
                        </tr>
                        <tr>
                            <td>By: {this.state.values.by}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    }
}

export default AdminNotice;