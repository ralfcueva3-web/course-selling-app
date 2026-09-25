import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api/axios";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (form.role === "admin") {
        await API.post("/admin/signup", {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        navigate("/admin/login");
      } else {
        await API.post("/user/signup", {
          name: form.name,
          email: form.email,
          password: form.password,
        });

        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">

        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">
            Create Account
          </CardTitle>

          <CardDescription>
            Join LearnFlow today
          </CardDescription>
        </CardHeader>

        <CardContent>

          {error && (
            <div className="mb-4 rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">
                Full name
              </Label>

              <Input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Account Type */}
            <div className="space-y-2">
              <Label>
                Account type
              </Label>

              <div className="grid grid-cols-2 gap-3">

                <label
                  className={`flex cursor-pointer items-center justify-center rounded-md border px-4 py-3 text-sm transition-colors ${
                    form.role === "student"
                      ? "border-primary bg-primary/10"
                      : "border-input hover:bg-accent"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={form.role === "student"}
                    onChange={handleChange}
                    className="mr-2"
                  />

                  Student
                </label>

                <label
                  className={`flex cursor-pointer items-center justify-center rounded-md border px-4 py-3 text-sm transition-colors ${
                    form.role === "admin"
                      ? "border-primary bg-primary/10"
                      : "border-input hover:bg-accent"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={form.role === "admin"}
                    onChange={handleChange}
                    className="mr-2"
                  />

                  Admin
                </label>

              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
            >
              Sign up
            </Button>

          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}

            <Link
              to="/login"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Log in
            </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  );
}

export default Signup;