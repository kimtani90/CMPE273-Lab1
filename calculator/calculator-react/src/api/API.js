const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3000'

const headers = {
    'Accept': 'application/json'
};


export const getResult = () =>
    fetch(`${api}/calculate`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });

export const performCalc = (payload) =>

    fetch(`${api}/calculate`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: payload
    }).then(res => {
        return res.status;
    }).catch(error => {
            console.log("This is error");
            return error;
        });
