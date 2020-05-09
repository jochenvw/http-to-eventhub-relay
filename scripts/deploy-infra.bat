az group deployment create --resource-group jvw-relay --template-file ../infra/infra.json --mode Complete
az group create --name jvw-relay --location westeurope
