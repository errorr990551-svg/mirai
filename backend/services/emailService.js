import { Resend } from "resend";

export const sendMail = async ({ to, cc, subject, html, attachments = [] }) => {
  try {
    const apiKey = process.env.RESEND_API_KEY || globalThis.RESEND_API_KEY || globalThis.env?.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not defined in process.env or Worker environment variables");
    }

    const resend = new Resend(apiKey);
    const response = await resend.emails.send({
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

    if (response?.error) {
      console.error("RESEND API ERROR RESPONSE:", response.error);
      throw new Error(response.error.message || "Failed to send email via Resend API");
    }

    console.log("Resend response:", response.data || response);
    return response.data || response;
  } catch (error) {
    console.error("RESEND ERROR:", error);
    throw error;
  }
};

