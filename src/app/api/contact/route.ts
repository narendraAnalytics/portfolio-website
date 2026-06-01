import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name?.trim() || !message?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email?.trim())) {
      return NextResponse.json({ error: 'Invalid fields' }, { status: 400 });
    }

    const from = `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`;

    const { error } = await resend.emails.send({
      from,
      to: 'narendra.insights@gmail.com',
      replyTo: email.trim(),
      subject: `New project brief from ${name.trim()}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#FFFBF6;border-radius:12px;overflow:hidden;border:1px solid #f0e8df">
          <div style="background:#ED6A45;padding:20px 28px">
            <h2 style="margin:0;color:#fff;font-size:18px">New Project Brief</h2>
          </div>
          <div style="padding:28px">
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:8px 0;color:#8a7060;font-size:13px;width:80px">From</td>
                <td style="padding:8px 0;color:#234B43;font-weight:600">${name.trim()}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#8a7060;font-size:13px">Email</td>
                <td style="padding:8px 0;color:#234B43"><a href="mailto:${email.trim()}" style="color:#ED6A45">${email.trim()}</a></td>
              </tr>
            </table>
            <hr style="border:none;border-top:1px solid #f0e8df;margin:16px 0" />
            <p style="color:#6E8076;font-size:13px;margin:0 0 8px">Message</p>
            <p style="color:#234B43;line-height:1.6;margin:0;white-space:pre-wrap">${message.trim()}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
