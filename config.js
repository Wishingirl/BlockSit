const dotenv = require('dotenv');
dotenv.config();
ad = process.env.ADMINTOKEN;
console.log(ad)
module.exports = {
    siteurl: "",
    admintoken: this.ad,
    maintanencemode: false,
    maintanencetitle: '<h1>Site is under maintanence.</h1>',
    sitename: 'Yes',
    alertEnabled: true,
    alertTitle: "Actualizaciones en curso...",
    alertText: "Estamos trabajando en el sitio web actualmente. El sitio ira mas lento de lo normal."
}