import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import '../Login.css';
import SignUp from "./SignUp";
import FileUpload from "./FileUpload";
import dropbox from "./dropboxplus.gif";


class NewerHomePage extends Component {

    state = {
        isLoggedIn: false,
        message:'',
        username: '',
        password: ''
    };

    componentWillMount(){
        this.setState({
            isLoggedIn: false,
            message:'',
            username: '',
            password: ''
        });
    }

    signup = () => {
        this.props.history.push("/signup");
    };

    handleSubmit = (userdata) =>{

        API.doLogin(userdata)
            .then((status)  => {
                if (status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        username: userdata.username
                    });
                    this.props.history.push("/files");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
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
                <Route exact path="/" render={() => (


                        <div className="row justify-content-md-center">
                            <div className="col-md-4 ">
                                <h1 className="text-center login-title"></h1>
                                <div className="account-wall">
                                    <div className="col-md-12">
                                    <img className="profile-img" src={dropbox}
                                         alt=""/>

                                            <input type="text" className="form-control" placeholder="Email" required autoFocus
                                                   onChange={(event) => {
                                                    this.setState({
                                                    username: event.target.value
                                                });
                                            }}/>
                                                <br/>
                                            <input type="password" className="form-control" placeholder="Password" required
                                                   onChange={(event) => {
                                                       this.setState({
                                                           password: event.target.value
                                                       });
                                                   }}/>

                                                <br/>
                                                    <button className="btn btn-primary btn-block" type="submit"
                                                            onClick={() => this.handleSubmit(this.state)}>
                                                            Sign in
                                                    </button>
                                                <br/>
                                                    <label className="checkbox pull-left">
                                                        <input type="checkbox" value="remember-me"/>
                                                            Remember me
                                                    </label>
                                                    <a href="" className="pull-right need-help"
                                                       >Need help? </a><span className="clearfix"></span>
                                    </div>
                                </div>
                                <a href="#" className="text-center new-account" onClick={() => this.signup()}>Create an account </a>
                            </div>
                        </div>


                )}/>

                {/*<Route exact path="/signup" render={() => (
                    <div>
                        <Login handleSubmit={this.handleSubmit}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>*/}

                <Route exact path="/signup" render={() => (
                    <div>
                        <SignUp/>

                    </div>
                )}/>

                <Route exact path="/files" render={() => (
                //  <FileUpload username={this.state.username}/>
                    <FileUpload/>
                )}/>

            </div>

        );
    }
}

export default withRouter(NewerHomePage);