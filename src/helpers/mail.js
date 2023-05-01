const sib = require("../config/nodemailer");
const fs = require("fs");
const mustache = require("mustache");
const path = require("path");

const sendToMail = (data) => {
  const source = path.join(__dirname, "templates/" + data.template);
  const templates = fs.readFileSync(source, "utf8");
  const mailOptions = {
    from: "From Owner <saint.rosid@gmail.com>",
    to: data.to,
    subject: data.subject,
    html: mustache.render(templates, { ...data }),
  };
  return new Promise((resolve, reject) => {
    sib.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};

module.exports = { sendToMail };
