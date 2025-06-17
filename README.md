# Udemy - Full Stack: Angular and Spring Boot E-Commerce Website
## E-commerce website full stack code v1.0
- By Chad Darby
- Link: https://www.udemy.com/course/full-stack-angular-spring-boot-tutorial

## How to install and run
- Install the node.js: https://nodejs.org/en/download
- Install the Angular 19 CLI (The ng-bootstrap 18 to work has dependency to Angular 19, the moment of this commit it's the newest version of ng-bootstrap):
```
npm install -g @angular/cli@19
```
- Pull the project to a folder
- Download the starter files from: 
```
www.luv2code.com/ecommerce-release-2.0-starter-files
```
- Add images folder from starter files to front-end/public (so the images directory must be ./front-end/public/images/products)
- Add the logo from downloaded starter files templates/assets/images/logo.png to ./front-end/public/images
- Install IntelliJ community for back-end
- Open ./back-end folder with IntelliJ
- Install MySQL and MySQL workbench
- Login as root and run scripts under ./01-starter-files and the scripts you downloaded from luv2code.com
- Run with IntelliJ the app:
```
./back-end/src/main/java/com/mourat/udemy/spring_boot_ecommerce/SpringBootEcommerceApplication
```
- Open a command line in the folder ./front-end and execute the command below:
```
ng serve
```
- For testing connect to localhost:8080/api/products -> Must return a list of products
- Use localhost:4200 to reach the ecommerce website