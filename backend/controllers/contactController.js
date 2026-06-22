const { sendMail } = require("../services/emailService");

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, location, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Please fill in all required fields" 
      });
    }

    // Fire and forget email sending in background
    sendMail({
      to: "sales@miraitechnologies.net",
      cc: [
        "akshat99055@gmail.com",
        "errorr990551@gmail.com",
      ],
      subject: "New Contact Us Enquiry",
      html: `
        <h2>New Contact Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Location:</b> ${location || "Not Provided"}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    }).catch(err => {
      console.error("Critical: Background Contact Email failed:", err);
    });

    // Respond immediately to the user
    return res.status(200).json({ 
      success: true, 
      message: "Message sent! Our team will get back to you shortly." 
    });

  } catch (err) {
    console.error("Contact form processing error:", err);
    return res.status(500).json({ 
      success: false, 
      message: "Something went wrong. Please try again later." 
    });
  }
};
