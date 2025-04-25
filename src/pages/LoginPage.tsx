
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginPage: React.FC = () => {
  const { login, user, isLoading } = useAuth();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <Card className="w-[350px] shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Admin Panel</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to sign in
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" size="sm" className="px-0 font-normal h-auto">
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleSubmit} 
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </CardFooter>
        
        <div className="p-4 bg-muted/50 rounded-b-lg">
          <h3 className="text-sm font-medium text-center mb-2">Integration Notes</h3>
          <div className="text-xs space-y-1">
            <p className="bg-background p-2 rounded">
              <span className="font-semibold">Spring Boot Endpoints:</span>
              <br />
              - POST /api/auth/login
              <br />
              - POST /api/auth/refresh-token
              <br />
              - GET /api/user/menu
            </p>
          </div>
          
          <h3 className="text-sm font-medium text-center mt-3 mb-2">Available Test Accounts</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-background p-2 rounded">
              <div className="font-semibold">Admin</div>
              <div>admin@example.com</div>
              <div>password</div>
            </div>
            <div className="bg-background p-2 rounded">
              <div className="font-semibold">Manager</div>
              <div>manager@example.com</div>
              <div>password</div>
            </div>
            <div className="bg-background p-2 rounded">
              <div className="font-semibold">Analyst</div>
              <div>analyst@example.com</div>
              <div>password</div>
            </div>
            <div className="bg-background p-2 rounded">
              <div className="font-semibold">Viewer</div>
              <div>viewer@example.com</div>
              <div>password</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
