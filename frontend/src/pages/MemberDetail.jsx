import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, Calendar, Award, BookOpen, TrendingUp, Plus, Edit2, CheckSquare } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import Tag from '../components/Tag';
import Modal from '../components/Modal';
import Input from '../components/Input';
import axios from 'axios';

export default function MemberDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [member, setMember] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

    // Forms
    const [newSkill, setNewSkill] = useState({ name: '', proficiency: 'Beginner' });
    const [newTask, setNewTask] = useState({ title: '', priority: 'Medium', due_date: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchMemberData();
    }, [id]);

    const fetchMemberData = async () => {
        try {
            const token = localStorage.getItem('token');
            const [memberRes, recRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/members/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.post(`${import.meta.env.VITE_API_URL}/recommendations/${id}`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);
            setMember(memberRes.data);
            setRecommendations(recRes.data);
        } catch (error) {
            console.error("Failed to fetch member data:", error);
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        if (!newSkill.name) return;

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${import.meta.env.VITE_API_URL}/members/${id}/skills`, newSkill, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsSkillModalOpen(false);
            setNewSkill({ name: '', proficiency: 'Beginner' });
            fetchMemberData();
        } catch (error) {
            console.error("Failed to add skill:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAssignTask = async (e) => {
        e.preventDefault();
        if (!newTask.title) return;

        setIsLoading(true);
        try {
            // In a real app, we would call the API here
            // For now, we'll just simulate it or use the tasks endpoint if we had one for direct assignment
            alert("Task assigned successfully! (Mock)");
            setIsTaskModalOpen(false);
            setNewTask({ title: '', priority: 'Medium', due_date: '' });
        } catch (error) {
            console.error("Failed to assign task:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMessage = () => {
        // Navigate to chat with member context (in a real app, pass ID via state or query param)
        navigate('/chat', { state: { memberId: id, memberName: member?.name } });
    };

    if (!member) return <div className="p-8 text-center text-secondary-text">Loading...</div>;

    return (
        <div className="space-y-6 animate-fade-in">
            <Link to="/members" className="inline-flex items-center text-secondary-text hover:text-primary transition-colors">
                <ArrowLeft size={18} className="mr-1" /> Back to Members
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Profile & Skills */}
                <div className="space-y-6">
                    <Card className="p-6 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary to-accent opacity-20"></div>
                        <div className="relative z-10">
                            <Avatar
                                src={member.avatar}
                                initials={member.initials}
                                size="xl"
                                className="mx-auto border-4 border-surface shadow-lg mb-4"
                            />
                            <h2 className="text-2xl font-bold text-headers">{member.name}</h2>
                            <p className="text-secondary-text mb-4">{member.role}</p>

                            <div className="flex justify-center gap-4 mb-6">
                                <Button variant="primary" size="sm" onClick={handleMessage}>Message</Button>
                                <Button variant="outline" size="sm" onClick={() => setIsTaskModalOpen(true)}>Assign Task</Button>
                            </div>

                            <div className="grid grid-cols-2 gap-4 border-t border-borders pt-6 text-left">
                                <div>
                                    <p className="text-xs text-secondary-text uppercase tracking-wider">Participation</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xl font-bold text-headers">{member.participationScore || 0}%</span>
                                        <TrendingUp size={16} className="text-success" />
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs text-secondary-text uppercase tracking-wider">Path Status</p>
                                    <p className="font-medium text-headers mt-1">{member.learningPathStatus || 'Not Started'}</p>
                                </div>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-headers">Skills</h3>
                            <button onClick={() => setIsSkillModalOpen(true)} className="text-primary hover:bg-primary/10 p-1 rounded transition-colors">
                                <Plus size={18} />
                            </button>
                        </div>
                        <div className="space-y-3">
                            {member.skills && member.skills.map((skill, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg transition-colors">
                                    <span className="font-medium text-headers">{skill.name}</span>
                                    <span className={`text-xs px-2 py-1 rounded-full ${skill.proficiency === 'Advanced' ? 'bg-primary/10 text-primary border border-primary/20' :
                                        skill.proficiency === 'Intermediate' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                            'bg-surfaceHighlight text-secondary-text border border-borders'
                                        }`}>
                                        {skill.proficiency}
                                    </span>
                                </div>
                            ))}
                            {(!member.skills || member.skills.length === 0) && (
                                <p className="text-sm text-secondary-text italic">No skills added yet.</p>
                            )}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-semibold text-headers mb-4">Interests</h3>
                        <div className="flex flex-wrap gap-2">
                            {member.interests && member.interests.map((interest, idx) => (
                                <Tag key={idx} label={interest} />
                            ))}
                            {(!member.interests || member.interests.length === 0) && (
                                <p className="text-sm text-secondary-text italic">No interests listed.</p>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Right Column: Path & Recommendations */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Recommendations */}
                    <Card className="p-6 bg-gradient-to-br from-surface to-primary/5 border-primary/10">
                        <h3 className="text-lg font-semibold text-headers mb-4 flex items-center gap-2">
                            <Award className="text-primary" size={20} /> Recommended Next Steps
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {recommendations.length > 0 ? recommendations.map((rec, idx) => (
                                <div key={idx} className="p-4 bg-surface border border-borders rounded-xl shadow-sm hover:shadow-glow transition-all hover:border-primary/30">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-xs font-medium px-2 py-1 bg-surfaceHighlight rounded text-secondary-text">Module</span>
                                        <span className="text-xs text-primary font-medium">{rec.reason}</span>
                                    </div>
                                    <h4 className="font-bold text-headers mb-1">{rec.module}</h4>
                                    <p className="text-xs text-secondary-text mb-3">Score: {(rec.score * 100).toFixed(0)}% match</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-surfaceHighlight rounded-full">
                                            <div className="h-full bg-primary rounded-full" style={{ width: `${rec.score * 100}%` }}></div>
                                        </div>
                                        <Button size="sm" variant="ghost" className="text-xs h-7 px-2">Start</Button>
                                    </div>
                                </div>
                            )) : (
                                <p className="text-secondary-text col-span-2">No recommendations available at the moment.</p>
                            )}
                        </div>
                    </Card>

                    {/* Timeline */}
                    <Card className="p-6">
                        <h3 className="text-lg font-semibold text-headers mb-6">Activity Timeline</h3>
                        <div className="relative pl-4 border-l-2 border-borders space-y-8">
                            {/* Mock timeline for now as backend doesn't fully support timeline events yet */}
                            <p className="text-secondary-text text-sm italic">No recent activity recorded.</p>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Add Skill Modal */}
            <Modal
                isOpen={isSkillModalOpen}
                onClose={() => setIsSkillModalOpen(false)}
                title="Add Skill"
            >
                <form onSubmit={handleAddSkill} className="space-y-4">
                    <Input
                        label="Skill Name"
                        placeholder="e.g. TypeScript"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        required
                        autoFocus
                    />
                    <div>
                        <label className="block text-sm font-medium text-secondary-text mb-1">Proficiency</label>
                        <select
                            className="w-full px-3 py-2 bg-background border border-borders rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-headers"
                            value={newSkill.proficiency}
                            onChange={(e) => setNewSkill({ ...newSkill, proficiency: e.target.value })}
                        >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="ghost" onClick={() => setIsSkillModalOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add Skill'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Assign Task Modal */}
            <Modal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                title="Assign Task"
            >
                <form onSubmit={handleAssignTask} className="space-y-4">
                    <Input
                        label="Task Title"
                        placeholder="e.g. Review PR #123"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        required
                        autoFocus
                    />
                    <div>
                        <label className="block text-sm font-medium text-secondary-text mb-1">Priority</label>
                        <select
                            className="w-full px-3 py-2 bg-background border border-borders rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-headers"
                            value={newTask.priority}
                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <Input
                        label="Due Date"
                        type="date"
                        value={newTask.due_date}
                        onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                    />
                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="ghost" onClick={() => setIsTaskModalOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Assigning...' : 'Assign Task'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
