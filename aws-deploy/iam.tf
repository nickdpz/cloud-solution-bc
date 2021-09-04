resource "aws_iam_role" "signed_urls_lambda_role" {
  name               = "${var.stack_id}-signed-url-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role_policy
}

resource "aws_iam_policy" "signed_urls_lambda_policy" {
  name   = "${var.stack_id}-signed-urls-policy"
  policy = data.aws_iam_policy_document.signed_urls_lambda_policy.json
}

resource "aws_iam_role_policy_attachment" "signed_urls_lambda_policy_attachment" {
  role       = aws_iam_role.signed_urls_lambda_role.name
  policy_arn = aws_iam_policy.signed_urls_lambda_policy.arn
}

