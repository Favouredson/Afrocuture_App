const express = require('express');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Access environment variables
process.env.API_KEY;
process.env.AUTH_DOMAIN;
process.env.PROJECT_ID;
process.env.STORAGE_BUCKET;
process.env.MESSAGING_SENDER_ID;
process.env.APP_ID;
process.env.MEASUREMENT_ID;

const app = express();
const port = process.env.PORT || 3000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.json()); // Enable JSON parsing for incoming requests

// Define a POST route to handle email sending
app.post('/send-email', async (req, res) => {
    try {
        const { orderDetails, customerInfo } = req.body;

        // Convert customerInfo (which is an array of objects) to a plain object
        const customerData = {};
        customerInfo.forEach(item => {
            customerData[item.name] = item.value;
        });

        // Create a list of items for the email content
        const itemList = orderDetails.map(product => `${product.name} (x${product.quantity})`).join(', ');

        // Compose the email
        const emailContent = `
            Order Details:
            Items: ${itemList}
            Name: ${customerData.firstName} ${customerData.lastName}
            Email: ${customerData.email}
            Phone: ${customerData.phone}
            Address: ${customerData.address}
            Card Number: **** **** **** ${customerData.creditCardNumber.slice(-4)}
        `;

        const msg = {
            to: customerData.email,
            from: 'favour.eronmhonsele@gmail.com',
            subject: "Item Purchased",
            text: emailContent,
        };

        await sgMail.send(msg);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
