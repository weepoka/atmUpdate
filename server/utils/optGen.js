const generateOTP = () => {
  const newOtp = Math.floor(1000 + Math.random() * 900).toString();
  return newOtp;
};

const otpG = () => {
  const otp = generateOTP();

  return otp;
};

module.exports = {
    otpG,
};
