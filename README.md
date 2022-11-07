# Paragon In-App Integrations Catalog


This repository accompanies a tutorial to build an in-app integrations catalog with the Paragon SDK. You can follow along the [step-by-step instructions in our docs](https://docs.useparagon.com/tutorials/building-an-in-app-integrations-catalog).

![](https://1096817338-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F-MCJwlyhqtCdBfCLUO0d-1223115691%2Fuploads%2FeKCe4RDVLLu0zlASwim5%2FScreen%20Recording.gif?alt=media&token=c76d8987-48e3-45d7-ac38-c732412f48ee)


---

⚠️ **Warning**: The demo repository signs Paragon User Tokens in the frontend application, which **should NOT be used in production**. Replace `getParagonUserToken` with your own app's Paragon User Token generation, which should be performed on your server only.



# Installation

Requires Node.js to be installed. 

```
npm install
```

This demo app also requires that your Paragon Project ID and Signing Key is specified in `hooks/useParagonAuth.ts` (but this should not be included in your production app).


# Running

Run the app with a React development server.

```
npm start
```