/*
* Load functions
* functions that run before display to get data from
* the api to display on the page.
* Load functions below
*/
import { sessionManager } from './session.js';

const url = 'http://localhost:8080/api/v1';

export function loadStudentAdverts() {
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
                        document.getElementById('link').innerText = data.advert[i].title
                        document.getElementById('field').innerText = "Field: "+ data.advert[i].field
                        document.getElementById('contact').innerText = "Contact: "+ data.advert[i].contact
                        document.getElementById('dates').innerText = "Dates: "+ data.advert[i].start_date.slice(0, 10) +" - "+ data.advert[i].end_date.slice(0, 10)
                        document.getElementById('card-content').innerText = "Description: \n" + data.advert[i].body
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

export function loadRecruiterAdverts() {
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
                        document.getElementById('link').innerText = data.advert[i].title
                        document.getElementById('field').innerText = "Field: "+ data.advert[i].field
                        document.getElementById('contact').innerText = "Contact: "+ data.advert[i].contact
                        document.getElementById('websiteLink').innerText = data.advert[i].website
                        document.getElementById('location').innerText = "Location: "+ data.advert[i].city
                        document.getElementById('positions').innerText = "postitions: "+ data.advert[i].positions
                        document.getElementById('date').innerText = "Last day to apply: "+ data.advert[i].deadline_date.slice(0, 10)
                        document.getElementById('card-content').innerText = "Description: \n" + data.advert[i].body
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

export function loadAdvert() {
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
                                            <div class="column col-6 id="dates"></div>
                                        </div>
                                        <div class="card-body" id="card-content">
                                        </div>
                                    </div>
                                    <br>
                                `
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
                                `
                                advertArea.appendChild(div)
                                document.getElementById('title').innerText = data.advert.title
                                document.getElementById('field').innerText = "Field: "+ data.advert.field
                                document.getElementById('contact').innerText = "Contact: "+ data.advert.contact
                                document.getElementById('websiteLink').innerText = data.advert.website
                                document.getElementById('location').innerText = "Location: "+ data.advert.city
                                document.getElementById('positions').innerText = "postitions: "+ data.advert.positions
                                document.getElementById('date').innerText = "Last day to apply: "+ data.advert.deadline_date.slice(0, 10)
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

export function loadMyAdverts() {
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
                            `
                            advertArea.appendChild(div)
                            document.getElementById('title').innerText = data.advert[i].title
                            document.getElementById('field').innerText = "Field: "+ data.advert[i].field
                            document.getElementById('contact').innerText = "Contact: "+ data.advert[i].contact
                            document.getElementById('dates').innerText = "Dates: "+ data.advert[i].start_date.slice(0, 10) +" - "+ data.advert[i].end_date.slice(0, 10)
                            document.getElementById('card-content').innerText = "Description: \n" + data.advert[i].body

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
                                        <p class="column col-4 col-xs-6" id="date"></p>
                                        <div class="column col-1"></div>
                                    </div>
                                    <div class="card-body" id="card-content">
                                    </div>
                                </div>
                                <br>
                            `
                            advertArea.appendChild(div)
                            document.getElementById('title').innerText = data.advert[i].title
                            document.getElementById('field').innerText = "Field: "+ data.advert[i].field
                            document.getElementById('contact').innerText = "Contact: "+ data.advert[i].contact
                            document.getElementById('websiteLink').innerText = data.advert[i].website
                            document.getElementById('location').innerText = "Location: "+ data.advert[i].city
                            document.getElementById('positions').innerText = "postitions: "+ data.advert[i].positions
                            document.getElementById('date').innerText = "Last day to apply: "+ data.advert[i].deadline_date.slice(0, 10)
                            document.getElementById('card-content').innerText = "Description: \n" + data.advert[i].body
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

export function loadCreateAdvert() {
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

export function loadUpdateAdvert() {
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