import React, {Component} from 'react';
import '../FileUpload.css';

class LeftNavBar extends Component {

    render(){
        return(
            <div className="col-sm-2 sidenav">

                <button className="btn btn-primary btn-block" type="submit"
                >
                    User Profile
                </button>
                <hr/>
                <button className="btn btn-primary btn-block" type="submit"
                >
                    User Activity
                </button>
                <br/>

            </div>

        )}

}


export default LeftNavBar;