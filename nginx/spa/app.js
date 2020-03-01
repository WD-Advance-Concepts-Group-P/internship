class Session {
    constructor() {
        this.authToken = null,
        this.idToken = null,
        this.hasRegisteredInfo = null
    }

    getAuthToken() {
        return this.authToken;
    }

    setAuthToken(authToken) {
        this.authToken = authToken;
    }

    getIdToken() {
        return this.idToken;
    }

    setIdToken(idToken) {
        this.idToken = idToken;
    }

    getRegisterdInfoValue() {
        return this.hasRegisteredInfo
    }

    setRegisterdInfoValue(newHasRegisteredInfo) {
        this.hasRegisteredInfo = newHasRegisteredInfo
    }
}

const sessionManager = new Session()
const url = 'http://localhost:8080/api/v1';

const HomeComponent = {
    render: () => {
        return `
            <section>
                <h1>Home</h1>
                <p>This is just a test</p>
            </section>
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
                        <input type="hidden" name="_csrf" value="{{csrfToken}}">
                        <div class="form-group">
                            <label class="form-label" for="usernameInput">Username</label>
                            <input class="form-input column col-12" id="usernameInput" type="text" name="username" placeholder="Username" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="passwordInput">Password</label>
                            <input class="form-input column col-12" id="passwordInput" type="password" name="password" placeholder="Password" required>
                        </div>
                        <div class="form-group">
                            <input class="form-submit column col-12 btn" type="submit" placeholder="Login" value="Login">
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
            <div class="column col-4"></div>
            <div class="column col-4 col-md-12">
                <h1>Logout</h1>
                <p>If you press the button below you will be signed out</p>
                <form method="POST">
                    <input type="hidden" name="_csrf" value="{{csrfToken}}">
                    <div class="form-group">
                        <div class="column col-2"></div>
                        <input class="btn column col-8" type="submit" value="Logout">
                        <div class="column col-2"></div>
                    </div>
                </form>
            </div>
            <div class="column col-4"></div>
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
                    <input type="hidden" name="_csrf" value="{{csrfToken}}">
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
                    <div class="form-group">
                        <input class="form-submit column col-12 btn" type="submit" placeholder="Signup" value="Register">
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
            <section>
                <h1>Page Profile</h1>
                <p>This is just a test</p>
            </section>
        `;
    }
} 

const ProfileSetupStudentComponent = {
    render: () => {
        return `
        <div class="columns col-xl">
            <div class="column col-3"></div>
            <div class="column col-6 col-md-12">
                <h3>Profile setup</h3>
                <form action="" method="POST">
                    <input type="hidden" name="_csrf" value="{{csrfToken}}">
                    <div class="form-group">
                        <label class="form-label" for="firstnameInput">Firstname</label>
                        <input class="form-input {{css_class}}" id="firstnameInput" type="text" name="firstname" placeholder="Firstname" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="lastnameInput">Lastname</label>
                        <input class="form-input {{css_class}}" id="lastnameInput" type="text" name="lastname" placeholder="Lastname" required>
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
                    <div class="form-group">
                        <input class="form-submit column col-12 btn" type="submit" placeholder="Send" value="Send">
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
                <h3>Profile setup</h3>
                <form action="" method="POST">
                    <input type="hidden" name="_csrf" value="{{csrfToken}}">
                    <div class="form-group">
                        <label class="form-label" for="firstnameInput">Firstname</label>
                        <input class="form-input {{css_class}}" id="firstnameInput" type="text" name="firstname" placeholder="Firstname" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label" for="lastnameInput">Lastname</label>
                        <input class="form-input {{css_class}}" id="lastnameInput" type="text" name="lastname" placeholder="Lastname" required>
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
                    <div class="form-group">
                        <input class="form-submit column col-12 btn" type="submit" placeholder="Send" value="Send">
                    </div>
                </form>
                <br>
            </div>
            <div class="column col-3"></div>
        </div>
        `;
    }
}

const PositionsComponent = {
    render: () => {
        return `
        <div class="columns col-xl">
            <div class="column col-3"></div>
            <div class="column col-6 col-md-12">
                <h3>View Recruiter adverts</h3>
                <div id="advert-area"></div>
            </div>
            <div class="column col-3"></div>
        </div>
        `;
    }
}

const StudentAdvertsComponent = {
    render: () => {
        return `
        <div class="columns col-xl">
            <div class="column col-3"></div>
            <div class="column col-6 col-md-12">
                <h3>View student adverts</h3>
                <div id="advert-area"></div>
            </div>
            <div class="column col-3"></div>
        </div>
        `;
    }
}

const ErrorComponent = {
    render: () => {
        return `
            <section>
                <h1>Error</h1>
                <p>This is just a test</p>
            </section>
        `;
    }
}
   
const routes = [
    { path: '/', component: HomeComponent, },
    { path: '/login', component: LoginComponent, },
    { path: '/logout', component: LogoutComponent, },
    { path: '/register', component: RegisterComponent, },
    { path: '/profile', component: ProfileComponent, },
    { path: '/profile/setup/student', component: ProfileSetupStudentComponent, },
    { path: '/profile/setup/recruiter', component: ProfileSetupRecruiterComponent, },
    { path: '/positions', component: PositionsComponent, },
    { path: '/student-adverts', component: StudentAdvertsComponent, },
];

const authRequiredRoutes = [
    '/profile',
    '/profile/setup/student',
    '/profile/setup/recruiter',
    '/logout',
];

const parseLocation = () => location.hash.slice(1).toLowerCase() || '/';

const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
    const path = parseLocation();

    if (sessionManager.getAuthToken() == null) {
        for (i in authRequiredRoutes) {
            if (path == authRequiredRoutes[i]) {
                window.location.replace('#/login')
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

function login() {
    const errorMessage = document.getElementById('errorMessage')
    errorMessage.classList.add('hidden')

    const username = document.getElementById('usernameInput');
    const password = document.getElementById('passwordInput');

    if (password.value.length > 5 && username.value.length > 0) {
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
            if (response.ok) {
                response.json().then(data => {
                    if (data.error) {
                        if (data.route) {
                            sessionManager.setAuthToken(data.access_token)
                            sessionManager.setIdToken(data.id_token)
                            sessionManager.setRegisterdInfoValue(false)
                            if (data.user_type == 1) {
                                window.location.replace('#/profile/setup/student')
                            } else if (data.user_type == 2) {
                                window.location.replace('#/profile/setup/recruiter')
                            }
                        } else {
                            //display error
                            console.log(data)
                        }
                    } else {
                        sessionManager.setAuthToken(data.access_token)
                        sessionManager.setIdToken(data.id_token)
                        sessionManager.setRegisterdInfoValue(true)
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
            console.log('nein')
            console.log(error)
        })
    } else {
        errorMessage.classList.remove('hidden')
        errorMessage.innerText = 'Password must be longer then 6 characters'
    }
}

function register() {
    const errorMessage = document.getElementById('errorMessage')
    errorMessage.classList.add('hidden')

    const username = document.getElementById('usernameInput');
    const password = document.getElementById('passwordInput');
    const email = document.getElementById('emailInput')
    const optionUserType = document.getElementById('optionInput')
    const userType = optionUserType.options[optionUserType.selectedIndex].value;

    if (password.value.length > 5 && username.value.length > 0 && email.value.length > 5 && userType != 'Choose an option') {
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
            if (response.ok) {
                response.json().then(data => {
                    window.location.replace('#/login')
                })
            } else {
                response.json().then(data => {
                    console.log(data)
                    errorMessage.classList.remove('hidden')
                    errorMessage.innerText = data.message
                    /*
                    if (data.error == 'invalid_client') {
                        //display invalid username/password
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = data.message
                    } else {
                        //display generic error
                        errorMessage.classList.remove('hidden')
                        errorMessage.innerText = 'Server error'
                    }*/
                })
            }
        })
        .catch(error => {
            console.log('nein')
            console.log(error)
        })
    } else {
        errorMessage.classList.remove('hidden')
        errorMessage.innerText = 'Password must be longer then 6 characters\nEmail must be supplied\nUsername must be supplied\nAccount type can not be Choose an option'
    }
}

function logout() {
    sessionManager.setIdToken(null)
    sessionManager.setAuthToken(null)
    window.location.replace('#/');
}

function loadStudentAdverts() {
    const studentAdvertsUrl = url + '/adverts?type=student'
    const request = new Request(studentAdvertsUrl, {
        method: 'GET',
    });
    fetch(request)
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                const advertArea = document.getElementById('advert-area')
                if (data.advert.length == 0) {
                    const div = document.createElement('div');
                    div.innerHTML = '<h3>No adverts</h3>'
                    advertArea.appendChild(div)
                } else {
                    for (i in data.advert) {
                        const div = document.createElement('div');
                        div.innerHTML = `
                            <div class="card">
                                <div class="card-header">
                                    <div class="card-title h5"><a>`+ data.advert[i].title +`</a></div>
                                    <div class="card-title h6"><a href="#/advert/`+ data.advert[i].id +`?type=student">Advert</a></div>
                                    <div class="card-subtitle text-gray">
                                        <ul>
                                            <li>`+ data.advert[i].field +`</li>
                                            <li>`+ data.advert[i].contact +`</li>
                                            <li>`+ data.advert[i].start_date +`</li>
                                            <li>`+ data.advert[i].end_date +`</li>
                                            <li>`+ data.advert[i].posted_by +`</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="card-body" id="card-content">
                                    `+ data.advert[i].body +`
                                </div>
                                <br>
                            </div>
                            <br>
                        `
                        advertArea.appendChild(div)
                    }  
                }  
            })
        } else {
            response.json().then(data => {
                console.log(data)
            })
        }
    })
    .catch(error => {
        console.log('nein')
        console.log(error)
    })
}

function loadRecruiterAdverts() {
    console.log('load recruiter adverts')
    const recruiterAdvertsUrl = url + '/adverts?type=recruiter'
    const request = new Request(recruiterAdvertsUrl, {
        method: 'GET',
    });
    fetch(request)
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                const advertArea = document.getElementById('advert-area')
                if (data.advert.length == 0) {
                    const div = document.createElement('div');
                    div.innerHTML = '<h3>No adverts</h3>'
                    advertArea.appendChild(div)
                } else {
                    for (i in data.advert) {
                        const div = document.createElement('div');
                        div.innerHTML = `
                            <div class="card">
                                <div class="card-header">
                                    <div class="card-title h5"><a>`+ data.advert[i].title +`</a></div>
                                    <div class="card-title h6"><a href="#/advert/`+ data.advert[i].id +`?type=student">Advert</a></div>
                                    <div class="card-subtitle text-gray">
                                        <ul>
                                            <li>`+ data.advert[i].field +`</li>
                                            <li>`+ data.advert[i].contact +`</li>
                                            <li>`+ data.advert[i].website +`</li>
                                            <li>`+ data.advert[i].deadline_date +`</li>
                                            <li>`+ data.advert[i].posted_by +`</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="card-body" id="card-content">
                                    `+ data.advert[i].body +`
                                </div>
                                <br>
                            </div>
                            <br>
                        `
                        advertArea.appendChild(div)
                    }
                }
            })
        } else {
            response.json().then(data => {
                console.log(data)
            })
        }
    })
    .catch(error => {
        console.log('nein')
        console.log(error)
    })
}

function handleLoad() {
    const page = parseLocation()
    switch(page) {
        case '/student-adverts':
            loadStudentAdverts()
            break;
        case '/positions':
            loadRecruiterAdverts()
            break;
        /*case '/register':
            //register()
            break;              
        case '/logout':
            // code block
            break;
        case '/login':
            // code block
            break;
        case '/logout':
            // code block
            break;*/
        default:
            // code block
    }
}

function handleSubmit(page) {
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
        /*case '/logout':
            // code block
            break;
        case '/login':
            // code block
            break;
        case '/logout':
            // code block
            break;*/
        default:
            // code block
    }
}

document.addEventListener('DOMContentLoaded', function(e) {
    document.addEventListener('submit', function(e) {
        e.preventDefault();
        handleSubmit(parseLocation())
    }, false)
}, false)