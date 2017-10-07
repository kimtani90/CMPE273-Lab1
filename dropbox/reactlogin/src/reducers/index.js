import {LOGIN} from "../actions/index";
import SignUp from "../components/SignUp";


// https://github.com/reactjs/react-redux/blob/d5bf492ee35ad1be8ffd5fa6be689cd74df3b41e/src/components/createConnect.js#L91
const initialState = {

    firstName: '',
    lastName: '',
    password: '',
    email: '',
    contactNo: '',
    interests:'',
    lastLoginTime:'',

    files :[{
        fileName: '',
        filePath:'',
        fileParent: '',
        isFile: ''
    }],

    groups: [{
        groupName: ''
    }],

    userLog:[{
        action:'',
        fileName : '',
        activityTime:''
    }]


};

const userdata = (state = initialState, action) => {
    console.log("xxxxxxxxxxxxxxxxxxxxx");
    console.log(action.payload);
    switch (action.type) {

        case LOGIN :
            return {
                    ...state,
                    email: action.payload.email,
                    password: action.payload.password
            };

        /*case SIGNUP :
            return {
                ...state,
                user:{
                    ...state.user,
                    firstName: '',
                    lastName: '',
                    username: action.payload.username,
                    password: action.payload.password,
                    email: '',
                    contactNo: ''
                }
            };
*/

        default :
            return state;

    }
};

export default userdata;