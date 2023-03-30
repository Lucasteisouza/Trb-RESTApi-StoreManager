# Back-end management of a fictional store using MSC architecture 

This repo was created as part of my formation in the Back-end modulo at @Trybe.

Our main goal was to create a small application capable of handling user requests following the http protocols, and following the Model, Service, Control architecture paradigm. To achieve this, the library Express and mysql2 were used.

All files in the src and tests folders were developed by me. the remainder of files was provided by @Trybe.

This project was developed in 3-4 days.

## How to run

1. Clone this repository
2. Run the .yaml file using `docker-compose up -d`
3. Execute the requisition using any req simulator (such as ThunderClient, Insomnia or PostMan)

## How to run the tests

1. Follow steps 1 and 2 above
2. Access the container with `docker exec -it ${container_name} sh` 
3. Once inside the container, run the tests with `npm run test:mocha`
