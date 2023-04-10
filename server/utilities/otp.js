import twilio from 'twilio';
import dotenv from 'dotenv';
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const ServicesSID = process.env.TWILIO_SSID
const accountSid = process.env.TWILIO_SID
const authToken =process.env.TWILIO_TOKEN
const client = twilio(accountSid,authToken);




function sendotp(mobile) {
    client.verify.v2.services(ServicesSID)
        .verifications
        .create({ to: `+91${mobile}`, channel: 'sms' })
        .then(verification => console.log(verification.status));

    return true


}




function verifyotp(mobile, otp) {
    console.log(22222222222);
    console.log(mobile+11111111);
    console.log(otp+11111111);
    return new Promise((resolve, reject) => {
        client.verify.v2
            .services(ServicesSID)
            .verificationChecks.create({ to: `+91 ${mobile}`, code: otp }).then((verification_check) => {
                console.log(mobile+11111111);
                console.log(verification_check.status);
                resolve(verification_check);
            });
    }) }


export {
            sendotp,
            verifyotp
        }