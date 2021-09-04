resource "aws_s3_bucket" "main_bucket" {
  bucket = "${var.stack_id}-main-bucket"
  acl    = "private"
  versioning {
    enabled = false
  }

  lifecycle_rule {
    id      = "json-response"
    enabled = true
    prefix  = "response/"
    expiration {
      days = 1
    }
  }
  tags = merge({ "Name" : "${var.stack_id}-main-bucket" }, local.common_tags)
}

resource "aws_s3_bucket" "main_bucket_policy" {
  bucket = aws_s3_bucket.main_bucket.id
  policy = <<EOF
{
   "Version":"2012-10-17",
   "Statement":[
      {
         "conditions":[
            ["content-length-range", 1000, 20000]
         ]
      }
   ]
}
EOF
}

resource "aws_s3_bucket_notification" "main_bucket_notification" {
  bucket = aws_s3_bucket.main_bucket.id

  lambda_function {
    lambda_function_arn = aws_lambda_function.verify_file_and_notify_lambda.arn
    events              = ["s3:ObjectCreated:*"]
    filter_prefix       = "request/"
    filter_suffix       = ".csv"
  }

  depends_on = [aws_lambda_permission.s3_invoke_verify_file_and_notify_lambda_permssion]
}