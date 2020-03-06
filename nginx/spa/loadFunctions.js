/*
* Load functions
* functions that run before display to get data from
* the api to display on the page.
* Load functions below
*/
import { sessionManager } from './session.js';

const url = 'http://localhost:8080/api/v1';

export function loadStudentAdverts() {
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
                    for (var i in data.advert) {
                        const div = document.createElement('div');
                        div.innerHTML = `
                            <div class="card">
                                <div class="columns">
                                    <div class="column col-1"></div>
                                    <h2 class="column col-8"><a href="#/advert?id=`+ data.advert[i].id +`&type=student">`+ data.advert[i].title +`</a></h2>
                                    <div class="column col-3"></div>
                                </div>
                                <div class="columns">
                                    <div class="colum col-1"></div>
                                    <p class="column col-2">Field: `+ data.advert[i].field +`</p>
                                    <p class="column col-3">Contact: `+ data.advert[i].contact +`</p>
                                    <div class="column col-6">Dates: `+ data.advert[i].start_date.slice(0, 10) +` - `+ data.advert[i].end_date.slice(0, 10) +`</div>
                                </div>
                                <div class="card-body" id="card-content">
                                    <p>Description:</p>
                                    `+ data.advert[i].body +`
                                </div>
                            </div>
                            <br>
                        `
                        advertArea.appendChild(div)
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
        errorMessage.classList.remove('hidden')
        errorMessage.innerText = 'Network error'
    })
}

export function loadRecruiterAdverts() {
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
                    for (var i in data.advert) {
                        const div = document.createElement('div');
                        div.innerHTML = `
                            <div class="card">
                                <div class="columns">
                                    <div class="column col-1"></div>
                                    <h2 class="column col-7"><a href="#/advert?id=`+ data.advert[i].id +`&type=recruiter">`+ data.advert[i].title +`</a></h2>
                                </div>
                                <div class="columns">
                                    <div class="column col-1"></div>
                                    <p class="column col-3">Field: `+ data.advert[i].field +`</p>
                                    <p class="column col-4">Contact: `+ data.advert[i].contact +`</p>
                                    <p class="column col-3 col-xs-6"><a href="`+ data.advert[i].website +`">`+ data.advert[i].website +`</a></p>
                                    <div class="column col-1"></div>
                                </div>
                                <div class="columns">
                                    <div class="column col-1"></div>
                                    <p class="column col-3 col-xs-6"> Location: `+ data.advert[i].city +`</p>
                                    <p class="column col-3 col-xs-6">postitions: `+ data.advert[i].positions +`</p>
                                    <p class="column col-4 col-xs-6">Last day to apply: `+ data.advert[i].deadline_date.slice(0, 10) +`</p>
                                    <div class="column col-1"></div>
                                </div>
                                <div class="card-body" id="card-content">
                                    <p>Description:</p>
                                    `+ data.advert[i].body +`
                                </div>
                            </div>
                            <br>
                        `
                        advertArea.appendChild(div)
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
        errorMessage.classList.remove('hidden')
        errorMessage.innerText = 'Network error'
    })
}

export function loadAdvert() {
    const query = location.hash.split('?')
    const params = query[1].split('&')

    if (params.length > 2 || params.length < 2) {
        console.log('too few arguments or to many arguments')
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
            console.log('something is null')
        } else {
            const advertUrl = url+'/adverts/'+id+'?type='+type+''
            const request = new Request(advertUrl, {
                method: 'GET'
            });
            fetch(request)
            .then(response => {
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
                                            <h2 class="column col-8">`+ data.advert.title +`</h2>
                                            <div class="column col-3"></div>
                                        </div>
                                        <div class="columns">
                                            <div class="colum col-1"></div>
                                            <p class="column col-2">Field: `+ data.advert.field +`</p>
                                            <p class="column col-3">Contact: `+ data.advert.contact +`</p>
                                            <div class="column col-6">Dates: `+ data.advert.start_date.slice(0, 10) +` - `+ data.advert.end_date.slice(0, 10) +`</div>
                                        </div>
                                        <div class="card-body" id="card-content">
                                            <p>Description:</p>
                                            `+ data.advert.body +`
                                        </div>
                                    </div>
                                    <br>
                                `
                            } else if (type == 'recruiter') {
                                div.innerHTML = `
                                    <div class="card">
                                        <div class="columns">
                                            <div class="column col-1"></div>
                                            <h2 class="column col-7">`+ data.advert.title +`</h2>
                                        </div>
                                        <div class="columns">
                                            <div class="column col-1"></div>
                                            <p class="column col-3">Field: `+ data.advert.field +`</p>
                                            <p class="column col-4">Contact: `+ data.advert.contact +`</p>
                                            <p class="column col-3 col-xs-6"><a href="`+ data.advert.website +`">`+ data.advert.website +`</a></p>
                                            <div class="column col-1"></div>
                                        </div>
                                        <div class="columns">
                                            <div class="column col-1"></div>
                                            <p class="column col-3 col-xs-6"> Location: `+ data.advert.city +`</p>
                                            <p class="column col-3 col-xs-6">postitions: `+ data.advert.positions +`</p>
                                            <p class="column col-4 col-xs-6">Last day to apply: `+ data.advert.deadline_date.slice(0, 10) +`</p>
                                            <div class="column col-1"></div>
                                        </div>
                                        <div class="card-body" id="card-content">
                                            <p>Description:</p>
                                            `+ data.advert.body +`
                                        </div>
                                    </div>
                                    <br>
                                `
                            }
                            advertArea.appendChild(div)
                        }
                    })
                } else {
                    response.json().then(data => {
                        //errorMessage.classList.remove('hidden')
                        //errorMessage.innerText = 'Network error'
                    })
                }
            })
            .catch(error => {
                console.log(error)
                //errorMessage.classList.remove('hidden')
                //errorMessage.innerText = 'Network error'
            })
        }
    }
}

export function loadMyAdverts() {
    const advertUrl = url+'/adverts'
    const request = new Request(advertUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+sessionManager.getAuthToken()+'',
        },
    });
    fetch(request)
    .then(response => {
        if (response.ok) {
            response.json().then(data => {
                const advertArea = document.getElementById('advert-area')
                if (data.error == 'true') {
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
                                        <h2 class="comumn col-5">`+ data.advert[i].title +`</h2>
                                        <h4 class="column col-5"><a href="#/delete?id=`+ data.advert[i].id +`&type=student">Delete</a></h4>
                                        <div class="column col-1"></div>
                                    </div>
                                    <div class="columns">
                                        <div class="colum col-1"></div>
                                        <p class="column col-2">Field: `+ data.advert[i].field +`</p>
                                        <p class="column col-3">Contact: `+ data.advert[i].contact +`</p>
                                        <div class="column col-6">Dates: `+ data.advert[i].start_date.slice(0, 10) +` - `+ data.advert[i].end_date.slice(0, 10) +`</div>
                                    </div>
                                    <div class="card-body" id="card-content">
                                        <p>Description:</p>
                                        `+ data.advert[i].body +`
                                    </div>
                                </div>
                                <br>
                            `
                        } else if (sessionManager.getUserType() == 2) {
                            div.innerHTML = `
                                <div class="card">
                                    <div class="columns">
                                        <div class="column col-1"></div>
                                        <h2 class="column col-7"><a href="#/advert?id=`+ data.advert[i].id +`&type=recruiter">`+ data.advert[i].title +`</a></h2>
                                    </div>
                                    <div class="columns">
                                        <div class="column col-1"></div>
                                        <p class="column col-3">Field: `+ data.advert[i].field +`</p>
                                        <p class="column col-4">Contact: `+ data.advert[i].contact +`</p>
                                        <p class="column col-3 col-xs-6"><a href="`+ data.advert[i].website +`">`+ data.advert[i].website +`</a></p>
                                        <div class="column col-1"></div>
                                    </div>
                                    <div class="columns">
                                        <div class="column col-1"></div>
                                        <p class="column col-3 col-xs-6"> Location: `+ data.advert[i].city +`</p>
                                        <p class="column col-3 col-xs-6">postitions: `+ data.advert[i].positions +`</p>
                                        <p class="column col-4 col-xs-6">Last day to apply: `+ data.advert[i].deadline_date.slice(0, 10) +`</p>
                                        <div class="column col-1"></div>
                                    </div>
                                    <div class="card-body" id="card-content">
                                        <p>Description:</p>
                                        `+ data.advert[i].body +`
                                    </div>
                                </div>
                                <br>
                            `
                        }
                        advertArea.appendChild(div)       
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
        errorMessage.classList.remove('hidden')
        errorMessage.innerText = 'Network error'
    })    
}

export function loadCreateAdvert() {
    const advertArea = document.getElementById('advert-area')
    const div = document.createElement('div');
    if (sessionManager.getUserType() == 1) {
        div.innerHTML = `
        <div class="columns col-xl">
            <div class="column col-3"></div>
            <div class="column col-6 col-md-12">
                <h3>Create student advert</h3>
                <div class="hidden toast toast-error" id="errorMessage">
                    test
                </div>
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
                    <div class="form-group">
                        <input class="form-submit column col-12 btn" type="submit" placeholder="Create" value="Create">
                    </div>
                </form>
                <br>
            </div>
            <div class="column col-3"></div>
        </div>
        `
        advertArea.appendChild(div) 
    } else if (sessionManager.getUserType() == 2) {
        div.innerHTML = `
        <div class="columns col-xl">
            <div class="column col-3"></div>
            <div class="column col-6 col-md-12">
                <h3>create recruiter advert</h3>
                <div class="hidden toast toast-error" id="errorMessage">
                    test
                </div>
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
                    <div class="form-group">
                        <input class="form-submit column col-12 btn" type="submit" placeholder="Create" value="Create">
                    </div>
                </form>
                <br>
            </div>
            <div class="column col-3"></div>
        </div>
        `
        advertArea.appendChild(div) 
    }
}