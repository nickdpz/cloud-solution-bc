resource "aws_s3_bucket" "main_bucket" {
  bucket = "{local.stack_id}-main-bucket"
  acl    = "private"
  versioneing {
    enabled = false
  }
  tags = merge(local.commons_tags, map("Name", "${local.stack_id}-main-bucket"))

  lifecycle_rule {
    id      = "json-responses"
    enabled = true
    prefix  = "responses/"
    expiration = {
      minutes = 30
    }
  }
}

resource "aws_s3_bucket" "main_bucket_policy" {
  bucket = aws_s3_bucket.main_bucket.id
  policy = data.aws_iam_policy_document.s3_main_policy_document.json
}