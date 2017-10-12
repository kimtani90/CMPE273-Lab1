import React, {Component} from 'react';
import {Row,Col,ListGroupItem} from 'react-bootstrap';
import Modal from 'react-modal';
import '../FileUpload.css';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";


class FileGridList extends Component {



    state = { isModalOpen: false, shareEmail:'', file:'' , group:[]}
    openModal(file) {
        this.setState({ isModalOpen: true , file: file})
    }

    closeModal(data) {
        console.log(data);

        {data!=""?

            ( data.shareEmail!=""?this.props.sharefile(data):'')
            :''}
        this.setState({ isModalOpen: false })
    }

    style = {
        content : {
            top                   : '50%',
            left                  : '50%',
            right                 : 'auto',
            bottom                : 'auto',
            marginRight           : '-50%',
            transform             : 'translate(-50%, -50%)'
        }
    };

    render(){


    return (

        <div className="col-sm-6">

            <table className="table table-striped table-condensed table-hover table-bordered">
                    <thead>
                    <tr className="justify-content-md-left">

                        <th>File Name</th>

                    </tr>
                    </thead>

                    <tbody>

                    {this.props.files.map((file, index) => {

                        if(file.fileparent==this.props.parentFile) {
                            var downloadlink="http://localhost:3001/uploads/"+this.props.userEmail.split('.')[0]+"/"+file.filename
                            return (
                                <tr className="justify-content-md-left">

                                    <td>
                                        {file.isfile == 'F' ?

                                            <a href="#" className="link-title "
                                               onClick={() => this.props.openFileFolder(file)}>
                                                {file.filename}
                                            </a>
                                            :
                                            <a href={downloadlink} className="link-title "> {file.filename}</a>
                                        }
                                            </td>

                                    <td>
                                        <button className="btn btn-primary" type="submit"
                                                onClick={() => this.props.deleteFile(index, file)}>
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        {/*<button className="btn btn-primary" type="submit"
                                                onClick={() => this.openModal(file)}>
                                            Share
                                        </button>*/}
                                    </td>
                                </tr>
                            );
                        }
                    })}
                    </tbody>
                </table>
                <Modal isOpen={this.state.isModalOpen} style={this.style} onClose={() => this.closeModal()}>
                    <ListGroupItem>

                        <Row className="show-grid">
                            <Col md={4}>Share with Email:</Col>

                            {/*<Tokenizer

                                onTokenAdd={function(token) {
                                    this.setState({
                                       group:{ ...this.state.group,
                                                token
                                       }
                                    })
                                    console.log('token added: ', token);
                                }}
                            />*/}
                            <Col md={8}>
                                <input type="text" className="form-control" required="true" autoFocus placeholder="Enter semi-colon separated emails"
                                       onChange={(event) => {
                                           this.setState({
                                               shareEmail: event.target.value
                                           });
                                       }}/>
                            </Col>

                        </Row>

                    </ListGroupItem>
                    <br/>
                    <div className=" row justify-content-md-center">
                        <div className=" col-md-4">
                            <button className="btn btn-primary" type="submit"
                                    onClick={() => this.closeModal(this.state)}>Save</button>
                        </div>
                        <div className=" col-md-4">
                            <button className="btn btn-primary" type="submit"
                                    onClick={() => this.closeModal('')}>Close</button>
                        </div>

                    </div>



                </Modal>


        </div>


        );
    }


}


export default FileGridList;