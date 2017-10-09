import React, {Component} from 'react';
import * as API from '../api/API';
import FileGridList from "./FileGridList";
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import {connect} from 'react-redux';
import {addFile} from "../actions/index";
import {deleteFile} from "../actions/index";
import RightNavBar from "./RightNavBar";
import LeftNavBar from "./LeftNavBar";


class FileUpload extends Component {

    state = {
        message: '',
        fileparent:''
    };
    handleFileUpload = (event) => {


        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);
        payload.append('email', this.props.userdata.email);
        payload.append('fileparent', this.state.fileparent);
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

    makeFolder=(folder) => {

        const folderData={folder:folder, email:this.props.userdata.email}
        API.makeFolder(folderData)
            .then((res) => {

                if (res.status == 204) {

                    this.props.addFile(res.folderdata);
                    this.setState({

                        message: "folder created successfully"
                    });

                }else if (res.status == 401) {
                    this.setState({

                        message: "Folder error"
                    });
                }
            });

    }

    sharefile=(filedata) => {

        const data={filedata:filedata, email:this.props.userdata.email}
        console.log(data);

        API.shareFile(data)
            .then((res) => {

                if (res.status == 201) {
                    console.log("Success...")
/*

                    this.props.addFile(res.folderdata);
*/

                }else if (res.status == .401) {
                    this.setState({

                        message: "Folder error"
                    });
                }
            });

    }

    openFileFolder=(filedata) =>{
        const fileArr=this.props.userdata.files;
        const newFileArr=[];
        console.log(fileArr);
        if(filedata.isfile=='F'){

            this.setState({
                fileparent:filedata.filepath
            });

        }


        else{

            this.setState({
                fileparent:filedata.filepath
            });
        }
        console.log(this.state.fileparent);

    }

    render() {


        console.log(this.state.fileparent);
        return (
            <div className="container-fluid">

            <div className="jumbotron">



<div className="row justify-content-md-center">

               {/* <Typography
                    align={'center'}
                    type="display1"
                >
                    Upload a file:
                </Typography>*/}

                <TextField

                    type="file"
                    name="mypic"
                    onChange={this.handleFileUpload}
                />
</div>
<br/><br/>

                <div className="container-fluid">
                    <div className="row">

                        <div className="col-sm-8 ">
                            <a href="#" className="link-title "
                               onClick={() => this.setState({
                                   fileparent:''
                               })}>
                                Dropbox
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <LeftNavBar/>
                        <div className="col-sm-1 "></div>
                        <FileGridList files={this.props.userdata.files}
                                      deleteFile={this.deleteFile}
                                      sharefile={this.sharefile}
                                      openFileFolder={this.openFileFolder}
                                      parentFile={this.state.fileparent}/>
                        <div className="col-sm-1 "></div>
                        <RightNavBar makeFolder={this.makeFolder}
                                     parentFile={this.state.fileparent}/>
                    </div>
                </div>

            </div>

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


