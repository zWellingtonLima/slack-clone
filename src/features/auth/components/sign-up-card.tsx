import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { SignInFlow } from "../types";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setPending(true);
    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onProviderSignUp = (value: "google" | "github") => {
    setPending(true);
    signIn(value).finally(() => setPending(false));
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader>
        <CardTitle>Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert size={4} />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5">
        <form onSubmit={onPasswordSignUp} className="space-y-2.5">
        <Input
            disabled={pending}
            value={name}
            placeholder="Full name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            disabled={pending}
            value={email}
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            disabled={pending}
            value={password}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            placeholder="Confirm password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2">
          <Button
            disabled={pending}
            onClick={() => onProviderSignUp("google")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="absolute left-2.5 top-3  size-5" />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => onProviderSignUp("github")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="absolute left-2.5 top-3 size-5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            onClick={() => setState("signIn")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};
