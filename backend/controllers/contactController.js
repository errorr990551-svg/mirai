import { sendMail } from "../services/emailService.js";

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, location, company, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: "Please fill in all required fields" 
      });
    }

    // Await email sending so Cloudflare Worker does not freeze before HTTP fetch completes
    await sendMail({
      to: "sales@miraitechnologies.net",
      cc: [
        "akshat99055@gmail.com",
        "errorr990551@gmail.com",
      ],
      subject: "New Contact Us Enquiry - MIRAI",
      html: `
        <h2>New Contact Enquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Location:</b> ${location || "Not Provided"}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    return res.status(200).json({ 
      success: true, 
      message: "Message sent! Our team will get back to you shortly." 
    });

  } catch (err) {
    console.error("Contact form processing error:", err);
    return res.status(500).json({ 
      success: false, 
      message: err.message || "Something went wrong. Please try again later." 
    });
  }
};
