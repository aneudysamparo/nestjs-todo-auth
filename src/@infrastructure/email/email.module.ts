import { Global, Module } from '@nestjs/common';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { EmailService } from './email.service';

const mytransport = {
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "573a09afa779b0123",
      pass: "123b7007c194cbc60"
    },
  }


@Global()
@Module({
    providers: [EmailService],
    exports: [EmailService],
    imports: [MailerModule.forRootAsync({
        useFactory: () => ({
          transport: "smtp://573a09afa779b0123:123b7007c194cbc60@smtp.mailtrap.io:2525",
          defaults: {
            from:'"TodoApp" <no-reply@todoapp.test>',
          },
          template: {
            dir: __dirname + '/templates',
            adapter: new HandlebarsAdapter(), // or new PugAdapter()
            options: {
              strict: true,
            },
          },
        }),
      }), 
    ],
})
export class EmailModule {

}
