// appwriteConfig.js
import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('65003a663913a1c767bb'); // Replace with your Appwrite project ID

// Services
export const account = new Account(client);
export const databases = new Databases(client);
const storage = new Storage(client);

// export default client;

export { storage, client };
