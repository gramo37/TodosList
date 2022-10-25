import emailjs from '@emailjs/browser';

const {
    VERIFY_MAIL_SUCCESS,
    VERIFY_MAIL_FAIL
  } = require("../../src/redux/constants/authconstants");

export const sendEmail = async (email, message, dispatch) => {
    var templateParams = {
        email: email,
        message: message,
        subject: "OTP Confirmation"
    };
    
    emailjs.send('service_npzjtpg', 'template_w97jtjv', templateParams, 'uF6OeJEqNkVC7B5mC')
        .then(function(response) {
           console.log('SUCCESS!', response.status, response.text);
           let output = {
            success: true,
            message: "OTP Has been Sent to you !"
          }
          dispatch({
            type: VERIFY_MAIL_SUCCESS,
            payload: output,
          });

        }, function(error) {
           console.log('FAILED...', error);
           dispatch({
            type: VERIFY_MAIL_FAIL,
            payload: error.response.data,
          });
        });
}
