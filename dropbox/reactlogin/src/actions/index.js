
export const LOGIN = 'LOGIN';
export const ADDFILE = 'ADDFILE';
export const DELETE_FILE = 'DELETE_FILE';

export function afterlogin(userdata) {

    return {
        type : LOGIN,
        payload : userdata
    }
};



export function addFile(filedata) {

    return {
        type : ADDFILE,
        payload : filedata
    }
};


export function deleteFile(index) {

    return {
        type : DELETE_FILE,
        payload : index
    }
};
