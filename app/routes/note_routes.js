var ObjectID = require('mongodb').ObjectId;

module.exports = function(app, db) {
    app.get('/notes:id', (req, res) => {
        const id = req.params.id;
        const details = {id: new ObjectID(id)};
        db.db('notable').collection('notes').findOne(details, (err, item) => {
            if(err) res.send({'error': 'An error has occured'});
            else {
                res.send(item);
            }
        });
    });

    app.delete('/notes:id', (req, res) => {
        const id = req.params.id;
        const details = {id: new ObjectID(id)};
        db.db('notable').collection('notes').remove(details, (err, item) => {
            if(err) res.send({'error': 'An error has occured'});
            else {
                res.send('Note' + id + ' deleted');
            }
        });
    });

    app.put('/notes:id', (req, res) => {
        const id = req.params.id;
        const details = {id: new ObjectID(id)};
        const note = {text: req.body.body, title: req.body.title};
        db.db('notable').collection('notes').update(details, note, (err, item) => {
            if(err) res.send({'error': 'An error has occured'});
            else {
                res.send(item);
            }
        });
    });

    app.post('/notes', (req, res) => {
        const note = {text: req.body.body, title: req.body.title};
        db.db('notable').collection('notes').insert(note, (err, result) => {  
            if(err) res.send({'error': 'An error has occured'});
            else {
                res.send(result.ops[0]);
            }
        })
    })
}