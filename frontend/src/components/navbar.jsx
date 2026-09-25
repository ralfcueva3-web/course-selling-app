import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between border-b bg-background px-6 py-4">
      {/* Logo */}
      <button
        onClick={() => navigate("/")}
        className="text-lg font-medium text-foreground transition-opacity hover:opacity-80"
      >
        ⚡ LearnFlow
      </button>

      {/* Navigation */}
      <div className="flex items-center gap-5">
        <button
          onClick={() => navigate("/")}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Courses
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </button>

        {/* Login */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/login")}
        >
          Log in
        </Button>

        {/* Signup */}
        <Button
          size="sm"
          onClick={() => navigate("/signup")}
        >
          Get started
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;