const { SITE_NAME } = process.env;
const sendEmail = require('./sendEmail');

const createLetter = async (email, verificationToken) => {
  const data = {
    to: email,
    subject: 'Email confirmation',
    html: `<p>Follow the <a target="_blank" href="${SITE_NAME}/users/verify/${verificationToken}">link </>to confirm your email.</p>`,
  };

  await sendEmail(data);
};

module.exports = createLetter;
