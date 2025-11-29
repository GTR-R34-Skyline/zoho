import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';
import Avatar from '../components/Avatar';
import Tag from '../components/Tag';
import { useToast } from '../context/ToastContext';
import axios from 'axios';

export default function Members() {
    const { addToast } = useToast();
    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'participationScore', direction: 'desc' });
    const [isModalOpen, setIsModalOpen] = useState(false);

    // New Member Form State
    const [newMember, setNewMember] = useState({
        name: '',
        email: '',
        role: 'Developer',
        password: 'password123'
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/members`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMembers(response.data);
        } catch (error) {
            console.error("Failed to fetch members", error);
            addToast("Failed to fetch members", 'error');
        }
    };

    // Filtering and Sorting
    const filteredMembers = useMemo(() => {
        let result = [...members];

        if (search) {
            const lowerSearch = search.toLowerCase();
            result = result.filter(m =>
                m.name.toLowerCase().includes(lowerSearch) ||
                m.role.toLowerCase().includes(lowerSearch) ||
                (m.email && m.email.toLowerCase().includes(lowerSearch))
            );
        }

        result.sort((a, b) => {
            const key = sortConfig.key;
            const valA = a[key] || 0;
            const valB = b[key] || 0;

            if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
            if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return result;
    }, [members, search, sortConfig]);

    const handleSort = (key) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${import.meta.env.VITE_API_URL}/members`, newMember, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setIsModalOpen(false);
            setNewMember({ name: '', email: '', role: 'Developer', password: 'password123' });
            addToast('Member added successfully', 'success');
            fetchMembers();
        } catch (error) {
            console.error("Failed to create member:", error);
            addToast("Failed to create member", 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header Controls */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1 max-w-md relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary-text" size={20} />
                    <input
                        type="text"
                        placeholder="Search members by name, role, or email..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface border border-borders text-headers focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder-secondary-text/50"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Filter size={18} /> Filters
                    </Button>
                    <Button onClick={() => setIsModalOpen(true)} className="gap-2">
                        <Plus size={18} /> Add Member
                    </Button>
                </div>
            </div>

            {/* Data Table */}
            <Card className="overflow-hidden p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-surfaceHighlight border-b border-borders">
                            <tr>
                                <th
                                    className="px-6 py-4 text-left text-xs font-semibold text-secondary-text uppercase tracking-wider cursor-pointer hover:bg-white/5 transition-colors"
                                    onClick={() => handleSort('name')}
                                >
                                    <div className="flex items-center gap-1">
                                        Member
                                        {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-text uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-text uppercase tracking-wider">Skills</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-secondary-text uppercase tracking-wider">Status</th>
                                <th
                                    className="px-6 py-4 text-left text-xs font-semibold text-secondary-text uppercase tracking-wider cursor-pointer hover:bg-white/5 transition-colors"
                                    onClick={() => handleSort('participation_score')}
                                >
                                    <div className="flex items-center gap-1">
                                        Score
                                        {sortConfig.key === 'participation_score' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-secondary-text uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-borders">
                            {filteredMembers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-secondary-text">
                                        No members found. Add one to get started.
                                    </td>
                                </tr>
                            ) : (
                                filteredMembers.map((member) => (
                                    <tr
                                        key={member.id}
                                        className="hover:bg-white/5 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link to={`/members/${member.id}`} className="flex items-center gap-3">
                                                <Avatar src={member.avatar} initials={member.initials} />
                                                <div>
                                                    <div className="text-sm font-medium text-headers group-hover:text-primary transition-colors">{member.name}</div>
                                                    <div className="text-xs text-secondary-text">{member.email}</div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-text">
                                            {member.role}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {member.skills && member.skills.slice(0, 2).map((skill, idx) => (
                                                    <Tag key={idx} label={skill.name} variant="primary" />
                                                ))}
                                                {member.skills && member.skills.length > 2 && (
                                                    <span className="text-xs text-secondary-text">+{member.skills.length - 2}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${member.learningPathStatus === 'Completed' ? 'bg-success/10 text-success border border-success/20' :
                                                member.learningPathStatus === 'In Progress' ? 'bg-primary/10 text-primary border border-primary/20' :
                                                    'bg-surfaceHighlight text-secondary-text border border-borders'
                                                }`}>
                                                {member.learningPathStatus || 'Not Started'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-2 bg-surfaceHighlight rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${member.participationScore > 80 ? 'bg-success shadow-glow' :
                                                            member.participationScore > 50 ? 'bg-warning' : 'bg-error'
                                                            }`}
                                                        style={{ width: `${member.participationScore}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-secondary-text">{member.participationScore}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link to={`/members/${member.id}`} className="text-primary hover:text-primary-400">View</Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Add Member Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Add New Member"
            >
                <form onSubmit={handleAddMember} className="space-y-4">
                    <Input
                        label="Full Name"
                        placeholder="e.g. Alice Johnson"
                        value={newMember.name}
                        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                        required
                        autoFocus
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="alice@example.com"
                        value={newMember.email}
                        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                        required
                    />
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-secondary-text">Role</label>
                        <select
                            className="w-full px-3 py-2 bg-background border border-borders rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-headers"
                            value={newMember.role}
                            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                        >
                            <option value="Developer">Developer</option>
                            <option value="Designer">Designer</option>
                            <option value="Product Manager">Product Manager</option>
                            <option value="Data Scientist">Data Scientist</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add Member'}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
