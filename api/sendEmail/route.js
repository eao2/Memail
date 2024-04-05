'use server';

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getServerSession } from 'next-auth/next';
import supabase from '../../../lib/supabaseClient';

export async function POST(request) {
    try {
        const { email, subject, message, to, tem, Fb, Insta } = await request.json();
        
        const { data, error } = await supabase
            .from('email')
            .select('pass')
            .eq('email', email)
            .single();
        
        if (error) {
            console.error('Error retrieving data:', error.message);
            return NextResponse.json({ message: 'Failed to retrieve password' }, { status: 500 });
        } else {
            if (!data) {
                console.log('No data found for the specified email.');
                return NextResponse.json({ message: 'No data found for the specified email' }, { status: 404 });
            }

            const pass = data.pass;

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: email,
                    pass: pass,
                },
            });

            const mailOption = {
                from: email,
                to: to,
                subject: subject,
                html: `
                <center class="su-body" style="background: #F7F0DE; width: 100%; height: 100%;">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
                    *{
                        margin: 0;
                        padding: 0;
                    }
                </style>
                <div class="box dark-back" style="background: #FFFFFF; max-width: 600px;">
                    <table style="padding: 16px;">
                        <tr style="width: auto;">
                            <td class="dark-top" style="border-radius: 16px; width: 100%;">
                                <div class="image" style="width: auto; height: 100%;">
                                    <img src="https://i.imgur.com/ZPfHz0p.png" style="width: 100%; border: 16px;" alt="">
                                </div>
                            </td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="padding: 16px 0;">
                                <h1 class="dark-txt" style="color: #1f1f1f; font-family: 'Inter', sans-serif; font-weight: 700; font-size: 24px; text-align: center; margin: 0;">
                                    ${subject}
                                </h1>
                            </td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="padding: 8px 8px 24px 8px;">
                                <p class="dark-txt" style="color: #1f1f1f; font-family: 'Inter', sans-serif; font-weight: 500; font-size: 16px; text-align: center; margin: 0;">
                                    ${message}
                                </p>
                            </td>
                        </tr>
                        <tr style="width: 100%;">
                            <td>
                                <div class="dark-back-btn" style="width: 100%; height: 1px; background-color: #1f1f1f;"></div>
                            </td>
                        </tr>
                        <tr style="width: 100%;">
                            <td align="center">
                                <table style="padding: 32px 0;">
                                    <tr>
                                        <td>
                                            <a href="${Fb}" style="margin: 0 12px; display: inline-block;">
                                                <div class="dark-back-btn" style="border-radius: 32px; height: 48px; width: 48px; border: 1px solid #1f1f1f;">
                                                    <img class="img" src="https://i.imgur.com/c9l4H1E.png" style="width: 24px; height: 24px; margin: 12px;" alt="">
                                                </div>
                                            </a>
                                        </td>
                                        <td>
                                            <a href="${Insta}" style="margin: 0 12px; display: inline-block;">
                                                <div class="dark-back-btn" style="border-radius: 32px; height: 48px; width: 48px; border: 1px solid #1f1f1f;">
                                                    <img class="img" src="https://i.imgur.com/khWMV1G.png" style="width: 24px; height: 24px; margin: 12px;" alt="">
                                                </div>
                                            </a>
                                        </td>
                                        <td>
                                            <a href="mailto:${email}" style="margin: 0 12px; display: inline-block;">
                                                <div class="dark-back-btn" style="border-radius: 32px; height: 48px; width: 48px; border: 1px solid #1f1f1f;">
                                                    <img class="img" src="https://i.imgur.com/lvzqOgI.png" style="width: 24px; height: 18px; margin: 15px 12px;" alt="">
                                                </div>
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="padding: 16px 0;">
                                <p class="dark-txt" style="color: #1f1f1f; font-family: 'Inter', sans-serif; font-weight: 400; font-size: 14px; text-align: center; margin: 0;">
                                    © Memail mn 2024
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
            </center>
                    `};

            // Sending email
            await transporter.sendMail(mailOption);

            return NextResponse.json({ message: 'Email Sent Successfully' }, { status: 200 });
        }
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Failed to Send Email' }, { status: 500 });
    }
}
