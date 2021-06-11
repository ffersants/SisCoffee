module.exports = {
    host: "correio.pcdf.df.gov.br",
    port: 25,
    secure: false, // true for 465, false for other ports
    user: process.env.EMAIL_USER, // generated ethereal user
    pass: process.env.EMAIL_PSWD, // generated ethereal password
}