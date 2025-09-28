import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { postJson } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await postJson<{ user: any; message: string }>("/api/auth/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.user));
      toast({ title: "Registration successful", description: `Welcome, ${res.user.username}!` });
      navigate("/profile");
    } catch (err: any) {
      toast({ title: "Registration failed", description: err?.message || "Unknown error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto pt-28 px-6 max-w-md">
      <Card className="bg-card/70 backdrop-blur border-accent/30">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Username</label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="your_username" required />
            </div>
            <div>
              <label className="block text-sm mb-1">Email (optional)</label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm mb-1">Password</label>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">
            Already have an account? <Link to="/login" className="text-primary underline">Login</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
