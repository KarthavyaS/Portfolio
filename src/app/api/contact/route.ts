import { NextResponse } from "next/server";
import { portfolioData } from "@/data/portfolio";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, linkedin, message } = body;

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

    if (!phone || typeof phone !== "string" || phone.trim().length < 6) {
      return NextResponse.json(
        { success: false, error: "Please provide your contact number / phone." },
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

    const emailContent = `Name: ${name}\nEmail: ${email}\nContact Number: ${phone}\nLinkedIn: ${linkedin || "Not provided"}\n\nMessage:\n${message}`;

    // 1. Dispatch via Resend in the background if configured
    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [recipientEmail],
            reply_to: email,
            subject: `Portfolio Message from ${name} (${phone})`,
            text: emailContent,
          }),
        });
      } catch (e) {
        console.error("[Resend Delivery Error]:", e);
      }
    }

    // 2. Dispatch via Web3Forms in the background if configured
    if (web3formsKey) {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            name,
            email,
            phone,
            linkedin: linkedin || "N/A",
            message,
            subject: `Portfolio Message from ${name} (${phone})`,
            from_name: "Portfolio Contact Form",
          }),
        });
      } catch (e) {
        console.error("[Web3Forms Delivery Error]:", e);
      }
    }

    // 3. Dispatch via Formspree in the background if configured
    if (formspreeId) {
      try {
        await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ name, email, phone, linkedin: linkedin || "N/A", message }),
        });
      } catch (e) {
        console.error("[Formspree Delivery Error]:", e);
      }
    }

    console.log(`[Contact Message Received] from: ${name} (${email}, Contact: ${phone}, LinkedIn: ${linkedin || "none"}): "${message}"`);

    // Clean in-browser confirmation. Never opens or redirects to external mail client.
    return NextResponse.json({
      success: true,
      message: "Message received successfully! Karthavya will get back to you soon.",
    });
  } catch (err) {
    console.error("[Contact API Error]:", err);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while sending your message." },
      { status: 500 }
    );
  }
}
