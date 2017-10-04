import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import '../Login.css';

import NewerHomePage from "./NewerHomePage";



class SignUp extends Component {

    state = {
        firstName:'',
        lastName:'',
        username: '',
        password: '',
        email:'',
        contactNo:''
    };

    componentWillMount(){
        this.setState({
            firstName:'',
            lastName:'',
            username: '',
            password: '',
            email:'',
            contactNo:'',
            message:''
        });
    }

    login = () => {

        this.props.history.push("/");

    };

    newuser = (userdata) =>{

        API.createUser(userdata)
            .then((status)  => {
                if (status === 201) {
                    this.setState({

                        message: "User created"
                    });


                } else if (status === 401) {
                    this.setState({

                        message: "Error inserting data. Try again..!!"
                    });
                }
            });
    };

    render() {
        return (
            <div className="container-fluid">

                <Route exact path="/signup" render={() => (


                    <div className="row justify-content-md-center">
                        <div className="col-md-4 ">
                            <h1 className="text-center login-title"></h1>
                            <div className="account-wall">
                                <div className="col-md-12">
                                    <h2> Create an account</h2>
                                    <br/>
                                    <input type="text" className="form-control" placeholder="First Name" required autoFocus
                                           onChange={(event) => {
                                               this.setState({
                                                   firstName: event.target.value
                                               });
                                           }}/>
                                    <br/>
                                    <input type="text" className="form-control" placeholder="Last Name" required
                                           onChange={(event) => {
                                               this.setState({
                                                   lastName: event.target.value
                                               });
                                           }}/>

                                    <br/>
                                    <input type="email" className="form-control" placeholder="Email" required autoFocus
                                           onChange={(event) => {
                                               this.setState({
                                                   email: event.target.value
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
                                    <input type="tel" className="form-control" placeholder="Contact Number" required autoFocus
                                           onChange={(event) => {
                                               this.setState({
                                                   contactNo: event.target.value
                                               });
                                           }}/>
                                    <br/>
                                    <label className="checkbox pull-left checkbox-label">
                                        <input type="checkbox" value="remember-me"/>
                                        I agree to Dropbox terms
                                    </label>
                                    <br/>
                                    <button className="btn btn-primary btn-block" type="submit"
                                            onClick={() => this.newuser(this.state)}>
                                        Save
                                    </button>
                                    <a href="#" className="text-center new-account" onClick={() => this.login()}>Log In </a>

                                </div>
                            </div>

                        </div>
                    </div>


                )}/>

                {/*<Route exact path="/signup" render={() => (
                    <div>
                        <Login handleSubmit={this.handleSubmit}/>
                        <Message message={this.state.message}/>
                    </div>
                )}/>*/}

                <Route exact path="/" render={() => (
                    <div>
                        <NewerHomePage/>

                    </div>
                )}/>

            </div>

        );
    }
}

export default withRouter(SignUp);