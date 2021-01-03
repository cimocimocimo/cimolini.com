terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    bucket = "cimo-terraform-state"
    key    = "sites/cimolini.com"
    region = "us-east-1"
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "main" {
  bucket        = "cimolini.com"
  acl           = "public-read"
  force_destroy = false

  versioning {
    enabled    = false
    mfa_delete = false
  }

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

resource "aws_route53_zone" "primary" {
  name = "cimolini.com"
  tags = {}
}

resource "aws_route53_record" "main" {
  name    = "cimolini.com"
  type    = "A"
  zone_id = aws_route53_zone.primary.id

  alias {
    evaluate_target_health = false
    name                   = "s3-website-us-east-1.amazonaws.com"
    zone_id                = aws_s3_bucket.main.hosted_zone_id
  }

  depends_on = [
    aws_s3_bucket.main
  ]
}
resource "aws_route53_record" "mail" {
  name = "cimolini.com"
  records = [
    "1 ASPMX.L.GOOGLE.COM",
    "10 ASPMX2.GOOGLEMAIL.COM",
    "10 ASPMX3.GOOGLEMAIL.COM",
    "5 ALT1.ASPMX.L.GOOGLE.COM",
    "5 ALT2.ASPMX.L.GOOGLE.COM",
  ]
  ttl     = 86400
  type    = "MX"
  zone_id = aws_route53_zone.primary.id
}

resource "aws_route53_record" "google_site_verification" {
  name = "cimolini.com"
  records = [
    "google-site-verification=azEBIP6cpy6R4yp1IF8A-rndKY_FBqAkdwkCDSRvg2A",
  ]
  ttl     = 86400
  type    = "TXT"
  zone_id = aws_route53_zone.primary.id
}

resource "aws_route53_record" "catch_all" {
  name = "*.cimolini.com"
  records = [
    "cimolini.com",
  ]
  ttl     = 86400
  type    = "CNAME"
  zone_id = aws_route53_zone.primary.id
}
