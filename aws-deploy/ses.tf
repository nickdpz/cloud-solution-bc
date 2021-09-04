resource "aws_ses_email_identity" "main_ses_mail_sender" {
  provider = aws.ses
  email    = var.mail_sender
}