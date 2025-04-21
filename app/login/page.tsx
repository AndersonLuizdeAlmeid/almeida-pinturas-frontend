"use client";

import { PasswordInput } from "../components/password-input";
import { useState } from "react";
import "../globals.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/components/ui/card";
import { Label } from "@/app/components/components/ui/label";
import { Input } from "@/app/components/components/ui/input";
import { Button } from "@/app/components/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      console.log(email, password);
      await signIn(email, password);
      toast.success("Acesso liberado!");
      router.push("/users");
    } catch {
      toast.error("Email ou senha incorretos!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-b from-foreground via-foreground to-background">
      <Card className="w-[350px]">
        <CardHeader className="flex flex-col items-center justify-center">
          <img
            src="/assets/logo.jpeg"
            alt="Logo Almeida Pinturas"
            className="w-40 h-auto mx-auto"
          />
          <CardTitle>ALMEIDA PINTURAS</CardTitle>
          <CardDescription>Entrar</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input
                  id="name"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Senha</Label>
                <PasswordInput
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className=" items-center justify-center">
          <Button onClick={handleLogin}>Entrar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
