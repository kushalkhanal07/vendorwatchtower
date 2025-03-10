
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Send } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would send a reset email here
    setSubmitted(true);
    toast({
      title: "Email Sent",
      description: "If an account exists with this email, you'll receive password reset instructions",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/30">
      <div className="w-full max-w-md p-4">
        <Card className="shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-sidebar flex items-center justify-center">
                <span className="text-white text-xl font-bold">V</span>
              </div>
            </div>
            <CardTitle className="text-2xl">Reset Password</CardTitle>
            <CardDescription>
              {submitted 
                ? "Check your email for reset instructions" 
                : "Enter your email to receive a password reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="space-y-4 text-center">
                <div className="rounded-full bg-primary/10 p-6 mx-auto w-fit">
                  <Send className="h-8 w-8 text-primary mx-auto" />
                </div>
                <p className="text-sm text-muted-foreground">
                  We've sent an email to <strong>{email}</strong> with instructions to reset your password.
                </p>
                <p className="text-sm text-muted-foreground">
                  Didn't receive an email? Check your spam folder or try again.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4 w-full"
                  onClick={() => setSubmitted(false)}
                >
                  Try again
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="admin@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Reset Link
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center border-t border-border p-4">
            <Link to="/login" className="flex items-center text-primary hover:underline text-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
