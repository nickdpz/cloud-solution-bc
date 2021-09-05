resource "aws_lambda_permission" "api_invoke_signed_urls_lambda_permission" {
  statement_id  = "AllowExecutionFromApiGW"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.signed_urls_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_api_gateway_rest_api.main_rest_api.execution_arn}/*/POST/endpoint"
}

resource "aws_lambda_permission" "s3_invoke_verify_file_and_notify_lambda_permssion" {
  statement_id  = "AllowExecutionFromS3Bucket"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.verify_file_and_notify_lambda.arn
  principal     = "s3.amazonaws.com"
  source_arn    = aws_s3_bucket.main_bucket.arn
}