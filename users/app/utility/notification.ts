import twilio from 'twilio'

const accountSid = "AC5f483b57daf618f21530bb072f4f9674"  
const authToken = "6d9331f6a92b1a5c183c5ea6a8131f7d"


const client = twilio(accountSid , authToken)
export const GenerateAccessCode = () => {
    const code = Math.floor(10000 + Math.random() * 9000000)
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000)
    return { code , expiry}
}


export const SendVerificationCode = async (
    code: number,
    toPhoneNumber: string
) => {
   const response = await client.messages
   .create({
      from: '+84346997607',
      body: `Send code ${code}`,
      to: toPhoneNumber.trim()
    })
    console.log(response)
    return response;
}

