// This file runs on the server, protecting your secret keys.
import twilio from 'twilio';

export default async function handler(req, res) {
  // 1. Check for secret keys
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromPhone = process.env.TWILIO_PHONE_NUMBER;
  const contactNumbersStr = process.env.EMERGENCY_CONTACT_NUMBERS;

  if (!accountSid || !authToken || !fromPhone || !contactNumbersStr) {
    console.error("Twilio environment variables are not set.");
    return res.status(500).json({ success: false, error: "Server configuration error." });
  }

  // 2. We only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
        return res.status(400).json({ success: false, error: 'Location data is required.' });
    }

    const client = twilio(accountSid, authToken);
    const contactNumbers = contactNumbersStr.split(',');

    // 3. Create the message body with a Google Maps link
    const locationUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
    const messageBody = `EMERGENCY ALERT from Bloom App: A user needs help. Their current location is: ${locationUrl}`;

    // 4. Send an SMS to all emergency contacts
    const messagePromises = contactNumbers.map(number => {
        return client.messages.create({
            body: messageBody,
            from: fromPhone,
            to: number.trim()
        });
    });

    await Promise.all(messagePromises);
    
    // You can also add the voice call logic here if needed
    // For example, to call the first number in the list:
    // await client.calls.create({
    //    twiml: `<Response><Say>This is an emergency alert from the Bloom App. A user needs immediate assistance. Please check your text messages for their location.</Say></Response>`,
    //    to: contactNumbers[0].trim(),
    //    from: fromPhone
    // });

    return res.status(200).json({ success: true, message: "Emergency alerts sent successfully." });

  } catch (error) {
    console.error("Twilio API Error:", error);
    return res.status(500).json({ success: false, error: "Failed to send emergency alerts." });
  }
}
