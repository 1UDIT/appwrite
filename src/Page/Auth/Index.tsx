import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router"
import { useState } from "react"
import { signInSchema } from "@/Schema/SigninSchema"
import { checkSessionAndLogin } from "@/lib/Auth"


const Index = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null); 

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: 'admin@admin.com',
      password: 'admin@1231',
    },
  });
 

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    console.log("login Submit")
    const session = await checkSessionAndLogin(data.identifier, data.password, navigate);
    // setSession(session)
    if (session?.$id !== undefined) {
      console.log("session", session, "login");
      navigate('/home');
    } else {
      setError('Invalid email or password.');
    }
  }

  const loginForm = () => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Welcome Back to True Feedback
            </h1>
            <p className="mb-4">Sign in to continue your secret conversations</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email/Username</FormLabel>
                    <Input {...field} required />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...field} required />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='w-full' type="submit">Sign In</Button>
            </form>
          </Form>
          <div className="text-center flex justify-center "> {error}</div>

        </div>
      </div>)
  }

  return loginForm();
}

export default Index
