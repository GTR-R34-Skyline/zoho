import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('Developer');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login, register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            if (isLogin) {
                await login(email, password);
            } else {
                await register(name, email, password, role);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.detail || 'Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-headers mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-secondary-text">
                        {isLogin ? 'Sign in to continue to SkillPath AI' : 'Join your team on SkillPath AI'}
                    </p>
                </div>

                {error && (
                    <div className="bg-error/10 text-error border border-error/20 rounded-lg p-3 mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <>
                            <Input
                                label="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-secondary-text">Role</label>
                                <select
                                    className="w-full px-4 py-2 rounded-lg bg-surface border border-borders text-headers focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="Developer">Developer</option>
                                    <option value="Designer">Designer</option>
                                    <option value="Product Manager">Product Manager</option>
                                    <option value="Data Scientist">Data Scientist</option>
                                </select>
                            </div>
                        </>
                    )}

                    <Input
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-primary hover:text-primary-400 text-sm font-medium"
                    >
                        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                    </button>
                </div>
            </Card>
        </div>
    );
}
