const mbRegex = /^01[0-9]{9}$/;
const mb1Regex = /^(\+)?(88)?01[0-9]{9}$/;

function validateMob(mobile) {
  return mbRegex.test(mobile) || mb1Regex.test(mobile);
}

module.exports = validateMob;
