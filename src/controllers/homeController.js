const Contato = require('../models/ContatoModel')

exports.index =  (req, res) => {
    // const contatos = 
    // if(req.session.user) {
    //     req.session.save(function(){
    //         res.redirect('/contato/index/<% contato')
    //     })
    // }
    res.render('index')
}