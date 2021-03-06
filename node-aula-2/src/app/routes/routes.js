const db = require('../../config/database');
const StockDao = require('../infra/stock-dao');

module.exports = (app) => {

    app.get('/', (req, resp) => {
        resp.send(`
            <html>
                <head>
                    <title>Stocks Motion</title>
                </head>
                <body>
                    <h1>Stocks Rocks!</h1>
                </body>
            </html>
        `);
    });

    app.get('/stocks', (req, resp) => {
        
        const dao = new StockDao(db);

        dao.list()
        .then(stocks => resp.marko(
            require('../views/portifolio/portifolio.marko'),
            { stocks }
        ))
        .cath(err => console.error(err));
    });

    
    app.get('/stocks/buy', (req, resp) => {
        resp.marko(require('../views/portifolio/new.marko'));
    });

    app.post('/carteira', (req, res) => {
        console.log(req.body);
        const dao = new StockDao();
        dao.add(req.body)
            .then(res.redirect('/carteira'))
            .catch(err => console.error(err));
    });

}
