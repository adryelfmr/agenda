const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
    constructor(body) {
        this.body = body
        this.errors = []
        this.user = null
    }

    async login() {
        this.validator()
        await this.userLogin()

    }

    async logout(){
        
    }

    async register() {
        this.validator()
        await this.userExists()
        if (this.errors.length > 0) return

        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)
        this.user = await LoginModel.create(this.body)


    }

    async userLogin() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        
        // Se o usuário não for encontrado ou a senha estiver incorreta
        if (!this.user || !bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push("Usuário ou senha incorreto");
            
        }
    }



    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email })
        if (this.user) {
            this.errors.push("Usuário já cadastrado")
        }
    }


    validator() {
        this.cleanUp()
        if (!validator.isEmail(this.body.email)) this.errors.push('Insira um email válido')
        if (this.body.password.length < 4 || this.body.password.length > 50) this.errors.push("A senha deve conter entre 4 e 50 caracteres")

    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] !== "string") {
                this.body[key] = ""
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }

    }


}

module.exports = Login