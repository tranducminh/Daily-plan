let config = require("./config.json");

module.exports = {
    getDbConnectionString: function () {
        return `mongodb+srv://${config.database.username}:${config.database.password}@nihongo-lcwwz.mongodb.net/${config.database.databaseName}?retryWrites=true`;
    }
}