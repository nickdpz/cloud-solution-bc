data "aws_iam_policy_document" "lambda_assume_role_policy_document" {
  statement {
    actions = ["sts:AssumeRole"]
    effect  = "Allow"
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "logging_policy_document" {
  statement {
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    effect    = "Allow"
    resources = ["arn:aws:logs:*:*:*"]
  }
}

data "aws_iam_policy_document" "signed_urls_lambda_policy_document" {
  statement {
    actions = ["s3:Get*"]
    resources = [
      "${aws_s3_bucket.main_bucket.arn}/request",
      aws_s3_bucket.main_bucket.arn
    ]
  }
}

data "aws_iam_policy_document" "verify_file_and_notify_lambda_policy_document" {
  statement {
    actions = ["s3:Put*", "s3:Get*"]
    resources = [
      "${aws_s3_bucket.main_bucket.arn}/response",
      "${aws_s3_bucket.main_bucket.arn}/result",
      aws_s3_bucket.main_bucket.arn
    ]
  }

  statement {
    actions = [
      "ses:SendEmail",
      "ses:SendRawEmail",
    ]
    resources = ["*"]
  }
}

data "aws_iam_policy_document" "ses_sendemail_policy_document" {
  statement {
    actions = [
      "ses:SendEmail",
      "ses:SendRawEmail",
    ]
    resources = ["*"]
  }
}
