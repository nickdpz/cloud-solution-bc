## Configure AWS

```sh
$ export AWS_ACCESS_KEY_ID=""
$ export AWS_SECRET_ACCESS_KEY=""
```

## Terraform deploy 

- Validate
```sh
$ terraform validate
```

- Plan
```sh
$ terraform plan -var-file ./config/default.tfvars
```

- Apply
```sh
$ terraform apply -var-file ./config/default.tfvars
```