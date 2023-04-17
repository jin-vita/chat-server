const sql = require('./mysql.js');

const Vitalk = function (vitalk) {
    this.id = vitalk.id;
};

Vitalk.findById = (id, result) => {
    let sqlQuery = `SELECT *
                    FROM users
                    WHERE id = "${id}"`;
    sql.query(sqlQuery, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({kind: "not_found"}, null);
    });
};

Vitalk.getAll = result => {
    let query = `SELECT *
                 FROM users`;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

module.exports = Vitalk;