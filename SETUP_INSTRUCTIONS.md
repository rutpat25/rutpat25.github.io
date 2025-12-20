# Setup Instructions for Contact Form

The contact form has been configured to work with EmailJS, a free email service for static websites.

## Current Status

The form currently has a **fallback to `mailto:`** which will open the user's email client. To enable direct form submission through the website, follow these steps:

## How to Enable EmailJS (Free - 200 emails/month)

### Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add an Email Service

1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection wizard to link your email account
5. Note down your **Service ID** (e.g., `service_abc123`)

### Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

**Subject:**
```
New Contact Form Submission from {{from_name}}
```

**Content:**
```
You have received a new message from your portfolio website.

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `abcdefghij1234567`)

### Step 5: Update the Code

Open `js/main.js` and replace these three values at the top of the file (around lines 105-107):

```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your actual public key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your template ID
```

For example:
```javascript
const EMAILJS_PUBLIC_KEY = 'abcdefghij1234567';
const EMAILJS_SERVICE_ID = 'service_abc123';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
```

### Step 6: Test the Form

1. Open your website
2. Fill out the contact form
3. Submit it
4. You should receive an email at your connected email address!

## Fallback Behavior

If EmailJS is not configured (default state), the form will:
- Open the user's default email client (Outlook, Gmail, etc.)
- Pre-fill the recipient, subject, and message body
- Display a helpful message to the user

This ensures the form is always functional, even without EmailJS setup.

## Free Tier Limits

- **200 emails per month** (free)
- Upgrade to paid plans for more emails if needed

## Troubleshooting

**Form not sending emails?**
- Check browser console for errors (F12 → Console tab)
- Verify all three IDs are correctly copied
- Make sure your email service is connected and active
- Check EmailJS dashboard for delivery logs

**Still having issues?**
- Users can always email directly at: **rutwijpatil25@gmail.com**
- All contact info is also displayed in the Contact section

## Alternative: Formspree

If you prefer Formspree instead:
1. Sign up at [https://formspree.io/](https://formspree.io/)
2. Create a new form and get your form endpoint
3. Update the form HTML to use Formspree's action URL

## Security Note

The public key, service ID, and template ID are safe to expose in client-side code. EmailJS is designed for this use case.
