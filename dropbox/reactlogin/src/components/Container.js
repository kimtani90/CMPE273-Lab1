import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import '../Login.css';
import SignUp from "./SignUp";
import FileUpload from "./FileUpload";
import Login from "./Login";
import {connect} from 'react-redux';
import {afterlogin} from "../actions/index";


class Container extends Component {

    state = {
        login: "SI",
        message: ''
    };

    login = (userdata) =>{

        API.doLogin(userdata)
            .then((res)  => {

                console.log(res.userdetails);

                if (res.status == 201) {

                    this.props.afterlogin(res.userdetails);
                    this.props.history.push("/files");

                } else if (res.status == 401) {
                    this.setState({

                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    loginOrSignup = (data) => {

        console.log(data);
        this.setState({
            message:'',
            login:data
        });
    };

    signUp = (userdata) =>{

        API.createUser(userdata)
            .then((status)  => {
                if (status === 201) {

                    this.setState({

                        message: "User details saved successfully!"
                    });
                } else if (status === 401) {
                    this.setState({

                        message: "Email already exists!"
                    });
                }
            });
    };

    render() {
        return (
            <div className="container-fluid">
                { this.state.message===''?'':(
                    <div className="text-danger">
                        {this.state.message}
                    </div>)
                }


                <h1 className="text-center login-title"></h1>
                <div className="account-wall">
                    <div className="col-md-12">

                        {this.state.login === "SU" ?
                            <SignUp signUp={this.signUp} loginOrSignup={this.loginOrSignup}/>
                            :
                            <Login login={this.login} loginOrSignup={this.loginOrSignup}/>
                        }


                    </div>
                </div>
            </div>




    );


    }
}


function mapDispatchToProps(dispatch) {
    return {
        afterlogin : (data) => dispatch(afterlogin(data))
    };

}

export default withRouter(connect(null, mapDispatchToProps)(Container));