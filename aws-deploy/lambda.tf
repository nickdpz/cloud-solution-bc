resource "aws_lambda_function" "signed_urls_lambda" {
  function_name = "${var.stack_id}-signed-urls"
  role          = aws_iam_role.signed_urls_lambda_role.arn
  handler       = "exports.handler"
  runtime       = "nodejs14.x"
  source_code_hash = filebase64sha256("./files/main.zip")
  tags          = local.common_tags

  depends_on = [
    aws_iam_role_policy_attachment.verify_file_and_notify_lambda_logs_policy_attachment,
    aws_cloudwatch_log_group.lambda_signed_url_log_group,
  ]
}

resource "aws_lambda_function" "verify_file_and_notify_lambda" {
  function_name = "${var.stack_id}-verify-file-and-notify"
  role          = aws_iam_role.verify_file_and_notify_lambda_role.arn
  handler       = "exports.handler"
  runtime       = "nodejs14.x"
  source_code_hash = filebase64sha256("./files/main.zip")
  tags          = local.common_tags

  depends_on = [
    aws_iam_role_policy_attachment.verify_file_and_notify_lambda_logs_policy_attachment,
    aws_cloudwatch_log_group.lambda_verify_file_and_notify_log_group,
  ]
}