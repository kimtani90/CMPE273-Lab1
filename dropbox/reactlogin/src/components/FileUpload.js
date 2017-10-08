import React, {Component} from 'react';
import * as API from '../api/API';
import FileGridList from "./FileGridList";
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import {connect} from 'react-redux';
import {addFile} from "../actions/index";
import {deleteFile} from "../actions/index";

class FileUpload extends Component {

    state = {
        login: "SI",
        message: ''
    };
    handleFileUpload = (event) => {


        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);
        payload.append('email', this.props.userdata.email);
        payload.append('fileparent', '');
        payload.append('isfile', 'T');

        API.uploadFile(payload)
        .then((res) => {

            if (res.status == 204) {

                this.props.addFile(res.filedata);
                this.setState({

                    message: "File uploaded successfully"
                });
            }else if (res.status == 401) {
                this.setState({

                    message: "File error"
                });
            }
        });
    };

    deleteFile=(index, file) => {
console.log(file)
        API.deleteFile(file)
            .then((res) => {

                if (res.status == 204) {

                    this.props.deleteFile(index);
                    this.setState({

                        message: "File deleted successfully"
                    });
                }else if (res.status == 401) {
                    this.setState({

                        message: "File error"
                    });
                }
            });

    }

    render() {


        console.log(this.props.userdata.files);
        return (

            <div className="jumbotron">

                <Typography
                    align={'center'}
                    type="display3"
                >
                    Hello
                </Typography>


                <TextField
                    className={'fileupload'}

                    type="file"
                    name="mypic"
                    onChange={this.handleFileUpload}
                />

                    <FileGridList files={this.props.userdata.files} deleteFile={this.deleteFile}/>

            </div>

        );
    }
}



function mapStateToProps(userdata) {

    return {userdata};
}

function mapDispatchToProps(dispatch) {
    return {
        addFile : (data) => dispatch(addFile(data)),
        deleteFile : (index) => dispatch(deleteFile(index))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);


