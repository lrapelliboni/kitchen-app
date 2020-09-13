const MongoClient = require('mongodb').MongoClient;
var connectionString = "mongodb+srv://kitchen-user:VPM2djDmpaDa8mo8@cluster0.nqxny.mongodb.net/kitchen-db?retryWrites=true&w=majority";
ObjectId = require('mongodb').ObjectID;
module.exports = {
    async new(req, res) {
        res.render('form.ejs', {});
    },
    async index(req, res) {
        MongoClient.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(client => {
            const db = client.db('kitchen-db');
            db.collection('menus').find().toArray().then(results => {
                console.log(results);
                res.render('index.ejs', { menus: results });
            })
        });
    },
    async getById(req, res) {
        console.log("choice id is " + req.params.id);
        MongoClient.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(client => {
            const db = client.db('kitchen-db');
            let menusCollection = db.collection('menus');
            menusCollection.findOne({ _id: ObjectId(req.params.id) }).then(result => {
                res.render('current.ejs', { menu: result, showButton: true });
            })
        });
    },
    async getFromNow(req, res) {
        MongoClient.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(client => {

            const db = client.db('kitchen-db');
            let menusCollection = db.collection('menus');
            console.log(new Date().toISOString().slice(0, 10));
            let nowDate = new Date().toISOString().slice(0, 10).toString();
            menusCollection.findOne({
                "startDate": { "$lte": nowDate },
                "endDate": { "$gte": nowDate }
            }).then(result => {
                res.render('current.ejs', { menu: result, showButton: false });
            });
        });
    },
    /**
     *  Open edit Form
     */
    async edit(req, res) {
        console.log("choice id is " + req.params.id);
        MongoClient.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(client => {
            const db = client.db('kitchen-db');
            let menusCollection = db.collection('menus');
            menusCollection.findOne({ _id: ObjectId(req.params.id) }).then(result => {
                res.render('edit.ejs', { menu: result });
            })
        });
    },
    async update(req, res) {
        MongoClient.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(client => {
            const db = client.db('kitchen-db');
            let menusCollection = db.collection('menus');
            console.log(req.body);
            menusCollection.findOneAndUpdate(
                { _id: ObjectId(req.body.id) },
                {
                    $set: req.body
                },
                {
                    upsert: true
                }
            ).then(result => {
                console.log(result);
                res.redirect('/');                
            }).catch(error => console.error(error))
        });
    },
    async save(req, res) {
        MongoClient.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(client => {
            const db = client.db('kitchen-db');
            let menusCollection = db.collection('menus');
            menusCollection.insertOne(req.body).then(result => {
                console.log(result);
                res.redirect('/');
            }).catch(error => console.error(error))
        });
    },
    async delete(req, res) {
        MongoClient.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(client => {
            const db = client.db('kitchen-db');
            let menusCollection = db.collection('menus');
            menusCollection.deleteMany({
                "_id": {
                    $in: [
                        ObjectId(req.body.id)
                    ]
                }
            }).then(result => {
                res.json(`Cardápio removido com sucesso`)
            }).catch(error => console.error(error));
        });
    }
}