const express = require('express');
const cors = require('cors');
const UserController = require('./src/controllers/UserController');
const CoffeeRegisterController = require('./src/controllers/CoffeeRegisterController');
const dotenv = require('dotenv')
dotenv.config()

const nodemailer = require('nodemailer')
const SMTP_CONFIG = require('./src/mail/smtp')
const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port, 
    secure: SMTP_CONFIG.secure,
    auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass
    },
    tls: {rejectUnauthorized: false}
})


const connection = require('./src/database/connection');
const app = express();


app.use((req, res, next) => {
    // clientIP = req.connection.remoteAddress)
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
})

app.use(express.json())

const MD5 = function (r) { function n(r, n) { return r << n | r >>> 32 - n } function t(r, n) { var t, o, e, u, f; return e = 2147483648 & r, u = 2147483648 & n, f = (1073741823 & r) + (1073741823 & n), (t = 1073741824 & r) & (o = 1073741824 & n) ? 2147483648 ^ f ^ e ^ u : t | o ? 1073741824 & f ? 3221225472 ^ f ^ e ^ u : 1073741824 ^ f ^ e ^ u : f ^ e ^ u } function o(r, o, e, u, f, i, a) { return r = t(r, t(t(function (r, n, t) { return r & n | ~r & t }(o, e, u), f), a)), t(n(r, i), o) } function e(r, o, e, u, f, i, a) { return r = t(r, t(t(function (r, n, t) { return r & t | n & ~t }(o, e, u), f), a)), t(n(r, i), o) } function u(r, o, e, u, f, i, a) { return r = t(r, t(t(function (r, n, t) { return r ^ n ^ t }(o, e, u), f), a)), t(n(r, i), o) } function f(r, o, e, u, f, i, a) { return r = t(r, t(t(function (r, n, t) { return n ^ (r | ~t) }(o, e, u), f), a)), t(n(r, i), o) } function i(r) { var n, t = "", o = ""; for (n = 0; n <= 3; n++)t += (o = "0" + (r >>> 8 * n & 255).toString(16)).substr(o.length - 2, 2); return t } var a, c, C, g, h, d, v, S, m, l = Array(); for (l = function (r) { for (var n, t = r.length, o = t + 8, e = 16 * ((o - o % 64) / 64 + 1), u = Array(e - 1), f = 0, i = 0; i < t;)f = i % 4 * 8, u[n = (i - i % 4) / 4] = u[n] | r.charCodeAt(i) << f, i++; return f = i % 4 * 8, u[n = (i - i % 4) / 4] = u[n] | 128 << f, u[e - 2] = t << 3, u[e - 1] = t >>> 29, u }(r = function (r) { r = r.replace(/\r\n/g, "\n"); for (var n = "", t = 0; t < r.length; t++) { var o = r.charCodeAt(t); o < 128 ? n += String.fromCharCode(o) : o > 127 && o < 2048 ? (n += String.fromCharCode(o >> 6 | 192), n += String.fromCharCode(63 & o | 128)) : (n += String.fromCharCode(o >> 12 | 224), n += String.fromCharCode(o >> 6 & 63 | 128), n += String.fromCharCode(63 & o | 128)) } return n }(r)), d = 1732584193, v = 4023233417, S = 2562383102, m = 271733878, a = 0; a < l.length; a += 16)c = d, C = v, g = S, h = m, d = o(d, v, S, m, l[a + 0], 7, 3614090360), m = o(m, d, v, S, l[a + 1], 12, 3905402710), S = o(S, m, d, v, l[a + 2], 17, 606105819), v = o(v, S, m, d, l[a + 3], 22, 3250441966), d = o(d, v, S, m, l[a + 4], 7, 4118548399), m = o(m, d, v, S, l[a + 5], 12, 1200080426), S = o(S, m, d, v, l[a + 6], 17, 2821735955), v = o(v, S, m, d, l[a + 7], 22, 4249261313), d = o(d, v, S, m, l[a + 8], 7, 1770035416), m = o(m, d, v, S, l[a + 9], 12, 2336552879), S = o(S, m, d, v, l[a + 10], 17, 4294925233), v = o(v, S, m, d, l[a + 11], 22, 2304563134), d = o(d, v, S, m, l[a + 12], 7, 1804603682), m = o(m, d, v, S, l[a + 13], 12, 4254626195), S = o(S, m, d, v, l[a + 14], 17, 2792965006), d = e(d, v = o(v, S, m, d, l[a + 15], 22, 1236535329), S, m, l[a + 1], 5, 4129170786), m = e(m, d, v, S, l[a + 6], 9, 3225465664), S = e(S, m, d, v, l[a + 11], 14, 643717713), v = e(v, S, m, d, l[a + 0], 20, 3921069994), d = e(d, v, S, m, l[a + 5], 5, 3593408605), m = e(m, d, v, S, l[a + 10], 9, 38016083), S = e(S, m, d, v, l[a + 15], 14, 3634488961), v = e(v, S, m, d, l[a + 4], 20, 3889429448), d = e(d, v, S, m, l[a + 9], 5, 568446438), m = e(m, d, v, S, l[a + 14], 9, 3275163606), S = e(S, m, d, v, l[a + 3], 14, 4107603335), v = e(v, S, m, d, l[a + 8], 20, 1163531501), d = e(d, v, S, m, l[a + 13], 5, 2850285829), m = e(m, d, v, S, l[a + 2], 9, 4243563512), S = e(S, m, d, v, l[a + 7], 14, 1735328473), d = u(d, v = e(v, S, m, d, l[a + 12], 20, 2368359562), S, m, l[a + 5], 4, 4294588738), m = u(m, d, v, S, l[a + 8], 11, 2272392833), S = u(S, m, d, v, l[a + 11], 16, 1839030562), v = u(v, S, m, d, l[a + 14], 23, 4259657740), d = u(d, v, S, m, l[a + 1], 4, 2763975236), m = u(m, d, v, S, l[a + 4], 11, 1272893353), S = u(S, m, d, v, l[a + 7], 16, 4139469664), v = u(v, S, m, d, l[a + 10], 23, 3200236656), d = u(d, v, S, m, l[a + 13], 4, 681279174), m = u(m, d, v, S, l[a + 0], 11, 3936430074), S = u(S, m, d, v, l[a + 3], 16, 3572445317), v = u(v, S, m, d, l[a + 6], 23, 76029189), d = u(d, v, S, m, l[a + 9], 4, 3654602809), m = u(m, d, v, S, l[a + 12], 11, 3873151461), S = u(S, m, d, v, l[a + 15], 16, 530742520), d = f(d, v = u(v, S, m, d, l[a + 2], 23, 3299628645), S, m, l[a + 0], 6, 4096336452), m = f(m, d, v, S, l[a + 7], 10, 1126891415), S = f(S, m, d, v, l[a + 14], 15, 2878612391), v = f(v, S, m, d, l[a + 5], 21, 4237533241), d = f(d, v, S, m, l[a + 12], 6, 1700485571), m = f(m, d, v, S, l[a + 3], 10, 2399980690), S = f(S, m, d, v, l[a + 10], 15, 4293915773), v = f(v, S, m, d, l[a + 1], 21, 2240044497), d = f(d, v, S, m, l[a + 8], 6, 1873313359), m = f(m, d, v, S, l[a + 15], 10, 4264355552), S = f(S, m, d, v, l[a + 6], 15, 2734768916), v = f(v, S, m, d, l[a + 13], 21, 1309151649), d = f(d, v, S, m, l[a + 4], 6, 4149444226), m = f(m, d, v, S, l[a + 11], 10, 3174756917), S = f(S, m, d, v, l[a + 2], 15, 718787259), v = f(v, S, m, d, l[a + 9], 21, 3951481745), d = t(d, c), v = t(v, C), S = t(S, g), m = t(m, h); return (i(d) + i(v) + i(S) + i(m)).toLowerCase() };

async function ckeckCredentials(user, pswd) {
    pswd = MD5(pswd)
    return await connection('adm_tb')
        .where({ userName: user, password: pswd })
        .first()
}

function checkReqBody(reqBody) {
    let whatsMissing = Object.entries(reqBody).filter(data => {
        if (String(data[1]).trim() === "" || !data[1] || data[1] === undefined) {
            return data[0] === "surplus" ? false : data
        }
    })

    if (whatsMissing.length > 0) return true
}

async function sendEmailToCurrentPayer(){
    let currentPayer = await connection("users")
            .where('position', 1)
            .select("email", "name")
            .first()
    
    try{
        await transporter.sendMail({
            from: '"☕ Siscoffee Avisa" <siscoffee-cobranca@pcdf.df.gov.br>', // sender address
            to: currentPayer.email,
            //bcc: "ditec-suportetecnico@pcdf.df.gov.br", // list of receivers
            subject: `${currentPayer.name}, chegou a sua vez!`, // Subject line
            html: `
            <head>
                <link href="http://fonts.cdnfonts.com/css/segoe-ui-4" rel="stylesheet">
                <style>
                @import url('http://fonts.cdnfonts.com/css/segoe-ui-4');
                    #logo{
                        text-decoration: none;
                        font-size: 3em;
                        user-select:none;
                    }
    
                    #logo:active,
                    #logo:focus{
                        color:none;
                    }
                    p{
                        font-family: 'Segoe UI', sans-serif;
                        font-size: 2.5em;
                        color: #F1E5D1;
                        padding: 0;
                        margin: 0;
                    }
                    #userName{
                        color:#f0a82e; 
                    }
                </style>
            </head>
        <body style="background-color: #35373e;">
            <div style="background-color:#35373e;padding: 1em 4em;">
                <div style="text-align:center">
                    <a id="logo" href="http://siscoffeeditec.pcdf.gov.br/#/"> 
                        <span style="color: #F1E5D1; user-select:none">SIS</span><span style="color: #b87446;user-select:none">CØFFEE</span>
                    </a>
    
                    <div style="margin: 2.5em 0 2.5em 0;">
                        <p style="font-size: 2em;">
                            <span id="userName">${currentPayer.name}</span>, ainda temos café,
                            <br>
                            mas está acabando...
                        </p>
                        <img src="http://ditec112805/sad-coffee-bean.png"/>
                        <p style="font-size: 2em;">
                            Colabore com 1kg de café em grãos
                            <br>
                            e não fique sem seu cafezinho diário
                        </p>
                    </div>
    
                    <footer>
                        <p style="font-size: 1.3em">
                            Atenciosamente,
                            <br>
                            Equipe do 
                            <a style="text-decoration:none;" href="http://siscoffeeditec.pcdf.gov.br/#/">
                                <span style="color: #F1E5D1;user-select:none">SIS</span><span style="user-select:none;font-family: 'Segoe UI', sans-serif; color: #b87446">CØFFEE</span>
                            </a>
                        </p>
                    </footer>
                </div>
            </div>
        </body>
                
            `,
            priority: "high",
        });
    } catch(e){
        console.log("\n Falha ao enviar email -> ", e)
    }
}

app.get('/', async function (req, res) {
    const allUsers = await connection('users')
        .orderBy('position', 'asc');
    let showThem = {};

    if (allUsers.length === 2) {
        showThem = {
            theNext: allUsers[1],
            theOne: allUsers[0],
        }
    } else if (allUsers.length === 1) {
        showThem = {
            theOne: allUsers[0]
        }
    } else {
        showThem = {
            theNext: allUsers[1],
            theOne: allUsers[0],
            theLast: allUsers[allUsers.length - 1]
        }
    }

    res.send(showThem);
});

app.get('/users', UserController.list)

//USER
app.post('/create/user', async (req, res) => {
    try {
        const emptyPropertie = checkReqBody(req.body)

        if (emptyPropertie) {
            console.log(`\nCorpo da requisição inválido.`, emptyPropertie)
            return res.status(400).json({
                status: 400,
                message: "Verifique se todos os campos do formulário estão devidamente preenchidos e tente novamente."
            })
        }

        const autenticado = await ckeckCredentials(req.body.admUser, req.body.admPassword);

        if (!autenticado) {
            console.log("\nUsuário e/ou senha da conta administradoras são inválidas.")
            return res.status(401).json({
                status: 401,
                message: "Credenciais inválidas!"
            });
        }

        const { name, section, email, currentDate, surplus } = req.body;

        console.log(`\n\n\n----START\n Cadastrando usuário ${name}.`)

        const created = await UserController.create(name, section, email, currentDate, surplus, res)

        if (created.statusCode !== 201) return

        console.log(`\nCadastro realizado! Prosseguindo com as demais etapas de registro do ${name}...`)

        //registro de compra de café sem utilizar saldo, pois o usuário está sendo criado, surplusID = false
        await CoffeeRegisterController.create(name, currentDate, false)
        console.log(`\nRegistro da primeira compra de café realizado.\n`)

        if (surplus > 0) {
            console.log(`\nCadastrando o saldo de ${surplus} registro(s) do usuário ${name}`)
            //alimentar tabela aqui
            for (i = 0; i != surplus; i++) {
                await connection('surplus_tb')
                    .insert({
                        userName: name,
                        surplusRegisterDate: currentDate,
                    })
            }
        }

        console.log(`\nCadastro de ${name} realizado com um total de ${surplus} registro(s) de saldo.\n----END`)

        return res.status(201).json({
            status: 201,
            message: 'Usuário cadastrado com sucesso!'
        })
    } catch (err) {
        console.log("\nFALHA INTERNO NO SERVIDOR  -> index.js - rota /sign-up ->", err)

        return res.status(500).json({
            status: 500,
            message: "Erro interno no servidor. Favor contatar o admnistrador do sistema."
        })
    }
})

//COFFEE
app.post('/coffeeBought', async function (req, res) {
    try {
        const emptyPropertie = checkReqBody(req.body)

        if (emptyPropertie) {
            console.log(`\nCorpo da requisição inválido.`, emptyPropertie)
            return res.status(400).json({
                status: 400,
                message: "Verifique se todos os campos do formulário estão devidamente preenchidos e tente novamente."
            })
        }

        const autenticado = await ckeckCredentials(req.body.admUser, req.body.admPassword)

        if (!autenticado) {
            console.log("\nUsuário e/ou senha da conta administradoras são inválidas.\n")
            return res.status(401).json({
                status: 401,
                message: "Credenciais inválidas!"
            });
        }

        const { name, currentDate, surplus, useSurplus } = req.body;

        nameExists = await connection('users')
            .where('name', name)
            .first();

        if (!nameExists) {
            console.log("\nUsuário não encontrado.\n")
            return res.status(404).json({
                status: 404,
                message: "Não foi possível identificar o usuário informado."
            });
        }

        const backDate = new Date().toLocaleDateString("pt-br", {
            dateStyle: 'short'
        })

        const date = currentDate

        if (date !== String(backDate)) {
            return res.status(401).json({
                status: 401,
                message: "A data da requisição e do backend diferem!"
            })
        }


        hasSurplus = Object.values(await connection('surplus_tb')
            .where({
                userName: name,
                used: 'false'
            })
        )
        //usuário não possui saldo mas está tentando registrar compra utilizando saldo

        if (hasSurplus.length === 0 && useSurplus === 'true') {
            console.log(`\nUsuário ${name} não possui saldo para ser utilizado!\n`)
            return res.status(401).json({
                status: 401,
                message: 'Não há saldo disponível para uso!'
            })
        }

        const userPosition = Object.values(await connection('users')
            .where('name', name)
            .select('position')
            .first())[0]

        let isAhead = userPosition !== 1 ? 'true' : 'false';

        if(isAhead ==='true' && surplus <= '0'){
            console.log('\n Usuário adiantado e com saldo igual a 0 na requisição')
            return res.status(401).json({
                status: 401,
                message: 'Erro interno no servidor. Favor contatar o admnistrador do sistema.'
            })
        }

        if (isAhead === 'true') {
            console.log(`\n----START\nO usuário ${name} está registrando uma compra adiantada estando na posição ${userPosition}.`)
            if (surplus > 0) {
                console.log(`\nAdicionando ${surplus} de saldo passado ao registrar a compra.\n`)
                await addSurplus(surplus)
            } else {
                console.log(`\nAdicionando 1 de saldo.\n`)
                await addSurplus(1)
            }

        } else if (hasSurplus.length > 0 && useSurplus === 'true') {
            console.log(`----START\nRegistrando compra ${name} utilizando saldo disponível...\n`)
            //resgata o ID de um saldo válido para passá-lo no registro que será feito na tabela coffee_register

            const surplusID = Object.values(
                await connection('surplus_tb')
                    .where('surplusID', hasSurplus[0].surplusID)
                    .first()
            )[0]

            //recebe o ID do registro realizado na tabela coffee_register usando saldo
            coffeeRegisterID = await CoffeeRegisterController.create(name, date, surplusID);
            console.log("\nRegistro realizado com sucesso na tabela coffee_registers.\n")
            //atualiza a surplus_tb para remover saldo e indicar o ID do registro em que o saldo foi utilizado
            await connection('surplus_tb')
                .where('surplusID', surplusID)
                .update({
                    used: 'true',
                    usedInCoffeeRegister: coffeeRegisterID
                })

            console.log(`Um registro de saldo do usuário ${name} foi colocado como já utilizado.`)

            if (surplus > 0) {
                await addSurplus(surplus)
            }

        } else {
            console.log(`----START\nRegistrando compra de ${name}, que está na posição ${userPosition}, não adiantado.`)
            await CoffeeRegisterController.create(name, date, false)
            console.log(`\n Compra sem utilizar saldo e sem adicionar saldo registrada na tabela coffee_registers.`)
            if (surplus > 0) {
                console.log(`\nAdicionando ${surplus} de saldo passado ao registrar a compra.\n`)
                await addSurplus(surplus)
            }
        }

        console.log(`\nAtualizando o saldo na tabela surplus_tb. Neste registro foi passado ${surplus > 0 ? surplus : 1} registro(s) de saldo.\n`)
        //caso tenha adicionado saldo, o valor será atualizado para o total que o usuário possui
        //caso não tenha, o total será igual ao total que o usuário já possuía

        const surplusInTable = Object.values(await connection('surplus_tb')
            .where({
                userName: name,
                used: 'false'
            })).length;

        console.log(surplusInTable, ' de saldo')

        await UserController.update.saldo(name, surplusInTable);

        if (isAhead === 'false') {
            console.log(`\nAtualizando posição do ${name} na tabela users.\n`)
            await UserController.update.position(name);
        }

        console.log(`\nAtualizando data da última aquisição do ${name} na tabela users.\n`)
        await UserController.update.lastCoffeeAcquisition(name, date)

        console.log("\nRegistro de compra de café concluído com sucesso!\n Enviando e-mail para novo pagador...")
    
        sendEmailToCurrentPayer()

        console.log("\n E-mail enviado! \n----END \n\n\n")

        return res.status(201).json({
            status: 201,
            message: "Compra registrada e tabela atualizada!"
        });

        async function addSurplus(total) {
            for (i = 0; i != total; i++) {
                try {
                    await connection('surplus_tb')
                        .insert({
                            userName: name,
                            surplusRegisterDate: date,
                        })
                } catch (err) {
                    throw new Error('Não foi possível inserir o saldo.' + err.message)
                }
            }

        }
    } catch (err) {
        console.log("\nFALHA INTERNO NO SERVIDOR -> index.js - rota /coffeeBought -> ", err)
        return res.status(500).json({
            status: 500,
            message: "Erro interno no servidor. Favor contatar o admnistrador do sistema."
        })
    }
})

app.delete('/remove', async (req, res) => {
    try {
        const emptyPropertie = checkReqBody(req.body)

        if (emptyPropertie) {
            console.log(`\nCorpo da requisição inválido.`, emptyPropertie)
            return res.status(400).json({
                status: 400,
                message: "Verifique se todos os campos do formulário estão devidamente preenchidos e tente novamente."
            })
        }

        const autenticado = await ckeckCredentials(req.body.admUser, req.body.admPassword)

        if (!autenticado) {
            console.log("\nUsuário e/ou senha da contas administradoras são inválidas.")
            return res.status(401).json({
                status: 401,
                message: "Credenciais inválidas!"
            });
        }

        const name = req.body.name

        const response = await UserController.update.position(name, "removingUser", res)

        if (response.statusCode === 500) return

        await UserController.delete(name, res);   
    } catch (err) {
        console.log("\nFALHA INTERNO NO SERVIDOR  -> index.js - rota /remove ->", err)
        return res.status(500).json({
            status: 500,
            message: "Erro interno no servidor. Favor contatar o admnistrador do sistema."
        })
    }
})

const port = 100

app.listen(port, () => {
    console.table(`Servidor rodando na porta ${port}`)
})