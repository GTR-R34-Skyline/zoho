import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap } from 'lucide-react';
import Button from '../components/Button';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-background font-sans text-headers">
            {/* Navbar */}
            <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-glow">
                        <span className="text-white font-bold text-xl">Z</span>
                    </div>
                    <span className="text-xl font-bold">Zoho<span className="text-primary">LMS</span></span>
                </div>
                <div className="flex gap-4">
                    <Link to="/login">
                        <Button variant="ghost">Log In</Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="primary">Get Started</Button>
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="px-6 py-20 lg:py-32 max-w-7xl mx-auto text-center relative overflow-hidden">
                {/* Decorative Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10 opacity-50"></div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-borders shadow-sm mb-8 animate-fade-in-up">
                    <span className="flex h-2 w-2 rounded-full bg-success shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                    <span className="text-sm font-medium text-secondary-text">New: AI Recommendations</span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-primary-400 to-primary bg-clip-text text-transparent drop-shadow-sm">
                    Empower Your Team's <br /> Growth Journey
                </h1>

                <p className="text-xl text-secondary-text max-w-2xl mx-auto mb-10 leading-relaxed">
                    The intelligent learning management system that tracks skills, recommends paths, and drives engagement through data-driven insights.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Link to="/login">
                        <Button size="lg" className="rounded-full px-8 text-lg shadow-glow hover:shadow-primary/40 transition-all">
                            Begin Your Journey <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                    <Button variant="outline" size="lg" className="rounded-full px-8 text-lg bg-transparent hover:bg-white/5">
                        View Demo
                    </Button>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-8 text-secondary-text opacity-70 mb-20">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full bg-surfaceHighlight border-2 border-background"></div>
                            ))}
                        </div>
                        <span className="text-sm font-medium">Trusted by 500+ teams</span>
                    </div>
                    <div className="h-4 w-px bg-borders"></div>
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-headers">4.9/5</span>
                        <span className="text-warning">★★★★★</span>
                        <span className="text-sm">Rating</span>
                    </div>
                </div>

                {/* Dashboard Preview */}
                <div className="relative mx-auto max-w-5xl rounded-2xl border border-borders bg-surface/50 backdrop-blur-sm p-2 shadow-2xl">
                    <div className="rounded-xl bg-background overflow-hidden aspect-[16/9] relative group border border-borders">
                        {/* Mock UI Representation */}
                        <div className="absolute inset-0 bg-background flex flex-col">
                            <div className="h-12 border-b border-borders flex items-center px-4 gap-4 bg-surface/50">
                                <div className="w-3 h-3 rounded-full bg-error"></div>
                                <div className="w-3 h-3 rounded-full bg-warning"></div>
                                <div className="w-3 h-3 rounded-full bg-success"></div>
                            </div>
                            <div className="flex-1 flex">
                                <div className="w-48 border-r border-borders bg-surface/30 p-4 space-y-2">
                                    <div className="h-2 w-20 bg-surfaceHighlight rounded"></div>
                                    <div className="h-2 w-32 bg-surfaceHighlight rounded"></div>
                                    <div className="h-2 w-24 bg-surfaceHighlight rounded"></div>
                                </div>
                                <div className="flex-1 p-6 grid grid-cols-3 gap-4">
                                    <div className="h-32 rounded-lg bg-primary/10 border border-primary/20"></div>
                                    <div className="h-32 rounded-lg bg-surface border border-borders shadow-sm"></div>
                                    <div className="h-32 rounded-lg bg-surface border border-borders shadow-sm"></div>
                                    <div className="col-span-2 h-64 rounded-lg bg-surface border border-borders shadow-sm mt-4"></div>
                                    <div className="h-64 rounded-lg bg-surface border border-borders shadow-sm mt-4"></div>
                                </div>
                            </div>
                        </div>
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-8">
                            <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium shadow-glow">Interactive Dashboard</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-surface/30 border-t border-borders">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 shadow-glow">
                                <TrendingUp size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-headers">Track Skill Growth</h3>
                            <p className="text-secondary-text leading-relaxed">
                                Visualize team proficiency with dynamic charts. Identify gaps and monitor progress over time.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-headers">Smart Recommendations</h3>
                            <p className="text-secondary-text leading-relaxed">
                                AI-powered suggestions for learning paths and modules based on individual interests and role requirements.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center text-success mb-4">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-headers">Actionable Tasks</h3>
                            <p className="text-secondary-text leading-relaxed">
                                Assign tasks directly from chat or the dashboard. Track completion and link them to learning goals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-background border-t border-borders text-white py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <span className="text-2xl font-bold">Zoho<span className="text-primary">LMS</span></span>
                        <p className="text-secondary-text mt-2">Empowering teams to learn and grow.</p>
                    </div>
                    <div className="flex gap-8 text-secondary-text">
                        <a href="#" className="hover:text-white transition-colors">Features</a>
                        <a href="#" className="hover:text-white transition-colors">Pricing</a>
                        <a href="#" className="hover:text-white transition-colors">About</a>
                    </div>
                    <Button variant="primary" className="rounded-full">Get Template</Button>
                </div>
            </footer>
        </div>
    );
}
