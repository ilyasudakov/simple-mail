import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { signIn } from "next-auth/react";

export function SplashScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-6 p-8 max-w-[400px]">
        <div className="space-y-2">
          <Mail className="w-12 h-12 mx-auto text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome to Plaintext Email
          </h1>
          <p className="text-muted-foreground">
            A clean and simple email client focused on what matters most - your
            messages.
          </p>
        </div>
        <Button size="lg" className="w-full" onClick={() => signIn("google")}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
