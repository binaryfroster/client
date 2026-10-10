/**
 * Serverless API Endpoint: /api/inquiry
 * Handles trial booking and membership inquiries for Power House Gym & Fitness Center.
 * Dispatches the inquiry directly and exclusively to amirmullani7272@gmail.com
 * and sends an automated confirmation email to the submitter's email address.
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // body remains string or parsed
      }
    }

    const {
      name,
      email,
      phone,
      goal = 'General Fitness',
      plan = '1-Day Free Trial Session (Complimentary)',
      session = 'Morning (6:00 AM – 11:30 AM)',
      note = ''
    } = body || {};

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email address, and phone number are required.'
      });
    }

    const confirmationMessage = `Hello ${name},

Thank you for choosing Power House Gym & Fitness Center in Shahupuri, Kolhapur!

We have successfully received your inquiry / free trial pass booking with the following details:
• Full Name: ${name}
• Phone / WhatsApp: ${phone}
• Email Address: ${email}
• Primary Goal: ${goal}
• Selected Plan / Interest: ${plan}
• Preferred Session Slot: ${session}
• Notes / Description: ${note || 'None provided'}

Head Coach Ameer Mullani (12+ years of professional training experience) has received your details directly at amirmullani7272@gmail.com.

Location & Timings:
📍 Vardhmane House, 718, 3rd Ln, near Nitin Medical, E Ward, Shahupuri, Kolhapur, Maharashtra 416001
📞 Direct Contact / WhatsApp: +91 9860252720
⏰ Operating Hours:
   - Morning: 6:00 AM – 11:30 AM
   - Evening: 4:30 PM – 9:00 PM (Monday to Saturday)

Please bring clean training shoes and a gym towel for your first workout session. We look forward to welcoming you!

Warm regards,
Power House Gym & Fitness Center
Website: https://www.powerhousegymkolhapur.in
Google Maps: https://maps.app.goo.gl/baXPDWPsxsrzSxm6A`;

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      goal,
      plan,
      session,
      description: note.trim() || 'No additional notes provided',
      submissionDate: new Date().toISOString(),
      _subject: `⚡ New Inquiry & Free Trial Booking: ${name} (${phone})`,
      _autoresponse: confirmationMessage,
      _replyto: email.trim(),
      _template: 'table',
      _captcha: 'false'
    };

    // Forward to FormSubmit endpoint for verified email transport
    const fsResponse = await fetch('https://formsubmit.co/ajax/amirmullani7272@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://www.powerhousegymkolhapur.in',
        'Referer': 'https://www.powerhousegymkolhapur.in/visit'
      },
      body: JSON.stringify(payload)
    });

    const fsData = await fsResponse.json().catch(() => ({}));

    return res.status(200).json({
      success: true,
      message: 'Inquiry delivered to mailbox and confirmation email sent.',
      data: {
        name,
        email,
        phone,
        goal,
        plan,
        session,
        note
      },
      provider: fsData
    });
  } catch (error) {
    console.error('Error handling inquiry:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to dispatch inquiry'
    });
  }
}
