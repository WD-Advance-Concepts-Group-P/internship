const mysql = require('mysql')

class DatabaseHandler {
    constructor(host, user, password, database) {
        this.connection = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        })
    }


    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, function(error, results, fields) {
                if (error) {
                    reject(error)
                } else {
                    resolve({ id: results.insertId })
                }
            })
        })
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, function(error, results, fields) {
                if (error) {
                    reject(error)
                } else {
                    resolve(results[0])
                }
            })
        })
    }
  
    all(sql, params = []) {
      return new Promise((resolve, reject) => {
        this.connection.query(sql, params, function(error, results, fields) {
          if (error)
            reject(error);
          else
            resolve(results);
        })
      })
    }
  }
  
  module.exports = DatabaseHandler;