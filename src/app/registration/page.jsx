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
import { useRouter } from "next/navigation";
import { GrGoogle } from "react-icons/gr";

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

    console.log({ data, error });

    if (!error) {
      router.push("/login");
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <Card className="border mx-auto w-125 py-10 my-20 border-gray-300 shadow-sm" radius="lg">
      <h1 className="text-center text-2xl font-bold mb-6">Create Account</h1>

      <Form className="flex w-96 mx-auto flex-col gap-4" onSubmit={onSubmit}>
        <TextField isRequired name="name" type="text" radius="full">
          <Label>Name</Label>
          <Input placeholder="Enter your name" />
          <FieldError />
        </TextField>

        <TextField isRequired name="image" type="text" radius="full">
          <Label>Image URL</Label>
          <Input placeholder="Image URL" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          radius="full"
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
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }

            return null;
          }}

        >
          <Label>Password</Label>
          <Input placeholder="Enter your password" />
          <Description>Min 8 characters, 1 uppercase, 1 number</Description>
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit" color="secondary" radius="full" className="bg-blue-950 text-white hover:bg-blue-800">
            <Check />
            Submit
          </Button>
          <Button type="reset" variant="flat" radius="full">
            Reset
          </Button>
        </div>
      </Form>

      <div className="divider my-6 px-10 text-gray-400">OR</div>

      <div className="flex justify-center w-full px-10">
        <Button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full rounded-full bg-transparent text-slate-900 border border-[#1e1b4b]  hover:bg-[#1e1b4b] hover:text-white transition-all font-montserrat"
          radius="full"
        >
          <GrGoogle />
          Register With Google
        </Button>
      </div>
    </Card>
  );
}