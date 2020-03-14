import { sessionManager } from './session.js';

import { HomeComponent, LoginComponent, LogoutComponent, 
    RegisterComponent, ProfileComponent, ProfileSetupStudentComponent, 
    ProfileSetupRecruiterComponent, GeneralComponent,
    DeleteAdvertComponent } from './components.js';

import { loadStudentAdverts, loadRecruiterAdverts, 
    loadAdvert, loadMyAdverts, loadCreateAdvert, 
    loadUpdateAdvert } from './loadFunctions.js';

import { login, logout, register, profileSetupStudent,
    profileSetupRecruiter, createAdvert, 
    deleteAdvert, updateAdvert } from './submitFunctions.js';

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