var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bhavik2991@gmail.com",
    pass: "berkfnagseunbtac",
  },
});

const htmlContent=`
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
    
            h1 {
                color: #333333;
            }
    
            p {
                color: #555555;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Hello, this is your Email Template!</h1>
            <p>
                This is a sample email template. You can customize it with your own content and styling.
            </p>
            <p>
                Here is the message from the user: <strong>{{userMessage}}</strong>.
            </p>
        </div>
    </body>
    </html>`;

const nodemail = async (req, res) => {
  console.log(req.body);
  const replacedHtml = htmlContent.replace("{{userMessage}}", req.body.message);
  
  var mailOptions = {
    from: "bhavik2991@gmail.com",
    to: req.body.name,
    subject: req.body.subject,
    text: req.body.message,
    html:replacedHtml
   // html: '<h1>Hello, this is HTML content!</h1><p>' + req.body.message + '</p>',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      return res.json({ success: true, msg: "sent" });
      //console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = nodemail;
