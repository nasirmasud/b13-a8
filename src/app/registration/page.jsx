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
import { useRouter } from "next/navigation";
import { GrGoogle } from "react-icons/gr";
import { toast } from "react-toastify";

export default function Registration() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
      image,
      callbackURL: "/login",
    });
    if (error) {
      toast.error(error.message || "Registration failed! Try again.");
      return;
    }
    await authClient.signOut();
    if (!error) {
      toast.success("Account created successfully! Redirecting to login...");
      router.push("/login");
    }
  };

  const handleGoogleSignIn = async () => {
    toast.info("Redirecting to Google login...");
    await authClient.signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    }).catch(() => toast.error("Google Sign-In failed!"));
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-10">
      <Card className="border w-full max-w-[500px] p-6 md:p-10 border-gray-300 shadow-sm" radius="lg">
        <h1 className="text-center text-2xl font-bold mb-8">Create Account</h1>

        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-4">
            <TextField isRequired name="name" type="text" radius="full" className="w-full">
              <Label>Name</Label>
              <Input placeholder="Enter your name" />
              <FieldError />
            </TextField>

            <TextField isRequired name="image" type="text" radius="full" className="w-full">
              <Label>Image URL</Label>
              <Input placeholder="Photo URL" />
              <FieldError />
            </TextField>
          </div>

          <TextField
            isRequired
            name="email"
            type="email"
            radius="full"
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
            radius="full"
            className="w-full"
            validate={(value) => {
              if (value.length < 8) return "Min 8 characters required";
              if (!/[A-Z]/.test(value)) return "Need an uppercase letter";
              if (!/[0-9]/.test(value)) return "Need a number";
              return null;
            }}
          >
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>Min 8 chars, 1 uppercase, 1 number</Description>
            <FieldError />
          </TextField>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button
              type="submit"
              className="flex-1 bg-[#1e1b4b] text-white hover:bg-indigo-900 h-11 rounded-full font-bold"
            >
              <Check />
              Submit
            </Button>
            <Button
              type="reset"
              variant="flat"
              radius="full"
              className="flex-1 h-11 font-bold"
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
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full rounded-full bg-transparent text-slate-900 border border-[#1e1b4b] hover:bg-[#1e1b4b] hover:text-white transition-all font-montserrat h-11"
          >
            <GrGoogle className="text-lg" />
            Register With Google
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
}