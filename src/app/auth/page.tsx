import { redirect } from "next/navigation";

import { LoginForm } from "@/components/loginForm";
import { RegisterForm } from "@/components/registerForm";
import { ModeToggle } from "@/components/toggleTheme";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createClient } from "@/lib/supabase/server";

export async function AuthPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getSession();
  if (data.session?.access_token) {
    redirect("/dashboard");
  }

  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <h1 className="text-primary text-center text-4xl font-bold">
          Brasilink<span className="text-muted-foreground text-sm">&copy;</span>
        </h1>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Log in and discover a new way to connect with your clients.
                </CardDescription>
              </CardHeader>
              <LoginForm />
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>
                  Create your Brasilink account here.
                </CardDescription>
              </CardHeader>
              <RegisterForm />
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="absolute right-4 bottom-4">
        <ModeToggle />
      </div>
    </div>
  );
}

export default AuthPage;
