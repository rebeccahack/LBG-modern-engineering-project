provider "aws" {
    region = "us-east-1"
}

resource "aws_dynamodb_table" "cars" {
    name = "Cars"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "id"

    attribute {
        name = "id"
        type = "S"
    }

    tags = {
        Name = "CarsTable"
    }
}

resource "aws_dynamodb_table" "employees" {
    name = "Employees"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "id"

    attribute {
        name = "id"
        type = "S"
    }

    tags = {
        Name = "EmployeesTable"
    }
}

resource "aws_dynamodb_table" "journeys" {
    name = "Journeys"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "id"

    attribute {
        name = "id"
        type = "S"
    }

    tags = {
        Name = "JourneysTable"
    }
}

resource "aws_dynamodb_table" "journey_passengers" {
    name = "JourneyPassengers"
    billing_mode = "PAY_PER_REQUEST"
    hash_key = "id"

    attribute {
        name = "id"
        type = "S"
    }

    tags = {
        Name = "JourneyPassengersTable"
    }
}