#!/bin/sh

#This program creates test data on DynamoDB

echo "Creating test products on DB..."

aws dynamodb put-item --table-name products --item '{"id": {"N":"0"},"title":{"S": "Pen"},"description":{"S": "A simple pen"},"price":{"N": "1.25"}}'
aws dynamodb put-item --table-name stock --item '{"product_id": {"N":"0"},"count":{"N": "40"}}'

aws dynamodb put-item --table-name products --item '{"id": {"N":"1"},"title":{"S": "Notebook"},"description":{"S": "A simple notebook"},"price":{"N": "2.25"}}'
aws dynamodb put-item --table-name stock --item '{"product_id": {"N":"1"},"count":{"N": "50"}}'

aws dynamodb put-item --table-name products --item '{"id": {"N":"2"},"title":{"S": "Red Notebook"},"description":{"S": "notebook with red cover"},"price":{"N": "2.25"}}'
aws dynamodb put-item --table-name stock --item '{"product_id": {"N":"2"},"count":{"N": "10"}}'

aws dynamodb put-item --table-name products --item '{"id": {"N":"3"},"title":{"S": "Blue Notebook"},"description":{"S": "notebook with blue cover"},"price":{"N": "2.25"}}'
aws dynamodb put-item --table-name stock --item '{"product_id": {"N":"3"},"count":{"N": "15"}}'

aws dynamodb put-item --table-name products --item '{"id": {"N":"4"},"title":{"S": "Green Notebook"},"description":{"S": "notebook with green cover"},"price":{"N": "2.25"}}'
aws dynamodb put-item --table-name stock --item '{"product_id": {"N":"4"},"count":{"N": "8"}}'

aws dynamodb put-item --table-name products --item '{"id": {"N":"5"},"title":{"S": "Pencil"},"description":{"S": "A simple pencil"},"price":{"N": "1"}}'
aws dynamodb put-item --table-name stock --item '{"product_id": {"N":"5"},"count":{"N": "80"}}'

aws dynamodb put-item --table-name products --item '{"id": {"N":"6"},"title":{"S": "Eraser"},"description":{"S": "A simple eraser"},"price":{"N": "0.30"}}'
aws dynamodb put-item --table-name stock --item '{"product_id": {"N":"6"},"count":{"N": "35"}}'

aws dynamodb put-item --table-name products --item '{"id": {"N":"7"},"title":{"S": "Chemistry Book"},"description":{"S": "The default chemistry book"},"price":{"N": "8"}}'
aws dynamodb put-item --table-name stock --item '{"product_id": {"N":"7"},"count":{"N": "20"}}'

aws dynamodb put-item --table-name products --item '{"id": {"N":"8"},"title":{"S": "Math Book"},"description":{"S": "The default math book"},"price":{"N": "10"}}'
aws dynamodb put-item --table-name stock --item '{"product_id": {"N":"8"},"count":{"N": "30"}}'

aws dynamodb put-item --table-name products --item '{"id": {"N":"9"},"title":{"S": "Biology Book"},"description":{"S": "The default biology book"},"price":{"N": "15"}}'
aws dynamodb put-item --table-name stock --item '{"product_id": {"N":"9"},"count":{"N": "10"}}'

echo "Test products created"
