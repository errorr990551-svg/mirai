import { sendMail } from "../services/emailService.js";

export const submitApplication = async (req, res) => {
  try {
    const { fullName, email, mobile, location, role } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Resume required" });
    }

    // Await email sending so Cloudflare Worker completes Resend API request
    await sendMail({
      to: "sales@miraitechnologies.net",
      cc: [
        "akshat99055@gmail.com",
        "errorr990551@gmail.com",
      ],
      subject: `New Job Application - MIRAI - ${role}`,
      html: `
        <h2>New Job Application</h2>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Location:</b> ${location}</p>
        <p><b>Applied For:</b> ${role}</p>
      `,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
          contentType: req.file.mimetype,
        },
      ],
    });

    return res.status(200).json({ success: true, message: "Application submitted successfully!" });

  } catch (err) {
    console.error("Application processing error:", err);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
};
