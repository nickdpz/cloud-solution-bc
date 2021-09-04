data "aws_iam_policy_document" "lambda_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "signed_urls_lambda_policy" {
  statement {
    actions   = ["s3:Get*"]
    resources = ["${aws_s3_bucket.main_bucket.arn}/*", aws_s3_bucket.main_bucket.arn]
  }
}

