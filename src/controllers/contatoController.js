const Contato = require('../models/ContatoModel')
// const Login = require('../models/LoginModel')

exports.index = async (req, res) => {
    const contato = new Contato();
    const contatos = await contato.buscaContatos()

    res.render('contato', { contatos });
};


exports.register = (req, res) => {
    res.render('contato-register');
}

exports.add = async function (req, res) {
    try {
        const contato = new Contato(req.body)
        await contato.add()

        if (contato.errors.length > 0) {
            req.flash('errors', contato.errors)
            req.session.save(function () {
                return res.redirect('/contatos/register')
            })
            return
        }
        req.flash('success', 'Contato criado com sucesso')
        req.session.save(function () {
            return res.redirect('/contatos/register')
        })
        return
    } catch (e) {
        console.log(e)
        return res.render('404')
    }
}


exports.edit = async (req, res) => {
    try {
        const contatos = new Contato()
        const contato = await contatos.buscaPorId(req.params.id)
        res.render('edit', { contato })
    } catch (e) {
        console.log(e)
        res.render('404')
    }
}

exports.delete = async (req, res) => {
    try {
        const contato = new Contato()
        await contato.delete(req.params.id)
        req.flash('success', 'Contato deletado com sucesso')
        req.session.save(function () {
            res.redirect('/contatos/index')
        })
        return
    } catch (e) {
        console.log(e)
        res.render('404')
    }

    
}

exports.editEdit = async(req, res) => {
    try{
        const contato = new Contato(req.body)
        await contato.editEdit(req.params.id)
        req.flash('success', 'Contato editado com sucesso')
        req.session.save(function () {
            res.redirect('/contatos/index')
        })
        return
    }catch(e){
        console.log(e)
        res.render('404')
    }
}

