import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SERVICES, BUDGETS } from '@/lib/contact-options';

const resend = new Resend(process.env.RESEND_API_KEY);

/* Visitor input goes into HTML email — escape it so nobody can inject markup or links. */
const esc = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

const row = (label: string, value: string) => `
              <tr>
                <td style="padding:8px 0;color:#8a7060;font-size:13px;width:80px">${label}</td>
                <td style="padding:8px 0;color:#234B43">${value}</td>
              </tr>`;

export async function POST(req: NextRequest) {
  try {
    const { name, email, message, services, budget } = await req.json();

    if (
      typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string' ||
      !name.trim() || !message.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json({ error: 'Invalid fields' }, { status: 400 });
    }

    // only accept known chip values; anything else is silently dropped
    const pickedServices = Array.isArray(services)
      ? services.filter((s): s is string => (SERVICES as readonly string[]).includes(s))
      : [];
    const pickedBudget = (BUDGETS as readonly string[]).includes(budget) ? (budget as string) : '';

    const n = esc(name.trim());
    const e = esc(email.trim());
    const from = `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`;

    const { error } = await resend.emails.send({
      from,
      to: 'narendra.insights@gmail.com',
      replyTo: email.trim(),
      subject: `New project brief from ${name.trim().replace(/[\r\n]+/g, ' ')}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#FFFBF6;border-radius:12px;overflow:hidden;border:1px solid #f0e8df">
          <div style="background:#ED6A45;padding:20px 28px">
            <h2 style="margin:0;color:#fff;font-size:18px">New Project Brief</h2>
          </div>
          <div style="padding:28px">
            <table style="width:100%;border-collapse:collapse">
              ${row('From', `<strong>${n}</strong>`)}
              ${row('Email', `<a href="mailto:${e}" style="color:#ED6A45">${e}</a>`)}
              ${row('Needs', pickedServices.length ? esc(pickedServices.join(', ')) : '—')}
              ${row('Budget', pickedBudget ? esc(pickedBudget) : '—')}
            </table>
            <hr style="border:none;border-top:1px solid #f0e8df;margin:16px 0" />
            <p style="color:#6E8076;font-size:13px;margin:0 0 8px">Message</p>
            <p style="color:#234B43;line-height:1.6;margin:0;white-space:pre-wrap">${esc(message.trim())}</p>
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
