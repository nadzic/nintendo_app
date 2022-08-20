const resetPasswordMessages = {
  0: { message: 'Password reset successfully' },
  1: { message: 'Password not reset successfully' },
};

const resendPasswordMessages = {
  0: { message: 'Password resend successfully' },
  1: { message: 'Password not resend successfully' },
};

export default function fetchData(url, requestOptions) {
  if (url === 'https://staging.ohmygreen.com/api/users/reset_password') {
    const { email } = JSON.parse(requestOptions.body);    
    return new Promise((resolve, reject) => {
      process.nextTick(
        () =>
          email === 'ardit.vula@ohmygreen.com'
            ? resolve(resetPasswordMessages[0])
            : reject(resetPasswordMessages[1])
      );
    });
  } else if (url === 'https://staging.ohmygreen.com/api/users/resend_confirmation') {
    const { email } = JSON.parse(requestOptions.body);    
    return new Promise((resolve, reject) => {
      process.nextTick(
        () =>
          email === 'ardit.vula@ohmygreen.com'
            ? resolve(resendPasswordMessages[0])
            : reject(resendPasswordMessages[1])
      );
    });
  }
}
