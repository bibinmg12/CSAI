import smtplib
from email.message import EmailMessage

msg = EmailMessage()
msg.set_content("Test email from Python")
msg["Subject"] = "Test Email"
msg["From"] = "bibincsai@gmail.com"
msg["To"] = "your_email@example.com"

server = smtplib.SMTP("smtp.gmail.com", 587)
server.starttls()
server.login("bibincsai@gmail.com", "")  # paste app password
server.send_message(msg)
server.quit()
