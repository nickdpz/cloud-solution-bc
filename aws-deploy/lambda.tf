resource "aws_lambda_function" "signed_urls_lambda" {
  function_name = "${local.stack_id}-signed-urls"
  role          = aws_iam_role.signed_urls_lambda_role.arn
  handler       = "exports.handler"
  runtime       = "nodejs14.x"
  tags          = local.commons_tags
}
