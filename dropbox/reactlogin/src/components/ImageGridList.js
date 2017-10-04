import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {GridList, GridListTile} from 'material-ui/GridList';


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

class ImageGridList extends Component {

    static propTypes = {
        classes: PropTypes.object.isRequired,
        images: PropTypes.array.isRequired
    };

    render(){
        const classes = this.props;

        return (

            <div className="container-fluid">
                <div className="row justify-content-md-center ">


                    <div className="col-md-5">
                        <div className={classes.root}>
                            {this.props.images.map(tile => (
                                <div className="card ">

                                        <a href={'http://localhost:3001/'+tile.img} className="link-title" ref="title">
                                            {tile.img}
                                        </a>


                                </div>
                            ))}
                    </div>

                    </div>
                </div>
            </div>
        );
    }


}


export default withStyles(styles)(ImageGridList);