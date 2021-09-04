provider "aws" {
  region = local.aws_region
}

provider "aws" {
  alias  = "ses"
  region = local.aws_region
}