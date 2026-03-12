variable "aws_region" {
  default = "ap-southeast-1"
}

variable "instance_type" {
  default = "t3.small"
}

variable "ami_id" {
  description = "Ubuntu 22.04 AMI"
}

variable "key_name" {
  description = "AWS key pair name"
}