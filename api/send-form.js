const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { pdfBase64, applicantName, date, attachments = [] } = req.body;

  if (!pdfBase64 || !applicantName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: `"הצהרת בריאות" <${process.env.GMAIL_USER}>`,
    to: 'mataroll123@gmail.com',
    subject: `הצהרת בריאות חדשה - ${applicantName} - ${date}`,
    html: `
      <div dir="rtl" style="font-family:Arial,sans-serif;font-size:15px;">
        <h2 style="color:#1a56db;">הצהרת בריאות חדשה התקבלה</h2>
        <p><strong>שם מועמד:</strong> ${applicantName}</p>
        <p><strong>תאריך:</strong> ${date}</p>
        <p>הטופס המלא מצורף כקובץ PDF.</p>
      </div>
    `,
    attachments: [
      {
        filename: `הצהרת_בריאות_${applicantName}_${date}.pdf`,
        content: Buffer.from(pdfBase64, 'base64'),
        contentType: 'application/pdf'
      },
      ...attachments.map(f => ({
        filename: `[${f.folder}] ${f.name}`,
        content: Buffer.from(f.base64, 'base64'),
        contentType: f.type
      }))
    ]
  });

  return res.status(200).json({ success: true });
};
