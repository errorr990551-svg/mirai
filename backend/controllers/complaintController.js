const { sendMail } = require("../services/emailService");

exports.submitComplaintForm = async (req, res) => {
  try {
    const data = req.body;

    // Prepare attachment (image)
    const attachments = [];
    if (req.file) {
      attachments.push({
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype,
      });
    }

    // Fire and forget email sending in background
    sendMail({
      to: "sales@miraitechnologies.net",
      cc: "errorr990551@gmail.com",
      subject: "New Complaint Form Submitted",
      html: `
        <h2>New Complaint Received</h2>

        <p><b>Customer Name:</b> ${data.customerName}</p>
        <p><b>Contact Person:</b> ${data.contactPerson}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone}</p>

        <hr/>

        <p><b>Flow Meter Model:</b> ${data.flowMeterModel}</p>
        <p><b>Serial Number:</b> ${data.serialNumber}</p>
        <p><b>Flow Meter Size:</b> ${data.flowMeterSize}</p>
        <p><b>Make / Brand:</b> ${data.makeBrand}</p>
        <p><b>Warranty Status:</b> ${data.warrantyStatus}</p>

        <hr/>

        <p><b>Nature of Complaint:</b> ${data.complaintNature}</p>
        <p><b>Frequency of Issue:</b> ${data.frequency}</p>
        <p><b>Issue Description:</b><br/>${data.issueDescription}</p>

        <hr/>

        <p><b>On-Site Visit Required:</b> ${data.onSiteVisit}</p>
        <p><b>Calibration Certificate Available:</b> ${data.calibrationCertificate}</p>
        <p><b>Preferred Contact Method:</b> ${data.contactMethod}</p>

        <p><b>Attachment:</b> ${
          req.file ? "Attached with this email" : "No attachment provided"
        }</p>
      `,
      attachments,
    }).catch(err => {
      console.error("Critical: Background Complaint Email failed:", err);
    });

    return res.status(200).json({
      success: true,
      message: "Complaint submitted successfully! We will review it shortly.",
    });
  } catch (error) {
    console.error("Complaint Form processing Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};
