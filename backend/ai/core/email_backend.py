from django.core.mail.backends.smtp import EmailBackend
import smtplib
import ssl
import certifi

class CustomEmailBackend(EmailBackend):
    def open(self):
        if self.connection:
            return False

        try:
            # Create custom SSL context using certifi
            context = ssl.create_default_context(cafile=certifi.where())
            context.check_hostname = False
            context.verify_mode = ssl.CERT_NONE

            # Establish SMTP connection
            self.connection = smtplib.SMTP(
                host=self.host,
                port=self.port,
                timeout=self.timeout
            )

            if self.use_tls:
                self.connection.starttls(context=context)

            if self.username and self.password:
                self.connection.login(self.username, self.password)

            return True

        except Exception as e:
            self.connection = None
            if not self.fail_silently:
                raise e
            return False
