/*
* Handle submit function
*/
import { sessionManager } from './session.js';

const url = 'http://localhost:8080/api/v1';

export function login() {
    const errorMessage = document.getElementById('errorMessage')
    errorMessage.classList.add('hidden')

    const loginDiv = document.getElementById('loginDiv')
    const loginButton = document.getElementById('loginButton')

    const username = document.getElementById('usernameInput');
    const password = document.getElementById('passwordInput');

    if (password.value.length > 5 && username.value.length > 0) {

        loginDiv.classList.add('loading')
        loginButton.value = ""

        const loginUrl = url + '/token'
        // create request object
        const request = new Request(loginUrl, {
            method: 'POST',
            body: new URLSearchParams({
                'username': username.value,
                'password': password.value,
                'grant_type': 'password'
            }),
        });

        fetch(request)
        .then(response => {
            loginDiv.classList.remove('loading')
            loginButton.value = "Login"

            if (response.ok) {
                response.json().then(data => {
                    if (data.error) {
                        if (data.route) {
                            sessionManager.setAuthToken(data.access_token)
                            sessionManager.setIdToken(data.id_token)
                            sessionManager.setRegisterdInfoValue(false)
                            if (data.user_type == 1) {
                                sessionManager.setUserType(1)
                                window.location.replace('#/profile/setup/student')
                            } else if (data.user_type == 2) {
                                sessionManager.setUserType(2)
                                window.location.replace('#/profile/setup/recruiter')
                            }
                        } else {
                            //display error
                            errorMessage.classList.remove('hidden')
                            errorMessage.innerText = 'error'
                        }
                    } else {
                        sessionManager.setAuthToken(data.access_token)
                        sessionManager.setIdToken(data.id_token)
                        sessionManager.setRegisterdInfoValue(true)
                        sessionManager.setUserType(data.user_type)
                        window.location.replace('#/profile')
                    }
                })
            } else {
                response.json().then(data => {
                    if (data.error == 'invalid_client') {
                        //display invalid username/password
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = data.message
                    } else {
                        //display generic error
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = 'Server error'
                    }
                })
            }
        })
        .catch(error => {
            loginDiv.classList.remove('loading')
            loginButton.value = "Login"
            errorMessage.classList.remove('hidden')
            errorMessage.innerText = 'Network error'
        })
    } else {
        errorMessage.classList.remove('hidden')
        errorMessage.innerText = 'Password must be longer then 6 characters'
    }
}

export function register() {
    const errorMessage = document.getElementById('errorMessage')
    errorMessage.classList.add('hidden')

    const registerDiv = document.getElementById('registerDiv')
    const registerButton = document.getElementById('registerButton')

    const username = document.getElementById('usernameInput');
    const password = document.getElementById('passwordInput');
    const email = document.getElementById('emailInput')
    const optionUserType = document.getElementById('optionInput')
    const userType = optionUserType.options[optionUserType.selectedIndex].value;

    if (password.value.length > 5 && username.value.length > 0 && email.value.length > 5 && userType != 'Choose an option') {

        registerDiv.classList.add('loading')
        registerButton.value = ""

        const registerUrl = url + '/users'
        const request = new Request(registerUrl, {
            method: 'POST',
            body: new URLSearchParams({
                'email': email.value,
                'username': username.value,
                'password': password.value,
                'accountType': userType
            }),
            
        });
        fetch(request)
        .then(response => {
            registerDiv.classList.remove('loading')
            registerButton.value = "Register"
            if (response.ok) {
                response.json().then(data => {
                    window.location.replace('#/login')
                })
            } else {
                response.json().then(data => {
                    if (response.status == 400) {
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = data.message
                    } else if (response.status == 500) {
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = 'Server error'
                    } else {
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = 'Server error'
                    }
                })
            }
        })
        .catch(error => {
            registerDiv.classList.remove('loading')
            registerButton.value = "Register"
            errorMessage.classList.remove('hidden')
            errorMessage.innerText = 'Network error'
        })
    } else {
        errorMessage.classList.remove('hidden')
        errorMessage.innerText = 'Password must be longer then 6 characters\nEmail must be supplied\nUsername must be supplied\nAccount type can not be Choose an option'
    }
}

export function logout() {
    const logoutDiv = document.getElementById('logoutDiv')
    const logoutButton = document.getElementById('logoutButton')
    logoutDiv.classList.add('loading')
    logoutButton.value = ""
    sessionManager.destroy()
    window.location.replace('#/');
}

export function profileSetupStudent() {
    const errorMessage = document.getElementById('errorMessage')
    errorMessage.classList.add('hidden')

    const submitDiv = document.getElementById('submitDiv')
    const submitButton = document.getElementById('submitButton')

    const firstname = document.getElementById('firstnameInput');
    const lastname = document.getElementById('lastnameInput');
    const birthdate = document.getElementById('birthdateInput');
    const bio = document.getElementById('biotextInput');
    const school = document.getElementById('schoolInput');
    const program = document.getElementById('programInput');
    const graduationdate = document.getElementById('graduationdateInput');
    const resume = document.getElementById('resumeInput');
    const profilepic = document.getElementById('profilepicInput');

    if (firstname.value.length > 0 && lastname.value.length > 0) {
        submitDiv.classList.add('loading')
        submitButton.value = ""

        const profileSetupStudent = url + '/users/info'
        const request = new Request(profileSetupStudent, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+sessionManager.getAuthToken()+'',
            },
            body: new URLSearchParams({
                'firstname': firstname.value,
                'lastname': lastname.value,
                'birthname': birthdate.value,
                'bio': bio.value,
                'school': school.value,
                'program': program.value,
                'graduationdate': graduationdate.value,
                'resume': resume.value,
                'profilepic': profilepic.value
            }),
            
        });
        fetch(request)
        .then(response => {
            submitDiv.classList.remove('loading')
            submitButton.value = "Submit"
            if (response.ok) {
                sessionManager.setRegisterdInfoValue(true)
                window.location.replace('#/profile')
            } else {
                response.json().then(data => {
                    if (response.status == 400) {
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = data.message
                    } else if (response.status == 500) {
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = 'Server error'
                    } else {
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = 'Server error'
                    }
                })
            }
        })
        .catch(error => {
            submitDiv.classList.remove('loading')
            submitButton.value = "Submit"
            errorMessage.classList.remove('hidden')
            errorMessage.innerText = 'Network error'
        })
    } else {
        errorMessage.classList.remove('hidden')
        errorMessage.innerText = 'Firstname must be supplied\nLastname must be supplied'
    }
}

export function profileSetupRecruiter() {
    const errorMessage = document.getElementById('errorMessage')
    errorMessage.classList.add('hidden')

    const submitDiv = document.getElementById('submitDiv')
    const submitButton = document.getElementById('submitButton')

    const firstname = document.getElementById('firstnameInput');
    const lastname = document.getElementById('lastnameInput');
    const companyname = document.getElementById('companynameInput')
    const phonenumber = document.getElementById('phonenumberInput')
    const companylogo = document.getElementById('companylogoInput')

    if (firstname.value.length > 0 && lastname.value.length > 0 && companyname.value.length > 0) {
        submitDiv.classList.add('loading')
        submitButton.value = ""

        const profileSetupRecruiter = url + '/users/info'
        const request = new Request(profileSetupRecruiter, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer '+sessionManager.getAuthToken()+'',
            },
            body: new URLSearchParams({
                'firstname': firstname.value,
                'lastname': lastname.value,
                'companyname': companyname.value,
                'phonenumber': phonenumber.value,
                'companylogo': companylogo.value
            }),
            
        });
        fetch(request)
        .then(response => {
            submitDiv.classList.remove('loading')
            submitButton.value = "Submit"
            if (response.ok) {
                response.json().then(data => {
                    sessionManager.setRegisterdInfoValue(true)
                    window.location.replace('#/profile')
                })
            } else {
                response.json().then(data => {
                    if (response.status == 400) {
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = data.message
                    } else if (response.status == 500) {
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = 'Server error'
                    } else {
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = 'Server error'
                    }
                })
            }
        })
        .catch(error => {
            submitDiv.classList.remove('loading')
            submitButton.value = "Submit"
            errorMessage.classList.remove('hidden')
            errorMessage.innerText = 'Network error'
        })
    } else {
        errorMessage.classList.remove('hidden')
        errorMessage.innerText = 'Firstname must be supplied\nLastname must be supplied\nCompany name must be supplied'
    }
}

export function createAdvert() {
    const errorMessage = document.getElementById('errorMessage')
    errorMessage.classList.add('hidden')

    const submitDiv = document.getElementById('submitDiv')
    const submitButton = document.getElementById('submitButton')

    const createAdvertUrl = url + '/adverts'

    if (sessionManager.getUserType() == 1) {

        // get advert info
        const title = document.getElementById('titleInput');
        const body = document.getElementById('bodyInput');
        const fieldOptions = document.getElementById('option')
        const field = fieldOptions.options[fieldOptions.selectedIndex].value;
        const contact = document.getElementById('contactInput')
        const startdate = document.getElementById('startdateInput')
        const enddate = document.getElementById('enddateInput')

        //validate
        if (title.value.length > 0 && body.value.length > 0 && contact.value.length > 0) {

            submitDiv.classList.add('loading')
            submitButton.value = ""

            const request = new Request(createAdvertUrl, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+sessionManager.getAuthToken()+'',
                },
                body: new URLSearchParams({
                    'title': title.value,
                    'body': body.value,
                    'field': field,
                    'contact': contact.value,
                    'startdate': startdate.value,
                    'enddate': enddate.value
                }), 
            });
            fetch(request)
            .then(response => {
                submitDiv.classList.remove('loading')
                submitButton.value = "Create"
                if (response.ok) {
                    window.location.replace('#/my/adverts')
                } else {
                    response.json().then(data => {
                        if (response.status == 400) {
                            errorMessage.classList.remove('hidden')
                            errorMessage.innerText = data.message
                        } else if (response.status == 500) {
                            errorMessage.classList.remove('hidden')
                            errorMessage.innerText = 'Server error'
                        } else {
                            errorMessage.classList.remove('hidden')
                            errorMessage.innerText = 'Server error'
                        }
                    })
                }
            })
            .catch(error => {
                submitDiv.classList.remove('loading')
                submitButton.value = "Create"
                errorMessage.classList.remove('hidden')
                errorMessage.innerText = 'Network error'
            })
        } else {
            errorMessage.classList.remove('hidden')
            errorMessage.innerText = 'everything must be supplied'
        }
    } else if (sessionManager.getUserType() == 2) {
        // get advert info
        const title = document.getElementById('titleInput');
        const body = document.getElementById('bodyInput');
        const fieldOptions = document.getElementById('option')
        const field = fieldOptions.options[fieldOptions.selectedIndex].value;
        const contact = document.getElementById('contactInput')
        const city = document.getElementById('cityInput')
        const website = document.getElementById('websiteInput')
        const positions = document.getElementById('positionsInput')
        const deadlinedate = document.getElementById('deadlinedateInput')

        //validate
        if (title.value.length > 0 && body.value.length > 0 && contact.value.length > 0) {

            submitDiv.classList.add('loading')
            submitButton.value = ""

            const request = new Request(createAdvertUrl, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer '+sessionManager.getAuthToken()+'',
                },
                body: new URLSearchParams({
                    'title': title.value,
                    'body': body.value,
                    'field': field,
                    'city': city.value,
                    'contact': contact.value,
                    'website': website.value,
                    'positions': positions.value,
                    'deadlinedate': deadlinedate.value
                }), 
            });
            fetch(request)
            .then(response => {
                submitDiv.classList.remove('loading')
                submitButton.value = "Create"
                if (response.ok) {
                    window.location.replace('#/my/adverts')
                } else {
                    response.json().then(data => {
                        if (response.status == 400) {
                            errorMessage.classList.remove('hidden')
                            errorMessage.innerText = data.message
                        } else if (response.status == 500) {
                            errorMessage.classList.remove('hidden')
                            errorMessage.innerText = 'Server error'
                        } else {
                            errorMessage.classList.remove('hidden')
                            errorMessage.innerText = 'Server error'
                        }
                    })
                }
            })
            .catch(error => {
                submitDiv.classList.remove('loading')
                submitButton.value = "Create"
                errorMessage.classList.remove('hidden')
                errorMessage.innerText = 'Network error'
            })
        } else {
            errorMessage.classList.remove('hidden')
            errorMessage.innerText = 'everything must be supplied'
        }
    }
}

export function deleteAdvert() {
    const query = location.hash.split('?')
    const params = query[1].split('&')

    const submitDiv = document.getElementById('submitDiv')
    const submitButton = document.getElementById('submitButton')

    if (params.length > 2 || params.length < 2) {
        errorMessage.classList.remove('hidden')
        errorMessage.innerText = 'too few arguments or to many arguments'
    } else {
        const param1 = params[0].split('=')
        const param2 = params[1].split('=')

        var id
        var type
        if (param1[0] == 'id') {
            id = param1[1]
            type = param2[1]
        } else {
            id = param2[1]
            type = param1[1]
        }

        if (id == null || type == null || id == '' || type == '') {
            errorMessage.classList.remove('hidden')
            errorMessage.innerText = 'id or type is not submitted'
        } else {
            submitDiv.classList.add('loading')
            submitButton.value = ""

            const deleteAdvertUrl = url+'/adverts/'+id+''
            const request = new Request(deleteAdvertUrl, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer '+sessionManager.getAuthToken()+'',
                }
            });
            fetch(request)
            .then(response => {
                submitDiv.classList.remove('loading')
                submitButton.value = "Delete"
                if (response.ok) {
                    window.location.replace('#/my/adverts')
                } else {
                    response.json().then(data => {
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = 'Network error'
                    })
                }
            })
            .catch(error => {
                submitDiv.classList.remove('loading')
                submitButton.value = "Delete"
                errorMessage.classList.remove('hidden')
                errorMessage.innerText = 'Network error'
            })
        }
    }
}

export function updateAdvert() {
    const errorMessage = document.getElementById('errorMessage')
    errorMessage.classList.add('hidden')

    const submitDiv = document.getElementById('submitDiv')
    const submitButton = document.getElementById('submitButton')

    const query = location.hash.split('?')
    const params = query[1].split('&')

    if (params.length > 2 || params.length < 2) {
        errorMessage.classList.remove('hidden')
        errorMessage.innerText = 'too few arguments or to many arguments'
    } else {
        const param1 = params[0].split('=')
        const param2 = params[1].split('=')

        var id
        var type
        if (param1[0] == 'id') {
            id = param1[1]
            type = param2[1]
        } else {
            id = param2[1]
            type = param1[1]
        }

        if (id == null || type == null || id == '' || type == '') {
            errorMessage.classList.remove('hidden')
            errorMessage.innerText = 'id or type is not submitted'
        } else {
            if (sessionManager.getUserType() == 1) {
                const updateAdvertUrl = url+'/adverts/'+id+'?type=student'

                // get advert info
                const title = document.getElementById('titleInput');
                const body = document.getElementById('bodyInput');
                const fieldOptions = document.getElementById('option')
                const field = fieldOptions.options[fieldOptions.selectedIndex].value;
                const contact = document.getElementById('contactInput')
                const startdate = document.getElementById('startdateInput')
                const enddate = document.getElementById('enddateInput')

                //validate
                if (title.value.length > 0 && body.value.length > 0 && contact.value.length > 0) {
                    submitDiv.classList.add('loading')
                    submitButton.value = ""

                    const request = new Request(updateAdvertUrl, {
                        method: 'PUT',
                        headers: {
                            'Authorization': 'Bearer '+sessionManager.getAuthToken()+'',
                        },
                        body: new URLSearchParams({
                            'title': title.value,
                            'body': body.value,
                            'field': field,
                            'contact': contact.value,
                            'startdate': startdate.value,
                            'enddate': enddate.value
                        }), 
                    });
                    fetch(request)
                    .then(response => {
                        submitDiv.classList.remove('loading')
                        submitButton.value = "Update"
                        if (response.ok) {
                            window.location.replace('#/my/adverts')
                        } else {
                            response.json().then(data => {
                                if (response.status == 400) {
                                    errorMessage.classList.remove('hidden')
                                    errorMessage.innerText = data.message
                                } else if (response.status == 500) {
                                    errorMessage.classList.remove('hidden')
                                    errorMessage.innerText = 'Server error'
                                } else {
                                    errorMessage.classList.remove('hidden')
                                    errorMessage.innerText = 'Server error'
                                }
                            })
                        }
                    })
                    .catch(error => {
                        submitDiv.classList.remove('loading')
                        submitButton.value = "Update"
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = 'Network error'
                    })
                } else {
                    errorMessage.classList.remove('hidden')
                    errorMessage.innerText = 'everything must be supplied'
                }
            } else if (sessionManager.getUserType() == 2) {
                const updateAdvertUrl = url+'/adverts/'+id+'?type=recruiter'
                // get advert info
                const title = document.getElementById('titleInput');
                const body = document.getElementById('bodyInput');
                const fieldOptions = document.getElementById('option')
                const field = fieldOptions.options[fieldOptions.selectedIndex].value;
                const contact = document.getElementById('contactInput')
                const city = document.getElementById('cityInput')
                const website = document.getElementById('websiteInput')
                const positions = document.getElementById('positionsInput')
                const deadlinedate = document.getElementById('deadlinedateInput')

                //validate
                if (title.value.length > 0 && body.value.length > 0 && contact.value.length > 0) {
                    submitDiv.classList.add('loading')
                    submitButton.value = ""

                    const request = new Request(updateAdvertUrl, {
                        method: 'PUT',
                        headers: {
                            'Authorization': 'Bearer '+sessionManager.getAuthToken()+'',
                        },
                        body: new URLSearchParams({
                            'title': title.value,
                            'body': body.value,
                            'field': field,
                            'city': city.value,
                            'contact': contact.value,
                            'website': website.value,
                            'positions': positions.value,
                            'deadlinedate': deadlinedate.value
                        }), 
                    });
                    fetch(request)
                    .then(response => {
                        submitDiv.classList.remove('loading')
                        submitButton.value = "Update"
                        if (response.ok) {
                            window.location.replace('#/my/adverts')
                        } else {
                            response.json().then(data => {
                                if (response.status == 400) {
                                    errorMessage.classList.remove('hidden')
                                    errorMessage.innerText = data.message
                                } else if (response.status == 500) {
                                    errorMessage.classList.remove('hidden')
                                    errorMessage.innerText = 'Server error'
                                } else {
                                    errorMessage.classList.remove('hidden')
                                    errorMessage.innerText = 'Server error'
                                }
                            })
                        }
                    })
                    .catch(error => {
                        submitDiv.classList.remove('loading')
                        submitButton.value = "Update"
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = 'Network error'
                    })
                } else {
                    errorMessage.classList.remove('hidden')
                    errorMessage.innerText = 'everything must be supplied'
                }
            }
        }
    }
}