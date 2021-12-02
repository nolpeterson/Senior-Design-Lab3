import { SMTPClient } from 'emailjs';

const client = new SMTPClient({
	user: 'user',
	password: 'password',
	host: 'smtp.your-email.com',
	ssl: true,
});

// send the message and get a callback with an error or details of the message that was sent
export function sendEmail(emails) {
  emails.forEach(email => {
    email = '<' + email + '>'
  });
  var str = ""
  emails.forEach(email => str = str + email + ', ')
  str = str.substring(0, str.length - 2);
  console.log(str)

  
  // client.send(
  //   {
  //     text: 'i hope this works',
  //     from: 'you <username@your-email.com>',
  //     to: 'someone <someone@your-email.com>, another <another@your-email.com>',
  //     subject: 'testing emailjs',
  //   },
  //   (err, message) => {
  //     console.log(err || message);
  //   }
  // );
}