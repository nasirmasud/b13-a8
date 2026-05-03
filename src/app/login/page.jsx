"use client";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GrGoogle } from "react-icons/gr";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
      callbackURL: callbackUrl,
    });

    if (!error) {
      router.push(callbackUrl);
    }
    console.log(data, error);
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-10">
      {/* Card width changed to responsive classes */}
      <Card className="border w-full max-w-[450px] p-6 md:p-10 border-gray-300 shadow-sm">
        <h1 className="text-center text-2xl font-bold mb-8">Login to SkillSphere</h1>

        {/* Form width now fills the container */}
        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            className="w-full"
            validate={(value) => {
              if (value.length < 8) return "Password must be at least 8 characters";
              if (!/[A-Z]/.test(value)) return "Need an uppercase letter";
              if (!/[0-9]/.test(value)) return "Need a number";
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Min. 8 chars with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button
              type="submit"
              className="flex-1 bg-[#1e1b4b] text-white hover:bg-indigo-900 h-11 rounded-xl"
            >
              <Check />
              Login
            </Button>
            <Button
              type="reset"
              variant="secondary"
              className="flex-1 text-[#1e1b4b] border border-gray-300 h-11 rounded-xl"
            >
              Reset
            </Button>
          </div>
        </Form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500 font-medium">OR</span>
          </div>
        </div>

        <div className="flex justify-center w-full">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full rounded-xl bg-transparent text-slate-900 border border-[#1e1b4b] hover:bg-[#1e1b4b] hover:text-white transition-all font-montserrat h-11"
          >
            <GrGoogle className="text-lg" />
            Login With Google
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link href="/registration" className="text-indigo-600 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </Card>
    </div>
  );
}