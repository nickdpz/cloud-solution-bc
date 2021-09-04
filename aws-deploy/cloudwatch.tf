resource "aws_cloudwatch_log_group" "lambda_signed_url_log_group" {
  name              = "/aws/lambda/${var.stack_id}-signed-urls"
  retention_in_days = 1
}

resource "aws_cloudwatch_log_group" "lambda_verify_file_and_notify_log_group" {
  name              = "/aws/lambda/${var.stack_id}-verify-file-and-notify"
  retention_in_days = 1
}