const nodemailer = require('nodemailer');

const generateActivationCode = () => {
  //
  //Генерує код від 0 до 899 999, після чого додає 100 000, щоб код був у межах 100 000 і 999 999
  //
  return Math.floor(100000 + Math.random() * 900000);
};

const storeActivationCode = async (userId, code) => {
  try {
    await verificationCodes.create({
      user_id: userId,
      code: code,
    });
  } catch (error) {
    console.error("Виникла помилка під час зберігання коду верифікації:", error);
    throw error;
  }
};

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

module.exports = { storeActivationCode, generateActivationCode, sendActivationEmail };