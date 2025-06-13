# users/utils.py
from django.core.mail import send_mail
from django.conf import settings

def send_otp_email(email, otp_code):
    subject = "Verify Your Email - Thusha Optical"
    message = f"Your verification code is: {otp_code}"
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    
    send_mail(subject, message, email_from, recipient_list)