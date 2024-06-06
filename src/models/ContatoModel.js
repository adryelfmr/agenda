const mongoose = require('mongoose')
const validator = require('validator')



const ContatoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    sobrenome: { type: String, required: false },
    telefone: { type: String, required: false },
    email: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
})

const ContatoModel = mongoose.model('Contato', ContatoSchema)

class Contato {
    constructor(body) {
        this.body = body
        this.errors = []
        this.contato = {}
    }

    async add() {
        this.validator()
        await this.contactExists()
        if (this.errors.length > 0) return
        this.contato = await ContatoModel.create(this.body)
    }

    async contactExists() {
        this.contato.email = await ContatoModel.findOne({ email: this.body.email })
        this.contato.telefone = await ContatoModel.findOne({ telefone: this.body.telefone })
        if (this.contato.email && this.contato.telefone) {
            this.errors.push('O telefone e email já existem')
            return
        } else if (this.contato.email) {
            this.errors.push('O email já existe')
            return
        } else if (this.contato.telefone) {
            this.errors.push('O telefone já existe')
            return
        }
    }
    validator() {
        // this.cleanUp()

        if (!this.body.nome) this.errors.push('Seu contato deve conter um nome')
        if (!this.body.telefone && !validator.isEmail(this.body.email)) {
            this.errors.push('Pelo menos uma forma de contato deve ser adicionada!(Telefone ou email)')
        }
    }


    // cleanUp() {
    //     for(const key in this.body) {
    //         if(typeof this.body[key] !== 'string') {
    //           this.body[key] = '';
    //         }
    //       }

    //     this.body = {
    //         nome: this.body.nome,
    //         sobrenome: this.body.sobrenome,
    //         telefone: this.body.telefone,
    //         email: this.body.email
    //     }
    // }
    async buscaContatos() {
        const contatos = await ContatoModel.find()
            .sort({ createdAt: -1 })
        return contatos
    }

    async buscaPorId(id){
        const contato = await ContatoModel.findById(id)
        return contato

    }

    async delete(id){
        
        await ContatoModel.findByIdAndDelete(id)
    }

    async editEdit(id){
        const contato = await ContatoModel.findByIdAndUpdate(id, this.body, { new: true })
        return contato
    }
    
}


module.exports = Contato