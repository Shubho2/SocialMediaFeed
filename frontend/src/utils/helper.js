import { jwtDecode } from "jwt-decode";

const USER_PROFILE = 'profile';

function extractUserData() {
    let user = null;
    let localData = JSON.parse(localStorage.getItem(USER_PROFILE));
    if (localData?.credential) {
        const decodedData = jwtDecode(localData.credential);
        user = { result: decodedData, token: localData.credential };
    } else if (localData?.result) {
        user = localData;
    }
    return user;
}

function storeUserData(data) {
    localStorage.setItem(USER_PROFILE, JSON.stringify({ ...data }));
}

function clearUserData() {
    localStorage.clear();
}

export { extractUserData, storeUserData, clearUserData };