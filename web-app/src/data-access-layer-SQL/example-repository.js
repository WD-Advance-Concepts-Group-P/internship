class ExampleRepository {
	constructor(dbh) {
		this.dbh = dbh
    }
    
    createTable() {
        const sql = `CREATE TABLE Table (
            id INT AUTO_INCREMENT PRIMARY KEY,
            created_at DATE NOT NULL,
            updated_at DATE)`
        
        return this.dbh.run(sql)
    }

	create(params) {
        const sql = `INSERT INTO Table (params) VALUES (values)`

        const values = [params]

        return this.dbh.run(sql, values)
	}
	
	update(params) {
        const sql = `UPDATE Table SET params = ? WHERE id = ?`

        const values = [
            params.value,
            params.id
        ]

        return this.dbh.run(sql, values)
	}

    delete(id) {
        const sql = `DELETE FROM Table WHERE id = ?`

        return this.dbh.run(sql, [id])
	}
	
    getById(id) {
        const sql = `SELECT * FROM Table WHERE id = ?`

        return this.dbh.get(sql, [id])
	}

    getAll() {
        const sql = `SELECT * FROM Table`

        return this.dbh.all(sql)
    }

    count() {
        const sql = 'SELECT COUNT(*) FROM Table'

        return this.dbh.all(sql)
    }
}

module.exports = ExampleRepository