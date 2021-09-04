# CloudWatch

resource "aws_iam_policy" "logging_policy" {
  name   = "${var.stack_id}-logging-policy"
  path   = "/"
  policy = data.aws_iam_policy_document.logging_policy_document.json
}

# SES

resource "aws_iam_user" "ses_user" {
  name = "${var.stack_id}-ses-user"
  path = "/"
  tags = local.common_tags

  lifecycle {
    ignore_changes = [
      tags,
      tags.created,
    ]
  }
}

resource "aws_iam_user_policy" "ses_user_policy" {
  name   = "AmazonSesSendingAccess"
  user   = aws_iam_user.ses_user.name
  policy = data.aws_iam_policy_document.ses_sendemail_policy_document.json
}

# Lambdas

# 1
resource "aws_iam_role" "signed_urls_lambda_role" {
  name               = "${var.stack_id}-signed-url-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy_document.json
}

resource "aws_iam_policy" "signed_urls_lambda_policy" {
  name   = "${var.stack_id}-signed-urls-policy"
  policy = data.aws_iam_policy_document.signed_urls_lambda_policy_document.json
}

resource "aws_iam_role_policy_attachment" "signed_urls_lambda_policy_attachment" {
  role       = aws_iam_role.signed_urls_lambda_role.name
  policy_arn = aws_iam_policy.signed_urls_lambda_policy.arn
}

resource "aws_iam_role_policy_attachment" "signed_urls_lambda_logs_policy_attachment" {
  role       = aws_iam_role.signed_urls_lambda_role.name
  policy_arn = aws_iam_policy.logging_policy.arn
}

# 2
resource "aws_iam_role" "verify_file_and_notify_lambda_role" {
  name               = "${var.stack_id}-verify-file-and-notify-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy_document.json
}

resource "aws_iam_policy" "verify_file_and_notify_lambda_policy" {
  name   = "${var.stack_id}-verify-file-and-nofify-policy"
  policy = data.aws_iam_policy_document.verify_file_and_notify_lambda_policy_document.json
}

resource "aws_iam_role_policy_attachment" "verify_file_and_notify_lambda_policy_attachment" {
  role       = aws_iam_role.verify_file_and_notify_lambda_role.name
  policy_arn = aws_iam_policy.verify_file_and_notify_lambda_policy.arn
}

resource "aws_iam_role_policy_attachment" "verify_file_and_notify_lambda_logs_policy_attachment" {
  role       = aws_iam_role.verify_file_and_notify_lambda_role.name
  policy_arn = aws_iam_policy.logging_policy.arn
}
