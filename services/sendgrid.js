const sgMail = require('@sendgrid/mail')
const config = require('../utils/config')

sgMail.setApiKey(config.SENDGRID_API)

const sendRegisterMail = async (mail) => {
  try{
    const msg = {
      to: mail,
      from: 'testing.fgs.dev@gmail.com',
      subject: 'Welcome to Disney API',
      text: 'Welcome and thank you for register in our API. You can check de docs for more information about usage.',
      html: '<strong>Welcome and thank you for register in our API. You can check de docs for more information about usage.</strong>',
    }
    await sgMail.send(msg)
    console.log('Registration e-mail has been sent')
  }
  catch (error) {
    return error
  }
}

const sg = {
  sendRegisterMail
}

module.exports = sg