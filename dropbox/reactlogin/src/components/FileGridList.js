import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../FileUpload.css';

/*

const styles = theme => ({
    root: {
        background: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    subheader: {
        width: '100%',
    },
});
*/

class FileGridList extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        images: PropTypes.array.isRequired
    };

    render(){
        const classes = this.props;
console.log(this.props.files);
        return (
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-2 sidenav">
                    <nav className="col-sm-2">
                        <ul className="nav nav-pills nav-stacked" data-spy="affix" data-offset-top="205">
                            <li className="active"><a href="#section1">Section 1</a></li>
                            <li><a href="#section2">Section 2</a></li>
                            <li><a href="#section3">Section 3</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="col-sm-1 "></div>
                <div className="col-sm-6">

                        <table className="table table-striped">
                            <thead>
                            <tr className="col-sm-12">
                                <th className="col-sm-1"></th>
                                <th className="col-sm-6">Lastname</th>
                                <th className="col-sm-2">Email</th>
                                <th className="col-sm-2">dats</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.files.map((file, index) => {

                                return(
                                <tr>
                                    <td><input type="checkbox" onChange={(event) => {
                                        /*this.setState({
                                            password: event.target.value
                                        });*/
                                    }}/></td>
                                    <td><a href={'http://localhost:3001/' + file.filename} className="link-title "
                                           ref="title">
                                        {file.filename}
                                    </a></td>

                                    <td><button className="btn btn-primary btn-block" type="submit"
                                                onClick={() => this.props.deleteFile(index, file)}>
                                        Delete
                                    </button></td>
                                    <td>john@ssss.com</td>
                                </tr>
                                );
                            })}
                            </tbody>
                        </table>

                </div>




                <div className="col-sm-1 "></div>
                <div className="col-sm-2 sidenav">
                    <div className="well">
                        <p>ADS</p>
                    </div>
                    <div className="well">
                        <p>ADS</p>
                    </div>
                </div>
                <footer className="container-fluid text-center">
                    <p>Footer Text</p>
                </footer>
            </div>
            </div>

        );
    }


}


export default FileGridList;