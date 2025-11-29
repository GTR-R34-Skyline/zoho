import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Map, Filter, Plus, Clock, MoreVertical, BookOpen } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import Tag from '../components/Tag';
import Avatar from '../components/Avatar';
import axios from 'axios';

export default function TasksAndPaths() {
    const [activeTab, setActiveTab] = useState('tasks');
    const [tasks, setTasks] = useState([]);
    const [paths, setPaths] = useState([]);
    const [members, setMembers] = useState([]);

    // Modals
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isPathModalOpen, setIsPathModalOpen] = useState(false);

    // Forms
    const [newTask, setNewTask] = useState({ title: '', assignedTo: '', dueDate: '', priority: 'Medium' });
    const [newPath, setNewPath] = useState({ name: '', description: '', difficulty: 'Beginner', estimatedDuration: '' });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token');
            const [tasksRes, pathsRes, membersRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_URL}/tasks`, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(`${import.meta.env.VITE_API_URL}/paths`, { headers: { Authorization: `Bearer ${token}` } }),
                axios.get(`${import.meta.env.VITE_API_URL}/members`, { headers: { Authorization: `Bearer ${token}` } })
            ]);
            setTasks(tasksRes.data);
            setPaths(pathsRes.data);
            setMembers(membersRes.data);
        } catch (error) {
            console.error("Failed to fetch data", error);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const payload = {
                title: newTask.title,
                priority: newTask.priority,
                due_date: newTask.dueDate || null,
                assigned_to: newTask.assignedTo ? parseInt(newTask.assignedTo) : null
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsTaskModalOpen(false);
            fetchData();
            setNewTask({ title: '', assignedTo: '', dueDate: '', priority: 'Medium' });
        } catch (error) {
            console.error("Failed to create task:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreatePath = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const payload = {
                name: newPath.name,
                description: newPath.description,
                difficulty: newPath.difficulty,
                estimated_duration: newPath.estimatedDuration
            };

            await axios.post(`${import.meta.env.VITE_API_URL}/paths`, payload, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setIsPathModalOpen(false);
            fetchData();
            setNewPath({ name: '', description: '', difficulty: 'Beginner', estimatedDuration: '' });
        } catch (error) {
            console.error("Failed to create path:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Tabs */}
            <div className="flex border-b border-borders">
                <button
                    className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === 'tasks' ? 'text-primary' : 'text-secondary-text hover:text-white'
                        }`}
                    onClick={() => setActiveTab('tasks')}
                >
                    <div className="flex items-center gap-2">
                        <CheckSquare size={18} /> Tasks
                    </div>
                    {activeTab === 'tasks' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>}
                </button>
                <button
                    className={`px-6 py-3 font-medium text-sm transition-colors relative ${activeTab === 'paths' ? 'text-primary' : 'text-secondary-text hover:text-white'
                        }`}
                    onClick={() => setActiveTab('paths')}
                >
                    <div className="flex items-center gap-2">
                        <Map size={18} /> Learning Paths
                    </div>
                    {activeTab === 'paths' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>}
                </button>
            </div>

            {/* Content */}
            {activeTab === 'tasks' ? (
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Filter size={16} /> Filter
                            </Button>
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-borders rounded-lg text-sm">
                                <span className="text-secondary-text">Status:</span>
                                <span className="font-medium text-headers">All</span>
                            </div>
                        </div>
                        <Button onClick={() => setIsTaskModalOpen(true)} className="gap-2">
                            <Plus size={18} /> Create Task
                        </Button>
                    </div>

                    <Card className="overflow-hidden p-0">
                        <table className="w-full">
                            <thead className="bg-surfaceHighlight border-b border-borders">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-text uppercase">Task</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-text uppercase">Priority</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-text uppercase">Assignee</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-text uppercase">Due Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-text uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-borders">
                                {tasks.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-secondary-text">
                                            No tasks found. Create one to get started.
                                        </td>
                                    </tr>
                                ) : (
                                    tasks.map((task) => {
                                        const assignee = members.find(m => m.id === task.assigned_to);
                                        return (
                                            <tr key={task.id} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-headers">{task.title}</div>
                                                    <div className="text-xs text-secondary-text truncate max-w-xs">{task.description}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Tag label={task.priority || 'Medium'} variant={task.priority === 'High' ? 'danger' : 'primary'} />
                                                </td>
                                                <td className="px-6 py-4">
                                                    {assignee ? (
                                                        <div className="flex items-center gap-2">
                                                            <Avatar src={assignee.avatar} initials={assignee.initials} size="sm" />
                                                            <span className="text-sm text-headers">{assignee.name}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-secondary-text">Unassigned</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-secondary-text">
                                                    <div className="flex items-center gap-1">
                                                        <Clock size={14} /> {task.due_date || 'No Date'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.status === 'Completed' ? 'bg-success/10 text-success border border-success/20' :
                                                        task.status === 'In Progress' ? 'bg-primary/10 text-primary border border-primary/20' :
                                                            'bg-surfaceHighlight text-secondary-text border border-borders'
                                                        }`}>
                                                        {task.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </Card>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="flex justify-end">
                        <Button onClick={() => setIsPathModalOpen(true)} className="gap-2">
                            <Plus size={18} /> Create Path
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paths.length === 0 ? (
                            <div className="col-span-full text-center py-12 text-secondary-text bg-surface border border-borders rounded-xl">
                                No learning paths found. Create one to get started.
                            </div>
                        ) : (
                            paths.map((path) => (
                                <Link key={path.id} to={`/paths/${path.id}`} className="block group">
                                    <Card className="h-full hover:shadow-glow transition-all border-l-4 border-l-transparent hover:border-l-primary hover:bg-surfaceHighlight/50">
                                        <div className="p-6 space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div className={`p-2 rounded-lg ${path.difficulty === 'Advanced' ? 'bg-purple-500/10 text-purple-400' :
                                                    path.difficulty === 'Intermediate' ? 'bg-blue-500/10 text-blue-400' :
                                                        'bg-green-500/10 text-green-400'
                                                    }`}>
                                                    <BookOpen size={24} />
                                                </div>
                                                <span className={`text-xs px-2 py-1 rounded-full font-medium ${path.difficulty === 'Advanced' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                                                    path.difficulty === 'Intermediate' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                                                        'bg-green-500/20 text-green-300 border border-green-500/30'
                                                    }`}>
                                                    {path.difficulty}
                                                </span>
                                            </div>

                                            <div>
                                                <h3 className="text-lg font-bold text-headers group-hover:text-primary transition-colors">{path.name}</h3>
                                                <p className="text-sm text-secondary-text mt-1 line-clamp-2">{path.description}</p>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {path.skillTags && path.skillTags.map((tag, idx) => (
                                                    <span key={idx} className="text-xs px-2 py-1 bg-surfaceHighlight text-secondary-text rounded border border-borders">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="pt-4 border-t border-borders flex items-center justify-between text-sm text-secondary-text">
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} /> {path.estimated_duration}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className="font-medium text-headers">{path.completionRate || 0}%</span> Avg. Comp.
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Create Task Modal */}
            <Modal
                isOpen={isTaskModalOpen}
                onClose={() => setIsTaskModalOpen(false)}
                title="Create New Task"
            >
                <form onSubmit={handleCreateTask} className="space-y-4">
                    <Input
                        label="Task Title"
                        placeholder="e.g. Implement Auth"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        required
                        autoFocus
                    />
                    <div>
                        <label className="block text-sm font-medium text-secondary-text mb-1">Assign To</label>
                        <select
                            className="w-full px-3 py-2 bg-background border border-borders rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-headers"
                            value={newTask.assignedTo}
                            onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                        >
                            <option value="">Unassigned</option>
                            {members.map(m => (
                                <option key={m.id} value={m.id}>{m.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="ghost" onClick={() => setIsTaskModalOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create Task'}
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Create Path Modal */}
            <Modal
                isOpen={isPathModalOpen}
                onClose={() => setIsPathModalOpen(false)}
                title="Create Learning Path"
            >
                <form onSubmit={handleCreatePath} className="space-y-4">
                    <Input
                        label="Path Name"
                        placeholder="e.g. React Mastery"
                        value={newPath.name}
                        onChange={(e) => setNewPath({ ...newPath, name: e.target.value })}
                        required
                        autoFocus
                    />
                    <div>
                        <label className="block text-sm font-medium text-secondary-text mb-1">Description</label>
                        <textarea
                            className="w-full px-3 py-2 bg-background border border-borders rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-headers min-h-[100px]"
                            placeholder="Describe the learning path..."
                            value={newPath.description}
                            onChange={(e) => setNewPath({ ...newPath, description: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-secondary-text mb-1">Difficulty</label>
                            <select
                                className="w-full px-3 py-2 bg-background border border-borders rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-headers"
                                value={newPath.difficulty}
                                onChange={(e) => setNewPath({ ...newPath, difficulty: e.target.value })}
                            >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <Input
                            label="Est. Duration"
                            placeholder="e.g. 4 weeks"
                            value={newPath.estimatedDuration}
                            onChange={(e) => setNewPath({ ...newPath, estimatedDuration: e.target.value })}
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="ghost" onClick={() => setIsPathModalOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create Path'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
