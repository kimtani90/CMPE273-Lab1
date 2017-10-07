import React, {Component} from 'react';
import * as API from '../api/API';
import ImageGridList from "./ImageGridList";
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import {connect} from 'react-redux';

class FileUpload extends Component {


    handleFileUpload = (event) => {


        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);
        payload.append('email', this.props.email);
console.log(payload);
        API.uploadFile(payload)
            .then((status) => {
                if (status === 204) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data
                            });
                        });
                }
            });

    };

    constructor() {
        super();
        this.state = {
            images: []
        };
    }

    componentDidMount() {

        API.getImages()
            .then((data) => {
                console.log(data);
                this.setState({
                    images: data
                });
            });
    };

    render() {
        console.log("ddddddddddddddddddds");
        console.log(this.props);
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
                <ImageGridList images={this.state.images}/>
            </div>

        );
    }
}



function mapStateToProps(userdata) {

    console.log(userdata);

    const email = userdata.email;

    return {email};
}
/*
function mapDispatchToProps(dispatch) {
    return {
        addTodo : (data) => dispatch(addTodo(data))
    };
}*/

export default connect(mapStateToProps, null)(FileUpload);    // Learn 'Currying' in functional programming


