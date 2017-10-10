import React, {Component} from 'react';
import * as API from '../api/API';
import '../Login.css';
import PropTypes from 'prop-types';
import dropbox from "./dropboxplus.gif";
import {connect} from 'react-redux';
import {Row,Col,ListGroupItem} from 'react-bootstrap';
import {afterlogin} from "../actions/index";
//import { makeData, Logo, Tips } from "./Utils";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


class UserLog extends Component {

    componentWillMount(){
        const data='kimtani89@gmail.com'
        API.getState(data)
            .then((res) => {
                console.log(res)
                if (res.status == 201) {
                    this.props.afterlogin(res.userdetails);
                    console.log("Success...")

                }else if (res.status == 401) {
                    this.setState({

                        message: "Folder error"
                    });
                }
            });
    }

    render() {
        console.log(this.props.userdata.userLog)
        return (
            <div className="jumbotron">
                <div className="container-fluid row justify-content-md-center">

                    <div className="account-wall col-md-10">
                        <div className="col-md-12">

                            <h2>User Log</h2>

                            <ReactTable
                                data={this.props.userdata.userLog}
                                columns={[
                                    {
                                        Header: "File Name",
                                        columns: [
                                            {
                                                accessor: "filename"
                                            }
                                        ]
                                    },

                                    {
                                        Header: "File Path",
                                        columns: [
                                            {
                                                accessor: "filepath"
                                            }
                                        ]
                                    },

                                    {
                                        Header: "File Type",
                                        columns: [
                                            {
                                                accessor: "isfile"
                                            }
                                        ]
                                    },

                                    {
                                        Header: "Activity",
                                        columns: [
                                            {
                                                accessor: "action"
                                            }
                                        ]
                                    },

                                    {
                                        Header: "Activity Time",
                                        columns: [
                                            {
                                                accessor: "actiontime"
                                            }
                                        ]
                                    }

                                ]}
                                defaultPageSize={10}
                                className="-striped -highlight"
                            />


                    </div>

                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(userdata) {
    console.log(userdata);
    return {userdata};
}

function mapDispatchToProps(dispatch) {
    return {
        // updateUser : (data) => dispatch(updateUser(data)),
        afterlogin : (data) => dispatch(afterlogin(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLog);