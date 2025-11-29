import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Lock, Users } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import { getPathById, members } from '../mockData';

export default function PathDetail() {
    const { id } = useParams();
    const [path, setPath] = useState(null);

    useEffect(() => {
        const data = getPathById(id);
        setPath(data);
    }, [id]);

    if (!path) return <div className="p-8 text-center text-secondary-text">Loading...</div>;

    // Mock assigned members (random subset)
    const assignedMembers = members.slice(0, 5).map(m => ({
        ...m,
        progress: Math.floor(Math.random() * 100)
    }));

    return (
        <div className="space-y-6 animate-fade-in">
            <Link to="/tasks" className="inline-flex items-center text-secondary-text hover:text-primary transition-colors">
                <ArrowLeft size={18} className="mr-1" /> Back to Paths
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-8 bg-gradient-to-br from-surface to-primary/10 border-primary/20">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wide ${path.difficulty === 'Advanced' ? 'bg-purple-500/10 text-purple-400' :
                                        path.difficulty === 'Intermediate' ? 'bg-blue-500/10 text-blue-400' :
                                            'bg-green-500/10 text-green-400'
                                    }`}>
                                    {path.difficulty}
                                </span>
                                <h1 className="text-3xl font-bold text-headers mt-3 mb-2">{path.name}</h1>
                                <p className="text-secondary-text text-lg">{path.description}</p>
                            </div>
                            <div className="text-center bg-surface p-4 rounded-xl border border-borders shadow-sm">
                                <div className="text-2xl font-bold text-primary">{path.estimatedDuration}</div>
                                <div className="text-xs text-secondary-text uppercase">Duration</div>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-6">
                            {path.skillTags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-surfaceHighlight border border-borders rounded-full text-sm font-medium text-secondary-text">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </Card>

                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-headers">Modules</h2>
                        {path.modules.map((module, idx) => (
                            <Card key={module.id} className="p-4 flex items-center gap-4 hover:border-primary/50 transition-colors">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${module.status === 'completed' ? 'bg-success text-white shadow-glow' :
                                        module.status === 'in_progress' ? 'bg-primary text-white shadow-glow' :
                                            'bg-surfaceHighlight text-secondary-text'
                                    }`}>
                                    {module.status === 'completed' ? <CheckCircle size={20} /> :
                                        module.status === 'locked' ? <Lock size={20} /> : idx + 1}
                                </div>
                                <div className="flex-1">
                                    <h3 className={`font-medium text-lg ${module.status === 'locked' ? 'text-secondary-text' : 'text-headers'}`}>
                                        {module.title}
                                    </h3>
                                    <p className="text-sm text-secondary-text">
                                        {module.status === 'locked' ? 'Complete previous module to unlock' : 'Learn the core concepts and best practices.'}
                                    </p>
                                </div>
                                {module.status !== 'locked' && (
                                    <Button variant={module.status === 'completed' ? 'secondary' : 'primary'}>
                                        {module.status === 'completed' ? 'Review' : 'Start'}
                                    </Button>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card className="p-6">
                        <h3 className="font-semibold text-headers mb-4 flex items-center gap-2">
                            <Users size={18} /> Enrolled Members
                        </h3>
                        <div className="space-y-4">
                            {assignedMembers.map(member => (
                                <div key={member.id} className="flex items-center gap-3">
                                    <Avatar src={member.avatar} initials={member.initials} size="sm" />
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-headers">{member.name}</span>
                                            <span className="text-xs text-secondary-text">{member.progress}%</span>
                                        </div>
                                        <div className="h-1.5 bg-surfaceHighlight rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all duration-500 shadow-glow"
                                                style={{ width: `${member.progress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-6">View All</Button>
                    </Card>

                    <Card className="p-6 bg-primary text-white shadow-glow">
                        <h3 className="font-bold text-lg mb-2">Enroll New Members</h3>
                        <p className="text-white/80 text-sm mb-4">Assign this learning path to team members to boost their skills.</p>
                        <Button className="w-full bg-surface text-primary hover:bg-white border-0">Assign Path</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
