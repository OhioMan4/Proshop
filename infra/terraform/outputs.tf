output "server_public_ip" {
  value = aws_instance.devops_server.public_ip
}

output "ssh_command" {
  value = "ssh ubuntu@${aws_instance.devops_server.public_ip}"
}