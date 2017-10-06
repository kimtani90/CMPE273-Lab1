import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import '../Login.css';
import SignUp from "./SignUp";
import FileUpload from "./FileUpload";
import Login from "./Login";


class Container extends Component {

   /* constructor(){
        super();
        this.state = {
            isLoggedIn: false,
            message:'',
            username: '',
            login: "SI"
        };

    }


     componentWillMount(){
         console.log('aaaaa');
         this.setState({
             ...this.state,
             isLoggedIn: false,
             message:'',
             username: ''
         });
     }*/


    login = (userdata) =>{

        API.doLogin(userdata)
            .then((status)  => {
                if (status === 201) {
                    /*this.setState({
                        isLoggedIn: true,

                        username: userdata.username
                    });*/
                    this.props.dologin(item.todo)
                    this.props.history.push("/files");
                } else if (status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    loginOrSignup = (data) => {

        console.log(data);
        this.setState({
            ...this.state,
            login:data
        });
    };

    signUp = (userdata) =>{

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



function mapStateToProps(state) {

    userdata : state.userdata;
    console.log(todos);
    const todoArr = Object.keys(todos.items).map((item) => (
        {
            'todo' : item,
            'desc' : todos.items[item]
        }
    ));

    const total = todos.total;

    return {todoArr, total};
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo : (data) => dispatch(addTodo(data))
    };
}

export default withRouter (connect(null, mapDispatchToProps)(Container));