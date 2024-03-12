# Project Title

## Overview

This project is an extension of the base project [FoodReady](https://github.com/jyjoshi/cms). 
This component of the Canteen Management System utilizes cloud functions to implement serverless triggers for real-time notifications to canteens and customers. 
It also facilitates seamless backend updates, ensuring that all stakeholders have the latest information without the need for constant polling or manual updates.

## Setup and Deployment 

### Prerequisites
- Ensure you have Node.js installed on your local development machine.
- You should have access to Firebase or a similar platform that supports the deployment of cloud functions.

### Installing Dependencies
- Clone the project repository to your local machine.
- Navigate to the cloud functions directory within the project:
    ```
    cd path/to/fr_functions-main
    ```
- Install the required dependencies as defined in package.json by running:
    ```
    npm install
    ```

### Deploying Functions
- Login to Firebase using the Firebase CLI. If you're using a different provider, ensure you're logged in to their service:
    ```
    firebase login
    ```
- Once logged in and your project is set up on Firebase, deploy the cloud functions using the following command:
    ```
    firebase deploy --only functions
    ```
  Adjust the command if you're using a cloud service other than Firebase, following their respective CLI documentation.

## Functionality 
1. **Notifications**: The cloud functions automatically send notifications to both customers and canteens regarding order statuses, updates, and other important events, reducing the need for manual updates.
2. **Backend Updates**: They handle the processing of data changes in the backend, ensuring that updates are reflected promptly across the platform.

## Contributing
We welcome contributions to improve the cloud functions or add new features. Please adhere to coding standards and submit your pull requests for review.


## Authors

- **Jay Joshi** - *Initial Prototype* - [Jay Joshi](https://github.com/jyjoshi)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
- Inspiration: Long waiting queues at college canteens resulting in students being late to lectures after lunch breaks.
