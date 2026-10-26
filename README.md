# Digital Health Declaration Form

> 🚧 **Work in progress.** Live demo: [sagi-insurance.vercel.app](https://sagi-insurance.vercel.app)

A mobile-friendly digital version of an insurance agency's adult health declaration form (Hebrew, right to left).
It replaces paper forms:

1. The applicant fills in the form on their phone or computer and **signs on screen**.
2. They see a success screen and can **download a PDF copy** of the completed form.
3. The agent automatically receives the signed form **as a PDF by email**.

## How it works
- **Front end:** HTML, CSS and JavaScript with input validation and a canvas signature pad.
  `html2canvas` and `jsPDF` turn the filled form into a PDF in the browser.
- **Back end:** a Vercel serverless function (`api/send-form.js`) receives the PDF and emails it with **Nodemailer**.
  Credentials are kept in environment variables, never in the code.

## Tech stack
JavaScript · html2canvas · jsPDF · Node.js · Nodemailer · Vercel serverless functions
