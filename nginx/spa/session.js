class Session {
    constructor() {}

    setAuthToken(authToken) {
        localStorage.setItem('authToken', authToken);
    }

    getAuthToken() {
        return localStorage.getItem('authToken');
    }

    setIdToken(idToken) {
        localStorage.setItem('idToken', idToken);
    }

    getIdToken() {
        return localStorage.getItem('idToken');
    }

    setRegisterdInfoValue(newHasRegisteredInfo) {
        localStorage.setItem('hasRegisteredInfo', newHasRegisteredInfo);
    }

    getRegisterdInfoValue() {
        return localStorage.getItem('hasRegisteredInfo');
    }

    setUserType(type) {
        localStorage.setItem('userType', type);
    }

    getUserType() {
        return localStorage.getItem('userType');
    }

    destroy() {
        localStorage.clear();
    }

}

export const sessionManager = new Session()