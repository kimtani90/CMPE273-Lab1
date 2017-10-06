import React, {Component} from 'react';
import '../Login.css';
import PropTypes from 'prop-types';
import dropbox from "./dropboxplus.gif";


class Login extends Component {
    /*
        static propTypes = {
            handleSubmit: PropTypes.func.isRequired
        };*/

    state = {
        username: '',
        password: ''
    };


    render() {
        return (
            <div className="jumbotron">
            <div className="container-fluid row justify-content-md-center">

                <div className="account-wall col-md-7">
                    <div className="col-md-12">

                    <img className="profile-img" src={dropbox}
                     alt=""/>



                        <table className="table table-user-information justify-content-md-left">
                            <tbody>
                            <tr>
                                <td>Department:</td>
                                <td>Programming</td>
                            </tr>


                                <tr>
                                    <td>Gender</td>
                                    <td>Female</td>
                                </tr>
                                <tr>
                                    <td>Home Address</td>
                                    <td>Kathmandu,Nepal</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td><a href="mailto:info@support.com">info@support.com</a></td>
                                </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>123-4567-890(Landline)<br/><br/>555-4567-890(Mobile)
                                </td>

                            </tr>

                            </tbody>
                        </table>


                        <div className=" row justify-content-md-center">




















                        <div class="col-md-5 " >First Name</div>
                <input type="text" className="form-control col-md-5" placeholder="Email" required autoFocus
                       onChange={(event) => {
                           this.setState({
                               username: event.target.value
                           });
                       }}/>
                        </div>
                <br/>
                <textarea type="text" className="form-control" placeholder="Password" required
                       onChange={(event) => {
                           this.setState({
                               password: event.target.value
                           });
                       }}/>

                <br/>
                <button className="btn btn-primary btn-block" type="submit"
                        onClick={() => this.props.login(this.state)}>
                    Sign in
                </button>
                    </div>
                </div>

            </div>
            </div>
        );
    }
}

export default Login;