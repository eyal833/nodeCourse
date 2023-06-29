class UserSymbol {
    constructor (db) {
        this.db = db;
    };

    async add ({userId, symbol}) {
        console.log("userid: " + userId);
        console.log("symbol: "+ symbol);
        return this.db.execute(`
            insert into symbols (user_id, symbol)
            values (?, ?)
        `,[
            userId,
            symbol,
        ]);
    };
    
    async findByUserId ({userId}) {
        console.log("hadpasa: "+userId);
        return this.db.execute(`
            select * from symbols where user_id = ?
        `,[
            userId,
        ]);    
    };
    
}


module.exports = UserSymbol;