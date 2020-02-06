class StudentAdvertRepository {
    constructor(dbh) {
        this.dbh = dbh
    }

    createTable() {
        const sql = `CREATE TABLE StudentAdverts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title TEXT NOT NULL,
            body TEXT NOT NULL,
            field VARCHAR(120) NOT NULL,
            contact VARCHAR(120) NOT NULL,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            posted_by INT NOT NULL,
            created_at DATE NOT NULL,
            updated_at DATE,
            FOREIGN KEY (posted_by) REFERENCES Accounts(id));`
        
        return this.dbh.run(sql)
    }

    create(title, body, field, contact, startDate, endDate, postedBy) {
        const sql = `INSERT INTO StudentAdverts (
            title,
            body,
            field,
            contact,
            start_date,
            end_date,
            posted_by,
            created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`

        const values = [title, body, field, contact, startDate, endDate, postedBy]

        return this.dbh.run(sql, values)
    }

    update(advert) {
        const sql = `UPDATE StudentAdverts 
            SET title = ?, body = ?, field = ?, contact = ?, start_date = ?, end_date = ?, updated_at = GETDATE()
            WHERE id = ?`

        const values = [
            advert.title, 
            advert.body, 
            advert.field, 
            advert.contact, 
            advert.start_date, 
            advert.end_date, 
            advert.id
        ]

        return this.dbh.run(sql, values)
    }

    delete(id) {
        const sql = `DELETE FROM StudentAdverts
            WHERE id = ?`

        return this.dbh.run(sql, [id])
    }

    getById(id) {
        const sql = `SELECT * FROM StudentAdverts WHERE id = ?`

        return this.dbh.get(sql, [id])
    }

    getAll() {
        const sql = `SELECT * FROM StudentAdverts`

        return this.dbh.all(sql)
    }

    count() {
        const sql = 'SELECT COUNT(*) FROM StudentAdverts'

        return this.dbh.all(sql)
    }
}

module.exports = StudentAdvertRepository;