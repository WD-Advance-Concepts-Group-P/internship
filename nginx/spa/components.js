export const HomeComponent = {
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

export const LoginComponent = {
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

export const LogoutComponent = {
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

export const RegisterComponent = {
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

export const ProfileComponent = {
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

export const ProfileSetupStudentComponent = {
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

export const ProfileSetupRecruiterComponent = {
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
                    <input type="hidden" name="_csrf" value="{{csrfToken}}">
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

export const PositionsComponent = {
    render: () => {
        return `
        <div class="columns col-xl">
            <div class="column col-1"></div>
            <div class="column col-10 col-md-12">
                <h3>View Recruiter adverts</h3>
                <div class="hidden toast toast-error" id="errorMessage">
                    test
                </div>
                <div id="advert-area"></div>
            </div>
            <div class="column col-1"></div>
        </div>
        `;
    }
}

export const StudentAdvertsComponent = {
    render: () => {
        return `
        <div class="columns col-xl">
            <div class="column col-1"></div>
            <div class="column col-10 col-md-12">
                <h3>View student adverts</h3>
                <div class="hidden toast toast-error" id="errorMessage">
                    test
                </div>
                <div id="advert-area"></div>
            </div>
            <div class="column col-1"></div>
        </div>
        `;
    }
}

export const AdvertComponent = {
    render: () => {
        return `
        <div class="columns col-xl">
            <div class="column col-1"></div>
            <div class="column col-10 col-md-12">
                <h3>View student adverts</h3>
                <div class="hidden toast toast-error" id="errorMessage">
                    test
                </div>
                <div id="advert-area"></div>
            </div>
            <div class="column col-1"></div>
        </div>
        `;
    }
}

export const MyAdvertsComponent = {
    render: () => {
        return `
        <div class="columns col-xl">
            <div class="column col-1"></div>
            <div class="column col-10 col-md-12">
                <h3>View My adverts</h3>
                <div class="hidden toast toast-error" id="errorMessage">
                    test
                </div>
                <div id="advert-area"></div>
            </div>
            <div class="column col-1"></div>
        </div>
        `;
    }
}

export const CreateAdvertComponent = {
    render: () => {
        return `
        <div class="columns col-xl">
            <div class="column col-1"></div>
            <div class="column col-10 col-md-12">
                <div id="advert-area"></div>
            </div>
            <div class="column col-1"></div>
        </div>
        `;
    }
}

export const DeleteAdvertComponent = {
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
                        <input class="form-submit column col-12 btn" type="submit" placeholder="Delete" value="Delete">
                    </div>
                </form>
                <br>
            </div>
            <div class="column col-3"></div>
        </div>
        `;
    }
}

export const ErrorComponent = {
    render: () => {
        return `
            <div class="columns col-xl">
                <div class="column col-3"></div>
                <div class="column col-6 col-md-12">
                    <h1>Error</h1>
                    <p>This is just a test</p>
                </div>
                <div class="column col-3"></div>
            </div>
        `;
    }
}