export function EmailVerification(from: string, to: string, verificationLink: string) {
    return {
        from,
        to,
        subject: "Email Verification",
        html: `
                <div style="font-family: Arial, sans-serif; padding: 10px;">
                 <h2>Hello,</h2>
                 <p>Thank you for registering on our platform!</p>
                 <p>Please click the button below to verify your email address:</p>
                 <a 
                   href="${verificationLink}" 
                   style="
                     display: inline-block;
                     margin-top: 10px;
                     padding: 10px 20px;
                     background-color: #2e86de;
                     color: white;
                     text-decoration: none;
                     border-radius: 5px;
                   "
                 >Verify Email</a>
                 <p style="margin-top: 20px;">This link will expire in <strong>10 minutes</strong>.</p>
                 <p>If you did not create an account, you can safely ignore this email.</p>
                 <br/>
                 <p>Thanks,</p>
                 <p><strong>URL SHORTENER</strong></p>
                </div>
    `,
    }
}
