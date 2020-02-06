const db = require('./db')

exports.createStudentInfo = function(studentInfo, callback) {

	const query = `INSERT INTO Students (account_id, first_name, last_name, birth_date, biography_text, school, program, graduation_year, resume_url, profile_pic_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
	const values = [studentInfo.id, studentInfo.first_name, studentInfo.last_name, studentInfo.birth_date, studentInfo.biography_text, studentInfo.school, studentInfo.program, studentInfo.graduation_year, studentInfo.resume_url, studentInfo.profile_pic_url]
	
	db.query(query, values, function(error, objec){
		if (error) {
            console.log(error)
            // check error to send back a application error
			callback('databaseError', null)
		} else {
            console.log(objec)
			callback(null, true)
		}
	})
}

exports.createRecruiterInfo = function(recruiterInfo, callback) {

	const query = `INSERT INTO Recruiter (account_id, first_name, last_name, phone_number, company_name, company_logo_url) VALUES (?, ?, ?, ?, ?, ?)`
	const values = [recruiterInfo.id, recruiterInfo.first_name, recruiterInfo.last_name, recruiterInfo.phone_number, recruiterInfo.company_name, recruiterInfo.company_logo_url ]
	
	db.query(query, values, function(error, objec){
		if (error) {
            console.log(error)
            // check error to send back a application error
			callback('databaseError', null)
		} else {
            console.log(objec)
			callback(null, true)
		}
	})
}