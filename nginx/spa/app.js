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

const ProfileSetupComponent = {
    render: () => {
        return `
            <section>
                <h1>Page Profile setup</h1>
                <p>This is just a test</p>
            </section>
        `;
    }
} 

const PositionsComponent = {
    render: () => {
        return `
            <section>
                <h1>Page Positions</h1>
                <p>This is just a test</p>
            </section>
        `;
    }
}

const StudentAdvertsComponent = {
    render: () => {
        return `
            <section>
                <h1>Page student-adverts</h1>
                <p>This is just a test</p>
            </section>
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
    { path: '/profile/setup', component: ProfileSetupComponent, },
    { path: '/positions', component: PositionsComponent, },
    { path: '/student-adverts', component: StudentAdvertsComponent, },
];

const authRequiredRoutes = [
    '/profile',
    '/profile/setup',
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

function login() {
    const username = document.getElementById('usernameInput');
    const password = document.getElementById('passwordInput');

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
            return response.json()
        } else {
            return response.json()
        }
    })
    .then(data => {
        if (data.error) {
            if (data.route) {
                sessionManager.setAuthToken(data.access_token)
                sessionManager.setIdToken(data.id_token)
                sessionManager.setRegisterdInfoValue(false)
                window.location.replace('#/profile/setup')
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
    .catch(error => console.log(error))
}

function register() {
    const username = document.getElementById('usernameInput');
    const password = document.getElementById('passwordInput');
    const email = document.getElementById('emailInput')
    const optionUserType = document.getElementById('optionInput')
    const userType = optionUserType.options[optionUserType.selectedIndex].value;

    const registerUrl = url + '/users'
    // create request object
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
            return response.json()
        } else {
            return response.json()
        }
    })
    .then(data => {
        console.log(data)
    })
    .catch(error => console.log(error))
}

function logout() {
    sessionManager.setIdToken(null)
    sessionManager.setAuthToken(null)
    window.location.replace('#/');
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