import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, budget, message } = body

    // Validation
    if (!name || !email || !message || !budget) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // TODO: Send email using Resend, SendGrid, or Nodemailer
    // Example with Resend:
    // const { data, error } = await resend.emails.send({
    //   from: 'a88studio <onboarding@resend.dev>',
    //   to: ['hello@a88studio.com'],
    //   subject: `New Contact Form Submission from ${name}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${name}</p>
    //     <p><strong>Email:</strong> ${email}</p>
    //     <p><strong>Company:</strong> ${company || 'N/A'}</p>
    //     <p><strong>Budget:</strong> ${budget}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${message}</p>
    //   `,
    // })

    // For now, just log it
    console.log('Contact form submission:', { name, email, company, budget, message })

    // Simulate success
    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
