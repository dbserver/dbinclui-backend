import firebase from "firebase-admin";

export class FirebaseApplication {
  private app: firebase.app.App | typeof firebase;

  constructor() {
    this.app = this.initializeApp();
  }

  private initializeApp() {
    if (firebase.apps.length === 0) {
      const credentials = JSON.stringify({
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      });

      const firebaseApp = firebase.initializeApp({
        credential: firebase.credential.cert(JSON.parse(credentials)),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      });

      return firebaseApp;
    }

    return firebase;
  }

  get auth() {
    return this.app.auth();
  }
}
