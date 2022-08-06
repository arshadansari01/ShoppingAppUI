

function ValidateMobileNumber(number) {
    let flag = true;
    const array = number.split('');
    for (let element = 0; element < array.length; element++) {
        const isNumericDigit = array[element].charCodeAt(0) >= 48 && array[element].charCodeAt(0) <= 57;
        if (isNumericDigit != true) {
            flag = false;
            break;
        }

    }
    return (flag && number.length == 10);
}

function fetchUserId() {
    return document.cookie.split('=')[1];
}

const EMAIL_ID_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export {
    ValidateMobileNumber, EMAIL_ID_REGEX, fetchUserId
}