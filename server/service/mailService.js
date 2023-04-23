const nodemailer = require("nodemailer");
require("dotenv").config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "barry87@ethereal.email",
        pass: "jMvAHURZ1gC5Tk9euH",
      },
    });
  }

  async sendActivationMail(to, link) {
    const reciver = to.toString();
    //console.log(typeof to);
    await this.transporter.sendMail({
      from: "barry87@ethereal.email",
      to: reciver,
      subject: "Активация аккаунта на " + process.env.API_URL,
      text: "",
      html: `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
    });
  }
}

module.exports = new MailService();
