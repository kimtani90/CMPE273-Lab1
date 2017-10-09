import React, {Component} from 'react';
import '../FileUpload.css';
import Modal from 'react-modal';
import {Row,Col,ListGroupItem} from 'react-bootstrap';

class RightNavBar extends Component {

    state = { isModalOpen: false, foldername:'', fileparent:'', isfile:'F' }
    openModal() {
        this.setState({ isModalOpen: true , fileparent:this.props.parentFile})
    }

    closeModal(data) {
        console.log(data);

        {data!=""?

            ( data.foldername!=""?this.props.makeFolder(data):'')
                :''}

        this.setState({ isModalOpen: false})
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

        return(
        <div className="col-sm-2 sidenav">

                <button className="btn btn-primary btn-block" type="submit"
                        /*onClick={this.props.makeFolder}*/>
                    Make Group
                </button>
                <hr/>
            <button className="btn btn-primary btn-block" type="submit"
                    onClick={() => this.openModal()}>
                Make Folder
            </button>
            <br/>
            <Modal isOpen={this.state.isModalOpen} style={this.style} onClose={() => this.closeModal()}>
                <ListGroupItem>
                    <Row className="show-grid">
                        <Col md={4}>FolderName:</Col>
                        <Col md={8}>
                            <input type="text" className="form-control" required="true" autoFocus
                                   onChange={(event) => {
                                       this.setState({
                                           foldername: event.target.value
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

        )}

}


export default RightNavBar;