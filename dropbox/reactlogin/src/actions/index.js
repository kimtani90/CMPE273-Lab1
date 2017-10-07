
export const LOGIN = 'LOGIN';

export function afterlogin(userdata) {
    console.log("vvvvvvvvvvvvvvvvvvvv");
    console.log(userdata)
    return {
        type : LOGIN,
        payload : userdata
    }
};

/*

export function aftersignup(userdata) {
    console.log(userdata)
    return {
        type : SIGNUP,
        payload : userdata
    }
};*/
