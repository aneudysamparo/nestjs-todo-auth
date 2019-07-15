import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';
import * as Mailgen from 'mailgen';

@Injectable()
export class EmailService {
    constructor(private readonly mailerService: MailerService) {}

    generateMail() {
        // Configure mailgen by setting a theme and your product info
        var mailGenerator = new Mailgen({
            theme: 'salted',
            product: {
                // Appears in header & footer of e-mails
                name: 'TODOAPP',
                link: 'https://mailgen.js/',
                // Optional product logo
                logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
                copyright: 'Copyright © 2019 <a href="https://aneudysamparo.com" target="_blank"><strong>TODOAPP</strong></a>. All rights reserved.',
            },
        });

        var email = {
            body: {
                greeting: 'Dear',
                name: 'Aneudys Amparo',
                intro: ['Welcome to TodoApp!', 'We\'re very excited to have you on board.'],
                dictionary: {
                    date: 'June 11th, 2016',
                    address: '123 Park Avenue, Miami, Florida'
                },
                table: {
                    data: [
                        {
                            item: 'Node.js',
                            description: 'Event-driven I/O server-side JavaScript environment based on V8.',
                            price: '$10.99'
                        },
                        {
                            item: 'Mailgen',
                            description: 'Programmatically create beautiful e-mails using plain old JavaScript.',
                            price: '$1.99'
                        },
                        {
                            item: 'Mailgen',
                            description: 'Programmatically create beautiful e-mails using plain old JavaScript.',
                            price: '$1.99'
                        }
                    ],
                    columns: {
                        // Optionally, customize the column widths
                        customWidth: {
                            item: '20%',
                            price: '15%'
                        },
                        // Optionally, change column text alignment
                        customAlignment: {
                            price: 'right'
                        }
                    }
                },        
                action: [
                    {
                        instructions: 'To get started with Mailgen, please click here:',
                        button: {
                            color: '#22BC66',
                            text: 'Confirm your account',
                            link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
                        }
                    },
                    {
                        instructions: 'To read our frequently asked questions, please click here:',
                        button: {
                            text: 'Read our FAQ',
                            link: 'https://mailgen.js/faq'
                        }        
                    }
                ],
                goToAction: {
                    text: 'Go to Dashboard',
                    link: 'https://mailgen.com/confirm?s=d9729feb74992cc3482b350163a1a010',
                    description: 'Check the status of your order in your dashboard'
                },
                signature: 'Sincerely',
                outro: ['Need help, or have questions?', 'Just reply to this email, we\'d love to help.'],
            },
        };

        // Generate an HTML email with the provided contents
        var emailBody = mailGenerator.generate(email);
        console.log('HTML generated...');
        // Generate the plaintext version of the e-mail (for clients that do not support HTML)
        var emailText = mailGenerator.generatePlaintext(email);

        require('fs').writeFileSync('preview.html', emailBody, 'utf8');
        console.log('File generated...');

        this.processEmailMQ(emailText, emailBody);
    }


    private processEmailMQ(emailText, emailBody){
        this.mailerService
        .sendMail({
            to: 'test@nestjs.com', // sender address
            from: 'noreply@nestjs.com', // list of receivers
            subject: 'Testing Nest MailerModule ✔', // Subject line
            text: emailText, // plaintext body
            html: emailBody, // HTML body content
        })
        .then(send => {
            console.log(send);
        })
        .catch(err => {
            console.log(err);
        });
    }
}
