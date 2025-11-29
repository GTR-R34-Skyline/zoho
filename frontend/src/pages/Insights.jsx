import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Download, TrendingUp, Users, BookOpen, Activity, MessageSquare, RefreshCw } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import StatCard from '../components/StatCard';
import axios from 'axios';

const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

export default function Insights() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRegenerating, setIsRegenerating] = useState(false);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/analytics`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(response.data);
        } catch (error) {
            console.error("Failed to fetch analytics", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegenerate = async () => {
        setIsRegenerating(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${import.meta.env.VITE_API_URL}/analytics/regenerate`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // In a real app, this might trigger a background job. 
            // For now, we just refresh the data after a delay to simulate processing.
            setTimeout(fetchAnalytics, 2000);
        } catch (error) {
            console.error("Failed to regenerate analytics:", error);
            setIsRegenerating(false);
        }
    };

    if (isLoading) {
        return <div className="p-8 text-center text-secondary-text">Loading insights...</div>;
    }

    if (!data) {
        return <div className="p-8 text-center text-secondary-text">No analytics data available.</div>;
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-borders rounded-lg text-sm">
                    <span className="text-secondary-text">Last 30 Days</span>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2" onClick={handleRegenerate} disabled={isRegenerating}>
                        <RefreshCw size={18} className={isRegenerating ? "animate-spin" : ""} />
                        {isRegenerating ? "Regenerating..." : "Regenerate Report"}
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Download size={18} /> Download Report
                    </Button>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Retention Rate" value="94%" trend="1.2%" trendUp={true} icon={<Users size={20} />} />
                <StatCard label="Avg Modules/Member" value="4.2" trend="0.5" trendUp={true} icon={<BookOpen size={20} />} />
                <StatCard label="Active Members" value={data.memberGrowth[data.memberGrowth.length - 1]?.value || 0} trend="5%" trendUp={true} icon={<Activity size={20} />} />
                <StatCard label="Path Completion" value="68%" trend="2.4%" trendUp={false} icon={<TrendingUp size={20} />} />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-headers mb-4">Skills Distribution</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.skillsDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.skillsDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'rgb(var(--color-surface))', borderRadius: '8px', border: '1px solid rgb(var(--color-borders))', color: 'rgb(var(--color-headers))' }} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-headers mb-4">Member Growth Trend</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.memberGrowth}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgb(var(--color-surface))', borderRadius: '8px', border: '1px solid rgb(var(--color-borders))', color: 'rgb(var(--color-headers))' }}
                                    labelStyle={{ color: 'rgb(var(--color-headers))' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3B82F6"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#1E293B' }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-headers mb-4">Path Completion Rates</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={data.pathCompletionStats} margin={{ left: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={100} axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: 'rgb(var(--color-surface))', borderRadius: '8px', border: '1px solid rgb(var(--color-borders))', color: 'rgb(var(--color-headers))' }}
                                    labelStyle={{ color: 'rgb(var(--color-headers))' }}
                                />
                                <Legend />
                                <Bar dataKey="completed" name="Completed" stackId="a" fill="#10B981" radius={[0, 4, 4, 0]} barSize={20} />
                                <Bar dataKey="inProgress" name="In Progress" stackId="a" fill="#3B82F6" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-headers mb-4">Engagement by Channel</h3>
                    <div className="space-y-4">
                        {data.engagementByChannel.map((channel, idx) => (
                            <div key={channel.channel} className="flex items-center justify-between p-3 bg-surfaceHighlight rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-surface border border-borders flex items-center justify-center text-primary">
                                        <MessageSquare size={16} />
                                    </div>
                                    <div>
                                        <div className="font-medium text-headers">#{channel.channel}</div>
                                        <div className="text-xs text-secondary-text">{channel.activeMembers} active members</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-headers">{channel.messages}</div>
                                    <div className="text-xs text-success flex items-center justify-end gap-1">
                                        <TrendingUp size={12} /> +{Math.floor(Math.random() * 15)}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Insights Feed */}
            <h3 className="text-lg font-semibold text-headers mt-8 mb-4">Automated Insights Feed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.insightsFeed.map((item) => (
                    <Card key={item.id} className="p-4 hover:shadow-glow transition-shadow border-l-4 border-l-primary bg-surface/50 hover:bg-surface">
                        <div className="flex justify-between items-start mb-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium bg-surfaceHighlight text-secondary-text`}>
                                {item.tag}
                            </span>
                        </div>
                        <h4 className="font-medium text-headers mb-1">{item.title}</h4>
                        <p className="text-sm text-secondary-text">{item.description}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}
