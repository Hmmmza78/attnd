const nodemailer = require("nodemailer");

// in the execution block of the mailer function in the file that will be importing this function, there needs to be a try catch block, so that the error can then be covered with an error message!

const sendMail = async options => {

    // const transporter = nodemailer.createTransport({
    //     // service: "custom",
    //     host: "smtp.gmail.com",
    //     port: 465,
    //     auth: {
    //         user: "test.hmmmzadev@gmail.com",
    //         pass: "dxudbnmbmhtnmgyg"
    //     }
    // });

    // e3769c8eb085842270e587c68ac5e3c2

    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "e7a534c97cd0e6",
            pass: "d3e7f3332f8fc9"
        }
    });

    // mail options
    const mailOptions = {
        from: "Attnd lighthouse",
        to: options.email,
        subject: options.subject,
        text: options.text,
        html: options.html
    }

    // sending the email
    try {
        await transporter.sendMail(mailOptions);
        console.log("mail sent successfully");
    } catch (err) {
        console.log("mail not sent successfully");
        console.log(err);
    }
}

module.exports = { sendMail };
