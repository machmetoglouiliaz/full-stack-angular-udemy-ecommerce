# Full Stack E-Commerce App – Angular + Spring Boot

This repository contains the full stack code for an **e-commerce web application** developed using **Angular (frontend)** and **Spring Boot (backend)**.  
It is based on the *Udemy - Full Stack: Angular and Spring Boot E-Commerce Website* course by **Chad Darby**, extended and customized as part of my portfolio to demonstrate full stack development skills.

---

## 🌟 Features

- Angular frontend with product catalog, shopping cart, checkout flow, and order history
- Spring Boot REST API backend for product, category, and order management
- MySQL database integration
- HTTPS enabled on both frontend and backend (SSL integration)
- Okta authentication and Stripe payments
- Example endpoints:
  - `https://localhost:8443/api/products` — REST API (secured)
  - `https://localhost:4200/` — Angular frontend

---

## 🚀 Technologies Used

- **Frontend:** Angular, TypeScript, HTML, CSS
- **Backend:** Java, Spring Boot, Spring Data JPA
- **Database:** MySQL
- **Authentication:** Okta
- **Payments:** Stripe
- **Build Tools:** Maven
- **IDE:** IntelliJ IDEA

---

## ⚙ Installation & Run

### Prerequisites

- Node.js: https://nodejs.org/en/download
- Angular CLI: `npm install -g @angular/cli`
- Java 17+
- MySQL + MySQL Workbench
- IntelliJ IDEA (Community edition is sufficient)
- Okta account: https://developer.okta.com/

---

### Backend Setup

- Open `./back-end` in IntelliJ.
- Add properties to `application-local.properties` (replace placeholders `<your-*>` with real values):
  
```
  spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver  
  spring.datasource.url=jdbc:mysql://<your-db-host>:<your-db-port>/<your-db-name>?useSSL=false&useUnicode=yes&characterEncoding=UTF-8&allowPublicKeyRetrieval=true&serverTimezone=UTC  
  spring.datasource.username=<your-db-username>  
  spring.datasource.password=<your-db-password>  

  okta.oauth2.client-id=<your-okta-client-id>  
  okta.oauth2.issuer=<your-okta-issuer-url>  

  server.ssl.key-alias=<your-key-alias>  
  server.ssl.key-store=classpath:<your-keystore-file>.p12  
  server.ssl.key-store-password=<your-keystore-password>  
  server.ssl.key-store-type=PKCS12  
```

- Generate keystore (adjust `-dname` values as desired):
  
```
  keytool -genkeypair -alias <your-alias> -keystore src/main/resources/<your-keystore-name>.p12 -keypass <your-key-password> -storeType PKCS12 -storepass <your-keystore-password> -keyalg RSA -keysize 2048 -validity 365 -dname "C=GR, ST=Xanthi, L=Xanthi, O=Machoi, OU=Training Backend, CN=localhost" -ext "SAN=dns:localhost"  
```

- Inspect keystore:  

  `keytool -list -v -alias <your-alias> -keystore src/main/resources/<your-keystore-name>.p12 -storepass <your-keystore-password>` 

- Execute SQL scripts from `./01-starter-files`.
- Create a run config, in IntelliJ:
  1. Go to Run Configurations (down arrow next to green play icon)
  2. Press `+` to add a new configuration
  3. Give it a name and select the main application class:  
     `com.mourat.udemy.spring_boot_ecommerce.SpringBootEcommerceApplication`
  4. Add this environment variable:  
     `SPRING_PROFILES_ACTIVE=local`
  5. Run the application using this configuration

---

### Frontend Setup

- In `./front-end`, create `ssl-localhost/` and file `localhost.conf`:

  [req]  
  prompt = no  
  distinguished_name = dn  

  [dn]  
  C = GR  
  ST = Xanthi  
  L = Xanthi  
  O = Machoi  
  OU = Training Backend  
  CN = localhost  

- Generate cert + key:  

  `openssl req -x509 -newkey rsa:2048 -keyout localhost.key -out localhost.crt -days 365 -nodes -config localhost.conf`

- Ensure `package.json` includes:  

  `"start": "ng serve --ssl=true --ssl-key=./ssl-localhost/localhost.key --ssl-cert=./ssl-localhost/localhost.crt"`  

- Add to `.gitignore`:  

  `ssl-localhost/` 

- Run:  

```
  npm install
  npm start
```

---

## 💡 Notes

- This project was built as part of my portfolio and learning journey.
- SSL certificates are self-signed for local development.
- Sensitive files (keystores, certs, keys) are excluded from version control.

---

## 📄 License & Usage

This repository is provided for **educational and portfolio purposes** only.  
Commercial use or redistribution is **not permitted** without prior consent.

---

## 📫 Contact

- **Email:** machmetoglouiliaz@gmail.com  
- **LinkedIn:** https://www.linkedin.com/in/maoi
