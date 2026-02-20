export function generateWelcomeCheckerHTML(fullName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Checkerist</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f9;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);padding:40px 48px;text-align:center;">
              <h1 style="margin:0;color:#e94560;font-size:32px;font-weight:800;letter-spacing:1px;">Checkerist</h1>
              <p style="margin:8px 0 0;color:#a8b2c1;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Verified Accommodation Platform</p>
            </td>
          </tr>

          <!-- Hero Badge -->
          <tr>
            <td style="background:#f8f9ff;padding:32px 48px;text-align:center;border-bottom:1px solid #eef0f7;">
              <div style="display:inline-block;background:linear-gradient(135deg,#e94560,#c73652);color:#fff;padding:8px 24px;border-radius:50px;font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">✅ Email Verified — Checker Account Active</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:48px 48px 32px;">

              <h2 style="margin:0 0 16px;color:#1a1a2e;font-size:26px;font-weight:700;">
                Welcome aboard, ${fullName}! 🎉
              </h2>

              <p style="margin:0 0 20px;color:#4a5568;font-size:15px;line-height:1.8;">
                We are absolutely thrilled to have you join the <strong style="color:#e94560;">Checkerist</strong> community as a verified <strong>Checker</strong>. Your decision to be part of our platform means a great deal to us, and we truly appreciate the trust you have placed in us.
              </p>

              <p style="margin:0 0 28px;color:#4a5568;font-size:15px;line-height:1.8;">
                Checkerist.com is new, and you’re proudly among our first 1,000 Checkers. Enjoy special bonuses, priority profile placement in your region, and zero commission for your first year. Big opportunities are coming — we’ll be in touch soon with more details.
              </p>

              <!-- Value Props -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">

                <tr>
                  <td style="padding:16px;background:#f8f9ff;border-left:4px solid #e94560;border-radius:0 8px 8px 0;margin-bottom:12px;">
                    <p style="margin:0;color:#1a1a2e;font-size:15px;font-weight:600;">💼 Earn by Checking Accommodations</p>
                    <p style="margin:6px 0 0;color:#718096;font-size:14px;line-height:1.7;">
                      Clients will reach out to you directly to inspect and verify accommodations in your area. Every check you complete is an earning opportunity.
                    </p>
                  </td>
                </tr>

                <tr><td style="height:12px;"></td></tr>

                <tr>
                  <td style="padding:16px;background:#f8f9ff;border-left:4px solid #0f3460;border-radius:0 8px 8px 0;">
                    <p style="margin:0;color:#1a1a2e;font-size:15px;font-weight:600;">🚀 A Platform Built to Grow With You</p>
                    <p style="margin:6px 0 0;color:#718096;font-size:14px;line-height:1.7;">
                      We are continuously improving Checkerist — from smarter client matching to better tools for managing your checks, reviews, and earnings. The best is yet to come.
                    </p>
                  </td>
                </tr>

                <tr><td style="height:12px;"></td></tr>

                <tr>
                  <td style="padding:16px;background:#f8f9ff;border-left:4px solid #38a169;border-radius:0 8px 8px 0;">
                    <p style="margin:0;color:#1a1a2e;font-size:15px;font-weight:600;">Turn Every Booking into More Revenue</p>
                    <p style="margin:6px 0 0;color:#718096;font-size:14px;line-height:1.7;">
                      Turn Every Booking into More Revenue
                      Earn extra income right after checking an accommodation.
                      Upsell additional travel services to the same client — effortlessly.
                      One request, multiple new revenue opportunities. 

                    </p>
                  </td>
                </tr>

              </table>

              <!-- Complete Setup CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#1a1a2e,#0f3460);border-radius:10px;margin-bottom:32px;">
                <tr>
                  <td style="padding:28px 32px;">
                    <p style="margin:0 0 8px;color:#e94560;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Next Step</p>
                    <p style="margin:0 0 16px;color:#ffffff;font-size:17px;font-weight:600;">Let’s Build This Together</p>
                    <p style="margin:0 0 20px;color:#a8b2c1;font-size:14px;line-height:1.7;">
                      Your feedback matters to us. Leave us a short message or share a thought that can help improve the process for everyone.
                    </p>
                    <a href="mailto:contact@checkerist.com"
                       style="display:inline-block;background:#e94560;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:700;">
                      Share Your Thoughts →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td style="padding:0 48px 40px;">
              <p style="margin:32px 0 4px;color:#1a1a2e;font-size:15px;font-weight:600;">Warm regards,</p>
              <p style="margin:0;color:#e94560;font-size:15px;font-weight:700;">The Checkerist Team</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f4f6f9;padding:24px 48px;border-top:1px solid #eef0f7;text-align:center;">
              <p style="margin:0 0 8px;color:#a0aec0;font-size:12px;">
                © ${new Date().getFullYear()} Checkerist. All rights reserved.
              </p>
              <p style="margin:0;color:#a0aec0;font-size:12px;">
                You received this email because you verified your account on Checkerist.<br/>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/privacy" style="color:#e94560;text-decoration:none;">Privacy Policy</a> &nbsp;·&nbsp;
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/terms" style="color:#e94560;text-decoration:none;">Terms of Service</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `.trim()
}