resource "aws_s3_bucket" "main_bucket" {
  bucket = "{var.stack_id}-main-bucket"
  acl    = "private"
  versioning {
    enabled = false
  }
  tags = merge({ "Name" : "${var.stack_id}-main-bucket" }, local.common_tags)

  lifecycle_rule {
    id      = "json-responses"
    enabled = true
    prefix  = "responses/"
    expiration {
      days = 1
    }
  }
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