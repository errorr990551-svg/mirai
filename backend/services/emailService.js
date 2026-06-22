const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendMail = async ({ to, cc, subject, html, attachments = [] }) => {
  try {
    const data = await resend.emails.send({
      from: "MIRAI <no-reply@inquiry.errorr.in>",
      to: Array.isArray(to) ? to : [to],
      cc: cc
        ? Array.isArray(cc)
          ? cc
          : [cc]
        : undefined,
      subject,
      html,
      attachments: attachments.map((file) => ({
        filename: file.filename,
        content: file.content,
      })),
    });

    console.log("Resend response:", data);
    return data;
  } catch (error) {
    console.error("RESEND ERROR:", error);
    throw error;
  }
};
