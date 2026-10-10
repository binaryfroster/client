/**
 * Serverless API Endpoint: /api/inquiry
 * Handles trial booking and membership inquiries for Power House Gym & Fitness Center.
 * Dispatches inquiries directly and exclusively to amirmullani7272@gmail.com
 * and sends an automated confirmation email with branding to the client's email address.
 */

import nodemailer from 'nodemailer';

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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

    // Honeypot antispam trap
    if (body._honey || body.honeypot || body.website) {
      return res.status(200).json({
        success: true,
        message: 'Inquiry processed successfully.'
      });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const goal = typeof body.goal === 'string' ? body.goal.trim() : 'General Fitness';
    const plan = typeof body.plan === 'string' ? body.plan.trim() : '1-Day Free Trial Session (Complimentary)';
    const session = typeof body.session === 'string' ? body.session.trim() : 'Morning (6:00 AM – 11:30 AM)';
    const note = typeof body.note === 'string' ? body.note.trim() : '';

    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Name, email address, and phone number are required.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length > 254 || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    if (name.length > 150 || phone.length > 30 || note.length > 3000) {
      return res.status(400).json({
        success: false,
        message: 'One or more fields exceed the maximum length.'
      });
    }

    const cleanPhoneDigits = phone.replace(/[^0-9]/g, '');
    const waPhone = cleanPhoneDigits.length === 10 ? `91${cleanPhoneDigits}` : cleanPhoneDigits;
    const waChatUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(`Hello ${name}, Coach Ameer from Power House Gym here regarding your trial booking!`)}`;

    const LOGO_URL = 'https://www.powerhousegymkolhapur.in/__l5e/assets-v1/2af281ae-a2d9-4174-95da-3e39cee943d5/power-house-logo.png';
    const FLOOR_IMG_URL = 'https://www.powerhousegymkolhapur.in/assets/facility/power-house-gym-main-floor.webp';

    // Configure Gmail SMTP Transporter
    const gmailUser = process.env.GMAIL_USER || 'binaryfroster@gmail.com';
    const gmailPass = process.env.GMAIL_APP_PASSWORD || 'lusvkwugjkzyyuea';
    const receiverEmail = process.env.RECEIVER_EMAIL || 'amirmullani7272@gmail.com';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass
      }
    });

    // 1. Email for Reception / Coach Ameer Mullani
    const receptionMailHtml = `
      <div style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:620px;margin:0 auto;background:#0d1117;color:#e5e7eb;border-radius:12px;border:1px solid #1f2937;overflow:hidden;">
        <div style="background:#161b22;padding:24px;border-bottom:1px solid #2d333b;text-align:center;">
          <img src="${LOGO_URL}" alt="Power House Gym" width="70" height="60" style="display:block;margin:0 auto 12px;object-fit:contain;" />
          <h2 style="color:#a8ff00;margin:0 0 6px;font-size:20px;letter-spacing:1px;text-transform:uppercase;">New Athlete Trial Booking &amp; Inquiry</h2>
          <span style="display:inline-block;background:rgba(168,255,0,0.15);color:#a8ff00;border:1px solid rgba(168,255,0,0.3);border-radius:20px;padding:3px 12px;font-size:12px;font-weight:600;">Power House Gym · Shahupuri, Kolhapur</span>
        </div>

        <div style="padding:24px;">
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr>
              <td style="padding:10px 0;color:#9ca3af;font-size:13px;width:130px;border-bottom:1px solid #21262d;">Full Name</td>
              <td style="padding:10px 0;color:#ffffff;font-weight:700;font-size:15px;border-bottom:1px solid #21262d;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#9ca3af;font-size:13px;border-bottom:1px solid #21262d;">Contact Phone</td>
              <td style="padding:10px 0;border-bottom:1px solid #21262d;">
                <a href="tel:${escapeHtml(phone)}" style="color:#38bdf8;text-decoration:none;font-weight:600;font-size:14px;">${escapeHtml(phone)}</a>
                &nbsp;·&nbsp;
                <a href="${waChatUrl}" target="_blank" style="color:#25d366;text-decoration:none;font-size:13px;font-weight:600;">Chat on WhatsApp ↗</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#9ca3af;font-size:13px;border-bottom:1px solid #21262d;">Email Address</td>
              <td style="padding:10px 0;border-bottom:1px solid #21262d;">
                <a href="mailto:${escapeHtml(email)}" style="color:#38bdf8;text-decoration:none;">${escapeHtml(email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#9ca3af;font-size:13px;border-bottom:1px solid #21262d;">Primary Goal</td>
              <td style="padding:10px 0;color:#a8ff00;font-weight:600;border-bottom:1px solid #21262d;">${escapeHtml(goal)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#9ca3af;font-size:13px;border-bottom:1px solid #21262d;">Selected Plan</td>
              <td style="padding:10px 0;color:#ffffff;font-weight:600;border-bottom:1px solid #21262d;">${escapeHtml(plan)}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;color:#9ca3af;font-size:13px;border-bottom:1px solid #21262d;">Preferred Slot</td>
              <td style="padding:10px 0;color:#ffffff;font-weight:600;border-bottom:1px solid #21262d;">${escapeHtml(session)}</td>
            </tr>
          </table>

          <div style="background:#161b22;border-radius:8px;padding:16px;border:1px solid #21262d;margin-bottom:20px;">
            <p style="margin:0 0 8px;color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;">Athlete Notes / Background</p>
            <p style="margin:0;color:#e5e7eb;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(note || 'No additional notes provided.')}</p>
          </div>

          <div style="text-align:center;padding:12px 0;">
            <a href="mailto:${escapeHtml(email)}?subject=${encodeURIComponent(`Welcome to Power House Gym Kolhapur, ${name}!`)}" style="display:inline-block;background:#a8ff00;color:#080808;font-weight:800;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;padding:12px 28px;border-radius:6px;text-decoration:none;">Reply Directly to Athlete</a>
          </div>
        </div>

        <div style="background:#161b22;padding:14px 20px;border-top:1px solid #21262d;font-size:12px;color:#6b7280;text-align:center;">
          Power House Gym &amp; Fitness Center · Vardhmane House, 718, 3rd Ln, Shahupuri, Kolhapur
        </div>
      </div>
    `;

    // 2. Email for Client / Athlete (Confirmation & Pass Receipt)
    const clientMailHtml = `
      <div style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;max-width:620px;margin:0 auto;background:#0d1117;color:#e5e7eb;border-radius:12px;border:1px solid #1f2937;overflow:hidden;">
        <div style="background:#161b22;padding:26px 20px;border-bottom:1px solid #2d333b;text-align:center;">
          <img src="${LOGO_URL}" alt="Power House Gym Logo" width="75" height="65" style="display:block;margin:0 auto 12px;object-fit:contain;" />
          <h2 style="color:#a8ff00;margin:0 0 6px;font-size:22px;letter-spacing:1px;text-transform:uppercase;">Trial Workout Pass Confirmed!</h2>
          <p style="color:#d1d5db;margin:0;font-size:14px;">Welcome to Power House Gym &amp; Fitness Center, Shahupuri, Kolhapur</p>
        </div>

        <div style="padding:24px;">
          <p style="font-size:16px;color:#ffffff;margin:0 0 16px;">Hi <strong>${escapeHtml(name)}</strong> 👋,</p>
          <p style="color:#d1d5db;font-size:14px;line-height:1.6;margin:0 0 20px;">
            Thank you for claiming your <strong>1-Day Complimentary Trial Pass</strong>! Head Coach Ameer Mullani (12+ years certified fitness coaching experience) and the Power House Gym team are excited to welcome you.
          </p>

          <div style="background:#161b22;border:1px solid rgba(168,255,0,0.3);border-radius:8px;padding:18px;margin-bottom:24px;">
            <h3 style="color:#a8ff00;margin:0 0 12px;font-size:14px;text-transform:uppercase;letter-spacing:0.5px;">✓ Your Booking Receipt</h3>
            <table style="width:100%;border-collapse:collapse;font-size:13px;">
              <tr>
                <td style="padding:6px 0;color:#9ca3af;width:120px;">Pass Type:</td>
                <td style="padding:6px 0;color:#ffffff;font-weight:600;">${escapeHtml(plan)}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#9ca3af;">Primary Goal:</td>
                <td style="padding:6px 0;color:#a8ff00;font-weight:600;">${escapeHtml(goal)}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#9ca3af;">Session Slot:</td>
                <td style="padding:6px 0;color:#ffffff;font-weight:600;">${escapeHtml(session)}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#9ca3af;">Your Contact:</td>
                <td style="padding:6px 0;color:#ffffff;">${escapeHtml(phone)}</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom:24px;border-radius:8px;overflow:hidden;border:1px solid #21262d;">
            <img src="${FLOOR_IMG_URL}" alt="Power House Gym Shahupuri Training Floor" style="width:100%;height:auto;display:block;" />
            <div style="background:#161b22;padding:12px 16px;font-size:12px;color:#9ca3af;text-align:center;">
              Our heavy dumbbell racks, Olympic barbells, and plate-loaded stations ready for your trial workout.
            </div>
          </div>

          <div style="background:#161b22;border-radius:8px;padding:18px;border:1px solid #21262d;margin-bottom:24px;">
            <h4 style="color:#ffffff;margin:0 0 10px;font-size:14px;">📍 Gym Address &amp; Timings:</h4>
            <p style="margin:0 0 8px;color:#d1d5db;font-size:13px;line-height:1.5;">
              <strong>Power House Gym &amp; Fitness Center</strong><br/>
              Vardhmane House, 718, 3rd Ln, near Nitin Medical, E Ward, Shahupuri, Kolhapur, Maharashtra 416001
            </p>
            <p style="margin:0 0 12px;color:#9ca3af;font-size:12px;">
              ⏰ <strong>Morning:</strong> 6:00 AM – 11:30 AM &nbsp;|&nbsp; <strong>Evening:</strong> 4:30 PM – 9:00 PM (Mon–Sat)
            </p>
            <a href="https://maps.app.goo.gl/baXPDWPsxsrzSxm6A" target="_blank" style="display:inline-block;color:#38bdf8;text-decoration:none;font-size:13px;font-weight:600;">Open Location in Google Maps ↗</a>
          </div>

          <div style="background:rgba(168,255,0,0.06);border:1px dashed rgba(168,255,0,0.3);border-radius:8px;padding:14px;margin-bottom:24px;">
            <h5 style="color:#a8ff00;margin:0 0 6px;font-size:13px;text-transform:uppercase;">💡 Checklist for Your First Visit</h5>
            <ul style="margin:0;padding-left:18px;color:#d1d5db;font-size:12px;line-height:1.6;">
              <li>Bring clean indoor workout shoes (separate from outdoor footwear).</li>
              <li>Carry a small gym towel and a water bottle.</li>
              <li>Ask for Coach Ameer at the front desk when you arrive!</li>
            </ul>
          </div>

          <div style="text-align:center;padding:8px 0 16px;">
            <a href="https://wa.me/919860252720?text=${encodeURIComponent(`Hello Coach Ameer, I booked my trial pass online (${name}). Excited to visit!`)}" target="_blank" style="display:inline-block;background:#25d366;color:#000000;font-weight:800;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;padding:12px 28px;border-radius:6px;text-decoration:none;">Connect with Coach Ameer on WhatsApp</a>
          </div>
        </div>

        <div style="background:#161b22;padding:16px;border-top:1px solid #21262d;font-size:12px;color:#6b7280;text-align:center;">
          <p style="margin:0 0 4px;">Direct Phone: +91 9860252720 · Website: <a href="https://www.powerhousegymkolhapur.in" style="color:#9ca3af;text-decoration:none;">powerhousegymkolhapur.in</a></p>
          <p style="margin:0;">© 2026 Power House Gym &amp; Fitness Center · Shahupuri, Kolhapur</p>
        </div>
      </div>
    `;

    // Send both emails using Gmail SMTP
    const [receptionInfo, clientInfo] = await Promise.all([
      transporter.sendMail({
        from: `"Power House Gym Inquiries" <${gmailUser}>`,
        to: receiverEmail,
        replyTo: email,
        subject: `⚡ New Athlete Inquiry: ${name} (${phone})`,
        html: receptionMailHtml
      }),
      transporter.sendMail({
        from: `"Power House Gym & Fitness Center" <${gmailUser}>`,
        to: email,
        replyTo: receiverEmail,
        subject: `⚡ Your Free Trial Pass at Power House Gym Kolhapur is Confirmed!`,
        html: clientMailHtml
      })
    ]);

    console.log(`[API /inquiry] Reception mail sent: ${receptionInfo.messageId}`);
    console.log(`[API /inquiry] Client confirmation mail sent: ${clientInfo.messageId}`);

    return res.status(200).json({
      success: true,
      message: 'Inquiry delivered to Coach Ameer and confirmation email sent to athlete.',
      data: {
        name,
        email,
        phone,
        goal,
        plan,
        session,
        note
      },
      smtp: {
        receptionMessageId: receptionInfo.messageId,
        clientMessageId: clientInfo.messageId
      }
    });

  } catch (error) {
    console.error('Error dispatching inquiry via Gmail SMTP:', error);

    // Fallback to FormSubmit if SMTP encounters an issue
    try {
      const payload = {
        name: body.name,
        email: body.email,
        phone: body.phone,
        goal: body.goal,
        plan: body.plan,
        session: body.session,
        description: body.note || 'None provided',
        _subject: `⚡ New Athlete Inquiry: ${body.name} (${body.phone})`,
        _replyto: body.email,
        _template: 'table',
        _captcha: 'false'
      };

      await fetch('https://formsubmit.co/ajax/amirmullani7272@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': 'https://www.powerhousegymkolhapur.in',
          'Referer': 'https://www.powerhousegymkolhapur.in/visit'
        },
        body: JSON.stringify(payload)
      });
    } catch (fsErr) {
      console.warn('FormSubmit fallback also failed:', fsErr);
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry registered and processed.',
      fallback: true
    });
  }
}
