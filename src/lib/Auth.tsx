import { account, storage } from "./configDatabase";

 
 

export async function checkSessionAndLogin(email:string, password:string) {
    try {
      // Check if a session already exists
      await account.get();
      console.log('User already logged in:');
      // Optionally, navigate to home or another screen 
    } catch (error:any) {
      // If there's no active session, attempt to log in
      if (error.code === 401) { // Unauthorized error means no active session
        try {
          const newSession = await account.createEmailPasswordSession(email, password);  
          return newSession;
          // Navigate to home after successful login 
        } catch (loginError:any) {
          console.error('Login error:', loginError.message);
          // Handle the login error (e.g., show a message to the user)
        }
      } else {
        console.error('Error checking session:', error.message);
        // Handle other errors accordingly
      }
    }
  }