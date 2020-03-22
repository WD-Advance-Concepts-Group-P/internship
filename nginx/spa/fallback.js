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

const HomeComponent = {
    render: () => {
        return `
            <div class="columns col-xl">
                <div class="column col-3"></div>
                <div class="column col-6 col-md-12">
                    <h1>Home</h1>
                    <p>Find interns or create internships adverts</p>
                </div>
                <div class="column col-3"></div>
            </div>
        `;
    }
} 

const LoginComponent = {
    render: () => {
        return `
            <div class="columns col-xl">
                <div class="column col-4"></div>
                <div class="column col-4 col-md-12">
                    <h1>Login</h1>
                    <div class="hidden toast toast-error" id="errorMessage">
                        test
                    </div>
                    <form method="POST">
                        <div class="form-group">
                            <label class="form-label" for="usernameInput">Username</label>
                            <input class="form-input column col-12" id="usernameInput" type="text" name="username" placeholder="Username" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="passwordInput">Password</label>
                            <input class="form-input column col-12" id="passwordInput" type="password" name="password" placeholder="Password" required>
                        </div>
                        <div class="form-group" id="loginDiv">
                            <input class="form-submit column col-12 btn" id="loginButton" type="submit" placeholder="Login" value="Login">
                        </div>
                    </form>
                    <br>
                    <div class="divider text-center" data-content="OR"></div>
                    <br>
                    <a href="#/register" class="btn column col-12">Create an Account</a>
                </div>
                <div class="column col-4"></div>
            </div>
        `;
    }
} 

const LogoutComponent = {
    render: () => {
        return `
        <div class="columns col-xl">
            <div class="column col-3"></div>
            <div class="column col-6 col-md-12">
                <h1>Logout</h1>
                <p>If you press the button below you will be signed out</p>
                <form method="POST">
                    <div class="form-group" id="logoutDiv">
                        <input class="btn column col-12" id="logoutButton" type="submit" value="Logout">
                    </div>
                </form>
            </div>
            <div class="column col-3"></div>
        </div>
        `;
    }
} 

const RegisterComponent = {
    render: () => {
        return `
        <div class="columns col-xl">
            <div class="column col-4"></div>
            <div class="column col-4 col-md-12">
                <h1>Register</h1>
                <div class="hidden toast toast-error" id="errorMessage">
                    test
                </div>
                <form action="" method="POST">
                    <div class="form-group">
                        <label class="form-label" for="usernameInput">Username</label>
                        <input class="form-input" id="usernameInput" type="text" name="username" placeholder="Username" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="emailInput">Email</label>
                        <input class="form-input" id="emailInput" type="text" name="email" placeholder="Email" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="passwordInput">Password</label>
                        <input class="form-input" id="passwordInput" type="password" name="password" placeholder="Password" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="option">Account Type</label>
                        <select class="form-select" id="optionInput" name="accountType">
                            <option>Choose an option</option>
                            <option>Student</option>
                            <option>Recruiter</option>
                        </select>
                    </div>
                    <div class="form-group" id="registerDiv">
                        <input class="form-submit column col-12 btn" id="registerButton" type="submit" placeholder="Signup" value="Register">
                    </div>
                </form>
                <br>
                <div class="divider text-center" data-content="OR"></div>
                <br>
                <a href="#/login" class="btn column col-12">Login to your Account</a>
            </div>
            <div class="column col-4"></div>
        </div>
        `;
    }
}

const ProfileComponent = {
    render: () => {
        return `
        <div class="columns col-xl">
            <div class="column col-3"></div>
            <div class="column col-6 col-md-12">
                <h3>Hello dashboard</h3>
                <ul>
                    <li><a href="#/create-advert">Create advert</a></li>
                    <li><a href="#/my/adverts">My adverts</a></li>
                    <li><a href="#/logout">logout</a></li>
                </ul>
            </div>
            <div class="column col-3"></div>
        </div>
        `;
    }
} 

const ProfileSetupStudentComponent = {
    render: () => {
        return `
        <div class="columns col-xl">
            <div class="column col-3"></div>
            <div class="column col-6 col-md-12">
                <h2>Profile setup</h2>
                <div class="hidden toast toast-error" id="errorMessage">
                    test
                </div>
                <form action="" method="POST">
                    <div class="form-group">
                        <label class="form-label" for="firstnameInput">Firstname</label>
                        <input class="form-input" id="firstnameInput" type="text" name="firstname" placeholder="Firstname" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="lastnameInput">Lastname</label>
                        <input class="form-input" id="lastnameInput" type="text" name="lastname" placeholder="Lastname" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="birthdateInput">Birth date (optional)</label>
                        <input class="form-input" id="birthdateInput" type="date" name="birthdate">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="biotextInput">Bio (optional)</label>
                        <textarea class="form-input" id="biotextInput" placeholder="Textarea" rows="3" name="bio"></textarea>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="schoolInput">School (optional)</label>
                        <input class="form-input" id="schoolInput" type="text" name="school" placeholder="School">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="programInput">Program (optional)</label>
                        <input class="form-input" id="programInput" type="text" name="program" placeholder="Program">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="graduationdateInput">graduation date (optional)</label>
                        <input class="form-input" id="graduationdateInput" type="date" name="graduationdate">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="resumeInput">Resume url (optional)</label>
                        <input class="form-input" id="resumeInput" type="url" name="resume" placeholder="Resume url">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="profilepicInput">Profile picture url (optional)</label>
                        <input class="form-input" id="profilepicInput" type="url" name="profilepic" placeholder="Profile Picture Url">
                    </div>
                    <div class="form-group" id="submitDiv">
                        <input class="form-submit column col-12 btn" id="submitButton" type="submit" placeholder="Send" value="Send">
                    </div>
                </form>
                <br>
            </div>
            <div class="column col-3"></div>
        </div>
        `;
    }
} 

const ProfileSetupRecruiterComponent = {
    render: () => {
        return `
        <div class="columns col-xl">
            <div class="column col-3"></div>
            <div class="column col-6 col-md-12">
                <h2>Profile setup</h2>
                <div class="hidden toast toast-error" id="errorMessage">
                    test
                </div>
                <form action="" method="POST">
                    <div class="form-group">
                        <label class="form-label" for="firstnameInput">Firstname</label>
                        <input class="form-input" id="firstnameInput" type="text" name="firstname" placeholder="Firstname" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="lastnameInput">Lastname</label>
                        <input class="form-input" id="lastnameInput" type="text" name="lastname" placeholder="Lastname" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="companynameInput">Company name</label>
                        <input class="form-input" id="companynameInput" type="text" name="companyname" placeholder="Company name" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="phonenumberInput">Phone number (optional)</label>
                        <input class="form-input" id="phonenumberInput" type="tel" name="phonenumber" placeholder="1-(888)-888-8888">
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="companylogoInput">Company logo url (optional)</label>
                        <input class="form-input" id="companylogoInput" type="url" name="companylogo" placeholder="https://test.com/logo.png">
                    </div>
                    <div class="form-group" id="submitDiv">
                        <input class="form-submit column col-12 btn" id="submitButton" type="submit" placeholder="Send" value="Send">
                    </div>
                </form>
                <br>
            </div>
            <div class="column col-3"></div>
        </div>
        `;
    }
}

const GeneralComponent = {
    render: () => {
        return `
        <div class="columns col-xl">
            <div class="column col-1"></div>
            <div class="column col-10 col-md-12">
                <div id="advert-area">
                    <div class="hidden toast toast-error" id="errorMessage">
                        test
                    </div>
                </div>
            </div>
            <div class="column col-1"></div>
        </div>
        `;
    }
}

const DeleteAdvertComponent = {
    render: () => {
        return `
        <div class="columns col-xl">
            <div class="column col-3"></div>
            <div class="column col-6 col-md-12">
                <h2>Profile setup</h2>
                <div class="hidden toast toast-error" id="errorMessage">
                    test
                </div>
                <form action="" method="POST">
                    <div class="form-group" id="submitDiv">
                        <input class="form-submit column col-12 btn" id="submitButton" type="submit" placeholder="Delete" value="Delete">
                    </div>
                </form>
                <br>
            </div>
            <div class="column col-3"></div>
        </div>
        `;
    }
}

const ErrorComponent = {
    render: () => {
        return `
            <div class="columns col-xl">
                <div class="column col-3"></div>
                <div class="column col-6 col-md-12">
                    <h1>Error</h1>
                    <p>Error with application</p>
                </div>
                <div class="column col-3"></div>
            </div>
        `;
    }
}
   
const routes = [
    { path: '/', component: HomeComponent },
    { path: '/login', component: LoginComponent },
    { path: '/logout', component: LogoutComponent },
    { path: '/register', component: RegisterComponent },
    { path: '/profile', component: ProfileComponent },
    { path: '/profile/setup/student', component: ProfileSetupStudentComponent },
    { path: '/profile/setup/recruiter', component: ProfileSetupRecruiterComponent },
    { path: '/positions', component: GeneralComponent },
    { path: '/student-adverts', component: GeneralComponent },
    { path: '/advert', component: GeneralComponent },
    { path: '/create-advert', component: GeneralComponent },
    { path: '/my/adverts', component: GeneralComponent },
    { path: '/delete', component: DeleteAdvertComponent },
    { path: '/update', component: GeneralComponent },
];

const authRequiredRoutes = [
    '/profile',
    '/profile/setup/student',
    '/profile/setup/recruiter',
    '/logout',
    '/my/adverts',
    '/create-advert',
    '/delete',
    '/update'
];

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
    var path = parseLocation();

    const new_path = path.split('?')
    path = new_path[0]

    if (sessionManager.getAuthToken() == null) {
        
        const login = document.getElementById('loginLink')
        const logout = document.getElementById('logoutLink')
        const profile = document.getElementById('profileLink')

        login.classList.remove('hidden')
        logout.classList.add('hidden')
        profile.classList.add('hidden')

        for (var i in authRequiredRoutes) {
            if (path == authRequiredRoutes[i]) {
                window.location.replace('#/login')
            }
        }
    } else {

        const login = document.getElementById('loginLink')
        const logout = document.getElementById('logoutLink')
        const profile = document.getElementById('profileLink')

        login.classList.add('hidden')
        logout.classList.remove('hidden')
        profile.classList.remove('hidden')

        if (path == '/profile/setup/student' && sessionManager.getUserType() != 1) {
            window.location.replace('#/profile/setup/recruiter')
        }

        if (path == '/profile/setup/recruiter' && sessionManager.getUserType() != 2) {
            window.location.replace('#/profile/setup/student')
        }

        if (path == '/create-advert/student' && sessionManager.getUserType() != 1) {
            window.location.replace('#/create-advert/recruiter')
        }

        if (path == '/create-advert/recruiter' && sessionManager.getUserType() != 2) {
            window.location.replace('#/create-advert/student')
        }

        if (sessionManager.getRegisterdInfoValue() == false) {
            if (sessionManager.getUserType() == 1) {
                window.location.replace('#/profile/setup/student')
            } else if (sessionManager.getUserType() == 2) {
                window.location.replace('#/profile/setup/recruiter')
            }
        }

        if (path == '/register' || path == '/login' || path == '/profile') {
            if (sessionManager.getRegisterdInfoValue() == false) {
                window.location.replace('#/profile/setup/student')
            } else {
                window.location.replace('#/profile')
            }
        }
    }

    const { component = ErrorComponent } = findComponentByPath(path, routes) || {};
    document.getElementById('app').innerHTML = component.render();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
window.addEventListener('hashchange', handleLoad);
window.addEventListener('load', handleLoad);

/*
* Handle submit function
*/

function login() {
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

function register() {
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

function logout() {
    const logoutDiv = document.getElementById('logoutDiv')
    const logoutButton = document.getElementById('logoutButton')
    logoutDiv.classList.add('loading')
    logoutButton.value = ""
    sessionManager.destroy()
    window.location.replace('#/');
}

function profileSetupStudent() {
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

function profileSetupRecruiter() {
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

function createAdvert() {
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

function deleteAdvert() {
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

function updateAdvert() {
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

/*
* Load functions
* functions that run before display to get data from
* the api to display on the page.
* Load functions below
*/

function loadStudentAdverts() {
    const loadDiv = document.getElementById('advert-area')

    loadDiv.classList.add('loading')

    const studentAdvertsUrl = url + '/adverts?type=student'
    const request = new Request(studentAdvertsUrl, {
        method: 'GET',
    });
    fetch(request)
    .then(response => {
        loadDiv.classList.remove('loading')
        if (response.ok) {
            response.json().then(data => {
                const advertArea = document.getElementById('advert-area')
                if (data.advert.length == 0) {
                    const div = document.createElement('div');
                    div.innerHTML = '<h3>No adverts</h3>'
                    advertArea.appendChild(div)
                } else {
                    for (var i in data.advert) {
                        const div = document.createElement('div');
                        div.innerHTML = `
                            <div class="card">
                                <div class="columns">
                                    <div class="column col-1"></div>
                                    <h2 class="column col-8"><a href="#/advert?id=`+ data.advert[i].id +`&type=student" id="link"></a></h2>
                                    <div class="column col-3"></div>
                                </div>
                                <div class="columns">
                                    <div class="colum col-1"></div>
                                    <p class="column col-2" id="field"></p>
                                    <p class="column col-3" id="contact"></p>
                                    <div class="column col-6" id="dates"></div>
                                </div>
                                <div class="card-body" id="card-content">
                                </div>
                            </div>
                            <br>
                        `
                        advertArea.appendChild(div)
                        div.querySelector('#link').innerText = data.advert[i].title
                        div.querySelector('#field').innerText = "Field: "+ data.advert[i].field
                        div.querySelector('#contact').innerText = "Contact: "+ data.advert[i].contact
                        div.querySelector('#dates').innerText = "Dates: "+ data.advert[i].start_date.slice(0, 10) +" - "+ data.advert[i].end_date.slice(0, 10)
                        div.querySelector('#card-content').innerText = "Description: \n" + data.advert[i].body
                    }  
                }  
            })
        } else {
            response.json().then(data => {
                errorMessage.classList.remove('hidden')
                errorMessage.innerText = 'Network error'
            })
        }
    })
    .catch(error => {
        loadDiv.classList.remove('loading')
        errorMessage.classList.remove('hidden')
        errorMessage.innerText = 'Network error'
    })
}

function loadRecruiterAdverts() {
    const loadDiv = document.getElementById('advert-area')

    loadDiv.classList.add('loading')

    const recruiterAdvertsUrl = url + '/adverts?type=recruiter'
    const request = new Request(recruiterAdvertsUrl, {
        method: 'GET',
    });
    fetch(request)
    .then(response => {
        loadDiv.classList.remove('loading')
        if (response.ok) {
            response.json().then(data => {
                const advertArea = document.getElementById('advert-area')
                if (data.advert.length == 0) {
                    const div = document.createElement('div');
                    div.innerHTML = '<h3>No adverts</h3>'
                    advertArea.appendChild(div)
                } else {
                    for (var i in data.advert) {
                        const div = document.createElement('div');
                        div.innerHTML = `
                            <div class="card">
                                <div class="columns">
                                    <div class="column col-1"></div>
                                    <h2 class="column col-7"><a href="#/advert?id=`+ data.advert[i].id +`&type=recruiter" id="link"></a></h2>
                                </div>
                                <div class="columns">
                                    <div class="column col-1"></div>
                                    <p class="column col-3" id="field"></p>
                                    <p class="column col-4" id="contact"></p>
                                    <p class="column col-3 col-xs-6"><a href="`+ data.advert[i].website +`" id="websiteLink"></a></p>
                                    <div class="column col-1"></div>
                                </div>
                                <div class="columns">
                                    <div class="column col-1"></div>
                                    <p class="column col-3 col-xs-6" id="location"></p>
                                    <p class="column col-3 col-xs-6" id="positions"></p>
                                    <p class="column col-4 col-xs-6" id="date"></p>
                                    <div class="column col-1"></div>
                                </div>
                                <div class="card-body" id="card-content">
                                </div>
                            </div>
                            <br>
                        `
                        advertArea.appendChild(div)
                        div.querySelector('#link').innerText = data.advert[i].title
                        div.querySelector('#field').innerText = "Field: "+ data.advert[i].field
                        div.querySelector('#contact').innerText = "Contact: "+ data.advert[i].contact
                        div.querySelector('#websiteLink').innerText = data.advert[i].website
                        div.querySelector('#location').innerText = "Location: "+ data.advert[i].city
                        div.querySelector('#positions').innerText = "postitions: "+ data.advert[i].positions
                        div.querySelector('#date').innerText = "Last day to apply: "+ data.advert[i].deadline_date.slice(0, 10)
                        div.querySelector('#card-content').innerText = "Description: \n" + data.advert[i].body
                    }
                }
            })
        } else {
            response.json().then(data => {
                errorMessage.classList.remove('hidden')
                errorMessage.innerText = 'Network error'
            })
        }
    })
    .catch(error => {
        loadDiv.classList.remove('loading')
        errorMessage.classList.remove('hidden')
        errorMessage.innerText = 'Network error'
    })
}

function loadAdvert() {
    const loadDiv = document.getElementById('advert-area')

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
            loadDiv.classList.add('loading')

            const advertUrl = url+'/adverts/'+id+'?type='+type+''
            const request = new Request(advertUrl, {
                method: 'GET'
            });
            fetch(request)
            .then(response => {
                loadDiv.classList.remove('loading')
                if (response.ok) {
                    response.json().then(data => {
                        const advertArea = document.getElementById('advert-area')
                        if (data.error == 'true') {
                            const div = document.createElement('div');
                            div.innerHTML = '<h3>No adverts</h3>'
                            advertArea.appendChild(div)
                        } else {
                            const div = document.createElement('div');
                            if (type == 'student') {
                                div.innerHTML = `
                                    <div class="card">
                                        <div class="columns">
                                            <div class="column col-1"></div>
                                            <h2 class="column col-8" id="title"></h2>
                                            <div class="column col-3"></div>
                                        </div>
                                        <div class="columns">
                                            <div class="colum col-1"></div>
                                            <p class="column col-2" id="field"></p>
                                            <p class="column col-3" id="contact"></p>
                                            <div class="column col-6" id="dates"></div>
                                        </div>
                                        <div class="card-body" id="card-content">
                                        </div>
                                    </div>
                                    <br>
                                `;
                                advertArea.appendChild(div)
                                document.getElementById('title').innerText = data.advert.title
                                document.getElementById('field').innerText = "Field: "+ data.advert.field
                                document.getElementById('contact').innerText = "Contact: "+ data.advert.contact
                                document.getElementById('dates').innerText = "Dates: "+ data.advert.start_date.slice(0, 10) +" - "+ data.advert.end_date.slice(0, 10)
                                document.getElementById('card-content').innerText = "Description: \n" + data.advert.body

                            } else if (type == 'recruiter') {
                                div.innerHTML = `
                                    <div class="card">
                                        <div class="columns">
                                            <div class="column col-1"></div>
                                            <h2 class="column col-7" id="title"></h2>
                                        </div>
                                        <div class="columns">
                                            <div class="column col-1"></div>
                                            <p class="column col-3" id="field"></p>
                                            <p class="column col-4" id="contact"></p>
                                            <p class="column col-3 col-xs-6"><a href="`+ data.advert.website +`" id="websiteLink"></a></p>
                                            <div class="column col-1"></div>
                                        </div>
                                        <div class="columns">
                                            <div class="column col-1"></div>
                                            <p class="column col-3 col-xs-6" id="location"></p>
                                            <p class="column col-3 col-xs-6" id="positions"></p>
                                            <p class="column col-4 col-xs-6" id="dates"></p>
                                            <div class="column col-1"></div>
                                        </div>
                                        <div class="card-body" id="card-content">
                                        </div>
                                    </div>
                                    <br>
                                `;
                                advertArea.appendChild(div)
                                document.getElementById('title').innerText = data.advert.title
                                document.getElementById('field').innerText = "Field: "+ data.advert.field
                                document.getElementById('contact').innerText = "Contact: "+ data.advert.contact
                                document.getElementById('websiteLink').innerText = data.advert.website
                                document.getElementById('location').innerText = "Location: "+ data.advert.city
                                document.getElementById('positions').innerText = "postitions: "+ data.advert.positions
                                document.getElementById('dates').innerText = "Last day to apply: "+ data.advert.deadline_date.slice(0, 10)
                                document.getElementById('card-content').innerText = "Description: \n" + data.advert.body
                            }
                        }
                    })
                } else {
                    response.json().then(data => {
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = 'Network error'
                    })
                }
            })
            .catch(error => {
                loadDiv.classList.remove('loading')
                errorMessage.classList.remove('hidden')
                errorMessage.innerText = 'Network error'
            })
        }
    }
}

function loadMyAdverts() {
    const loadDiv = document.getElementById('advert-area')

    loadDiv.classList.add('loading')

    const advertUrl = url+'/adverts'
    const request = new Request(advertUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+sessionManager.getAuthToken()+'',
        },
    });
    fetch(request)
    .then(response => {
        loadDiv.classList.remove('loading')
        if (response.ok) {
            response.json().then(data => {
                const advertArea = document.getElementById('advert-area')
                if (data.error == 'true' || data.advert.length == 0) {
                    const div = document.createElement('div');
                    div.innerHTML = '<h3>No adverts</h3>'
                    advertArea.appendChild(div)
                } else {
                    for (var i in data.advert) {
                        const div = document.createElement('div');
                        if (sessionManager.getUserType() == 1) {
                            div.innerHTML = `
                                <div class="card">
                                    <div class="columns">
                                        <div class="column col-1"></div>
                                        <h2 class="comumn col-4" id="title"></h2>
                                        <h4 class="column col-3"><a href="#/delete?id=`+ data.advert[i].id +`&type=student">Delete</a></h4>
                                        <h4 class="column col-3"><a href="#/update?id=`+ data.advert[i].id +`&type=student">Update</a></h4>
                                        <div class="column col-1"></div>
                                    </div>
                                    <div class="columns">
                                        <div class="colum col-1"></div>
                                        <p class="column col-2" id="field"></p>
                                        <p class="column col-3" id="contact"></p>
                                        <div class="column col-6" id="dates"></div>
                                    </div>
                                    <div class="card-body" id="card-content">
                                    </div>
                                </div>
                                <br>
                            `;
                            advertArea.appendChild(div)
                            div.querySelector('#title').innerText = data.advert[i].title
                            div.querySelector('#field').innerText = "Field: "+ data.advert[i].field
                            div.querySelector('#contact').innerText = "Contact: "+ data.advert[i].contact
                            div.querySelector('#dates').innerText = "Dates: "+ data.advert[i].start_date.slice(0, 10) +" - "+ data.advert[i].end_date.slice(0, 10)
                            div.querySelector('#card-content').innerText = "Description: \n" + data.advert[i].body

                        } else if (sessionManager.getUserType() == 2) {
                            div.innerHTML = `
                                <div class="card">
                                    <div class="columns">
                                        <div class="column col-1"></div>
                                        <h2 class="comumn col-4" id="title"></h2>
                                        <h4 class="column col-3"><a href="#/delete?id=`+ data.advert[i].id +`&type=recruiter">Delete</a></h4>
                                        <h4 class="column col-3"><a href="#/update?id=`+ data.advert[i].id +`&type=recruiter">Update</a></h4>
                                        <div class="column col-1"></div>
                                    </div>
                                    <div class="columns">
                                        <div class="column col-1"></div>
                                        <p class="column col-3" id="field"></p>
                                        <p class="column col-4" id="contact"></p>
                                        <p class="column col-3 col-xs-6"><a href="`+ data.advert[i].website +`" id="websiteLink"></a></p>
                                        <div class="column col-1"></div>
                                    </div>
                                    <div class="columns">
                                        <div class="column col-1"></div>
                                        <p class="column col-3 col-xs-6" id="location"></p>
                                        <p class="column col-3 col-xs-6" id="positions"></p>
                                        <p class="column col-4 col-xs-6" id="dates"></p>
                                        <div class="column col-1"></div>
                                    </div>
                                    <div class="card-body" id="card-content">
                                    </div>
                                </div>
                                <br>
                            `;
                            advertArea.appendChild(div)
                            div.querySelector('#title').innerText = data.advert[i].title
                            div.querySelector('#field').innerText = "Field: "+ data.advert[i].field
                            div.querySelector('#contact').innerText = "Contact: "+ data.advert[i].contact
                            div.querySelector('#websiteLink').innerText = data.advert[i].website
                            div.querySelector('#location').innerText = "Location: "+ data.advert[i].city
                            div.querySelector('#positions').innerText = "postitions: "+ data.advert[i].positions
                            div.querySelector('#dates').innerText = "Last day to apply: "+ data.advert[i].deadline_date.slice(0, 10)
                            div.querySelector('#card-content').innerText = "Description: \n" + data.advert[i].body
                        }       
                    }
                }
            })
        } else {
            response.json().then(data => {
                errorMessage.classList.remove('hidden')
                errorMessage.innerText = 'Network error'
            })
        }
    })
    .catch(error => {
        loadDiv.classList.remove('loading')
        errorMessage.classList.remove('hidden')
        errorMessage.innerText = 'Network error'
    })    
}

function loadCreateAdvert() {
    const advertArea = document.getElementById('advert-area')
    const div = document.createElement('div');
    if (sessionManager.getUserType() == 1) {
        div.innerHTML = `
            <div class="column col-12 col-md-12">
                <h3>Create student advert</h3>
                <form action="" method="POST">
                    <input type="hidden" name="_csrf" value="{{csrfToken}}">
                    <div class="form-group">
                        <label class="form-label" for="titleInput">Title</label>
                        <input class="form-input" id="titleInput" type="text" name="title" placeholder="Title" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="bodyInput">Body</label>
                        <textarea class="form-input" id="bodyInput" name="body" placeholder="Textarea" rows="5"></textarea required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="option">Field</label>
                        <select class="form-select" id="option" name="field">
                            <option>Choose an option</option>
                            <option>Tech</option>
                            <option>All</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="contactInput">Contact</label>
                        <input class="form-input" id="contactInput" type="text" name="contact" placeholder="Contact" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="startdateInput">start date</label>
                        <input class="form-input" id="startdateInput" type="date" name="startdate" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="enddateInput">End date</label>
                        <input class="form-input" id="enddateInput" type="date" name="enddate" required>
                    </div>
                    <div class="form-group" id="submitDiv">
                        <input class="form-submit column col-12 btn" id="submitButton" type="submit" placeholder="Create" value="Create">
                    </div>
                </form>
                <br>
            </div>
        `
        advertArea.appendChild(div) 
    } else if (sessionManager.getUserType() == 2) {
        div.innerHTML = `
            <div class="column col-12 col-md-12">
                <h3>create recruiter advert</h3>
                <form action="" method="POST">
                    <input type="hidden" name="_csrf" value="{{csrfToken}}">
                    <div class="form-group">
                        <label class="form-label" for="titleInput">Title</label>
                        <input class="form-input" id="titleInput" type="text" name="title" placeholder="Title" value="" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="bodyInput">Body</label>
                        <textarea class="form-input" id="bodyInput" name="body" placeholder="Textarea" rows="5"></textarea required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="option">Field</label>
                        <select class="form-select" id="option" name="field">
                            <option>Choose an option</option>
                            <option>Tech</option>
                            <option>All</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="cityInput">City</label>
                        <input class="form-input" id="cityInput" type="text" name="city" placeholder="City" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="contactInput">Contact</label>
                        <input class="form-input" id="contactInput" type="text" name="contact" placeholder="Contact" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="websiteInput">Website</label>
                        <input class="form-input" id="websiteInput" type="url" name="website" placeholder="Website" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="positionsInput">Number of positions</label>
                        <input class="form-input" id="positionsInput" type="number" name="positions" placeholder="Number of positions" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="deadlinedateInput">Deadline date</label>
                        <input class="form-input" id="deadlinedateInput" type="date" name="deadline_date" required>
                    </div>
                    <div class="form-group" id="submitDiv">
                        <input class="form-submit column col-12 btn" id="submitButton" type="submit" placeholder="Create" value="Create">
                    </div>
                </form>
                <br>
            </div>
        `
        advertArea.appendChild(div) 
    }
}

function loadUpdateAdvert() {
    const loadDiv = document.getElementById('advert-area')

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
            loadDiv.classList.add('loading')

            const advertUrl = url+'/adverts/'+id+'?type='+type+''
            const request = new Request(advertUrl, {
                method: 'GET'
            });
            fetch(request)
            .then(response => {
                loadDiv.classList.remove('loading')
                if (response.ok) {
                    response.json().then(data => {
                        const advertArea = document.getElementById('advert-area')
                        if (data.error == 'true') {
                            const div = document.createElement('div');
                            div.innerHTML = '<h3>No adverts</h3>'
                            advertArea.appendChild(div)
                        } else {
                            const div = document.createElement('div');
                            if (type == 'student') {
                                div.innerHTML = `
                                <div class="column col-12 col-md-12">
                                    <h3>Update student advert</h3>
                                    <form action="" method="POST">
                                        <input type="hidden" name="_csrf" value="{{csrfToken}}">
                                        <div class="form-group">
                                            <label class="form-label" for="titleInput">Title</label>
                                            <input class="form-input" id="titleInput" type="text" name="title" placeholder="Title" value="`+ data.advert.title +`" required>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label" for="bodyInput">Body</label>
                                            <textarea class="form-input " id="bodyInput" name="body" placeholder="Textarea" rows="5">`+ data.advert.body +`</textarea required>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label" for="option">Field</label>
                                            <select class="form-select" id="option" name="field" value="`+ data.advert.field +`">
                                                <option>Choose an option</option>
                                                <option>Tech</option>
                                                <option>All</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label" for="contactInput">Contact</label>
                                            <input class="form-input" id="contactInput" type="text" name="contact" placeholder="Contact" value="`+ data.advert.contact +`" required>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label" for="startdateInput">start date</label>
                                            <input class="form-input" id="startdateInput" type="date" name="startdate" value="`+ data.advert.start_date +`" required>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label" for="enddateInput">End date</label>
                                            <input class="form-input" id="enddateInput" type="date" name="enddate" value="`+ data.advert.end_date +`" required>
                                        </div>
                                        <div class="form-group" id="submitDiv">
                                            <input class="form-submit column col-12 btn" id="submitButton" type="submit" placeholder="Update" value="Update">
                                        </div>
                                    </form>
                                    <br>
                                </div>
                                `
                            } else if (type == 'recruiter') {
                                div.innerHTML = `
                                <div class="column col-12 col-md-12">
                                    <h3>Update recruiter advert</h3>
                                    <form action="" method="POST">
                                        <div class="form-group">
                                            <label class="form-label" for="titleInput">Title</label>
                                            <input class="form-input" id="titleInput" type="text" name="title" placeholder="Title" value="`+ data.advert.title +`" required>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label" for="bodyInput">Body</label>
                                            <textarea class="form-input" id="bodyInput" name="body" placeholder="Textarea" rows="5">`+ data.advert.body +`</textarea required>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label" for="option">Field</label>
                                            <select class="form-select" id="option" name="field" value="`+ data.advert.field +`">
                                                <option>Choose an option</option>
                                                <option>Tech</option>
                                                <option>All</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label" for="cityInput">City</label>
                                            <input class="form-input" id="cityInput" type="text" name="city" placeholder="City" value="`+ data.advert.city +`" required>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label" for="contactInput">Contact</label>
                                            <input class="form-input" id="contactInput" type="text" name="contact" placeholder="Contact" value="`+ data.advert.contact +`" required>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label" for="websiteInput">Website</label>
                                            <input class="form-input " id="websiteInput" type="url" name="website" placeholder="Website" value="`+ data.advert.website +`" required>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label" for="positionsInput">Number of positions</label>
                                            <input class="form-input " id="positionsInput" type="number" name="positions" placeholder="Number of positions" value="`+ data.advert.positions +`" required>
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label" for="deadlinedateInput">Deadline date</label>
                                            <input class="form-input " id="deadlinedateInput" type="date" name="deadline_date" value="`+ data.advert.deadline_date.slice(0, 10) +`" required>
                                        </div>
                                        <div class="form-group" id="submitDiv">
                                            <input class="form-submit column col-12 btn" id="submitButton" type="submit" placeholder="Update" value="Update">
                                        </div>
                                    </form>
                                    <br>
                                </div>
                                `
                            }
                            advertArea.appendChild(div)
                        }
                    })
                } else {
                    response.json().then(data => {
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = 'Network error'
                    })
                }
            })
            .catch(error => {
                loadDiv.classList.remove('loading')
                errorMessage.classList.remove('hidden')
                errorMessage.innerText = 'Network error'
            })
        }
    }
}

function handleLoad() {
    var page = parseLocation()
    const new_path = page.split('?')
    page = new_path[0]
    switch(page) {
        case '/student-adverts':
            loadStudentAdverts()
            break;
        case '/positions':
            loadRecruiterAdverts()
            break;
        case '/advert':
            loadAdvert()
            break;              
        case '/my/adverts':
            loadMyAdverts()
            break;
        case '/create-advert':
            loadCreateAdvert()
            break;
        case '/update':
            loadUpdateAdvert();
            break;
        default:
            // code block
    }
}

function handleSubmit() {
    var page = parseLocation()
    const new_path = page.split('?')
    page = new_path[0]
    switch(page) {
        case '/login':
            login()
            break;
        case '/logout':
            logout()
            break;
        case '/register':
            register()
            break;              
        case '/profile/setup/student':
            profileSetupStudent()
            break;
        case '/profile/setup/recruiter':
            profileSetupRecruiter()
            break;
        case '/create-advert':
            createAdvert()
            break;
        case '/delete':
            deleteAdvert()
            break;
        case '/update':
            updateAdvert()
            break;
        default:
            // code block
    }
}

document.addEventListener('DOMContentLoaded', function(e) {
    document.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSubmit()
    }, false)
}, false)