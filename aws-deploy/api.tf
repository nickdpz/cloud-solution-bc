resource "aws_api_gateway_rest_api" "main_rest_api" {
  body = local.api_gateway_body

  name = "${local.stack_id}-main-api"

  endpoint_configuration {
    types = ["REGIONAL"]
  }

  tags = local.common_tags
}