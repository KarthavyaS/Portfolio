import { NextResponse } from "next/server";
import { portfolioData } from "@/data/portfolio";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please provide your name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 5 characters long." },
        { status: 400 }
      );
    }

    const recipientEmail = portfolioData.personal.email; // karthavya.s.2024.cse@rajalakshmi.edu.in
    const resendApiKey = process.env.RESEND_API_KEY;
    const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;
    const formspreeId = process.env.FORMSPREE_FORM_ID;

    // 1. Dispatch via Resend if RESEND_API_KEY is configured
    if (resendApiKey) {
      try {
        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [recipientEmail],
            reply_to: email,
            subject: `New Portfolio Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          }),
        });

        if (resendRes.ok) {
          return NextResponse.json({
            success: true,
            deliveredViaService: true,
            message: `Message delivered directly to ${recipientEmail}!`,
          });
        }
      } catch (e) {
        console.error("[Resend Error]:", e);
      }
    }

    // 2. Dispatch via Web3Forms if WEB3FORMS_ACCESS_KEY is configured
    if (web3formsKey) {
      try {
        const web3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            name,
            email,
            message,
            subject: `Portfolio Message from ${name}`,
            from_name: "Portfolio Contact Form",
          }),
        });

        if (web3Res.ok) {
          return NextResponse.json({
            success: true,
            deliveredViaService: true,
            message: `Message delivered directly to ${recipientEmail}!`,
          });
        }
      } catch (e) {
        console.error("[Web3Forms Error]:", e);
      }
    }

    // 3. Dispatch via Formspree if FORMSPREE_FORM_ID is configured
    if (formspreeId) {
      try {
        const formspreeRes = await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ name, email, message }),
        });

        if (formspreeRes.ok) {
          return NextResponse.json({
            success: true,
            deliveredViaService: true,
            message: `Message delivered directly to ${recipientEmail}!`,
          });
        }
      } catch (e) {
        console.error("[Formspree Error]:", e);
      }
    }

    // 4. Default / Fallback: Generate direct mailto link to guarantee delivery to her email
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const mailBody = encodeURIComponent(`Hi Karthavya,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${mailBody}`;

    return NextResponse.json({
      success: true,
      deliveredViaService: false,
      recipientEmail,
      mailtoUrl,
      message: `Message ready for ${recipientEmail}.`,
    });
  } catch (err) {
    console.error("[Contact API Error]:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while sending your message." },
      { status: 500 }
    );
  }
}
