const nodemailer = require('nodemailer');

function generateActivationCode() {
    const min = 100000;
    const max = 999999;
  
    let code = Math.floor(Math.random() * (max - min + 1)) + min;
  
    code = Math.ceil(code / 7) * 7;
  
    return code;
  }

function isCodeValid(code) {
  return code % 7 === 0;
}

function sendActivationEmail(email, activationCode) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'frankocampus@gmail.com',
      pass: 'shiw qvlg zldm dpyf', 
      //actual password - kT63pU12
    },
  });

  const mailOptions = {
    from: 'Franko Campus Helpcenter',
    to: email,
    subject: 'Activation Code for Your Franko Campus Account',
    text: `Your activation code is: ${activationCode}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}

function activationMiddleware(req, res, next) {
  const { email } = req.body; 
  const activationCode = generateActivationCode();

  sendActivationEmail(email, activationCode);

  req.activationCode = activationCode; 
  next();
}

module.exports = { activationMiddleware, isCodeValid, generateActivationCode, sendActivationEmail };