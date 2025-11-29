import React, { useMemo } from 'react';
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Users, Activity, BookOpen, CheckSquare, TrendingUp, ArrowUp, ArrowDown } from 'lucide-react';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import { analytics, learningPaths, insightsFeed, simulateGrowth } from '../mockData';

// Recharts doesn't support CSS variables directly in all props, so we map them to the theme hex values
const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

export default function Dashboard({ isDemoMode }) {
    // Use memo to recalculate data when demo mode changes
    const data = useMemo(() => {
        return isDemoMode ? simulateGrowth(analytics) : analytics;
    }, [isDemoMode]);

    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard
                    label="Total Members"
                    value={isDemoMode ? "14" : "12"}
                    trend="8.5%"
                    trendUp={true}
                    icon={<Users size={20} />}
                />
                <StatCard
                    label="Active (30d)"
                    value={data.weeklyActiveMembers[data.weeklyActiveMembers.length - 1].value}
                    trend="12.3%"
                    trendUp={true}
                    icon={<Activity size={20} />}
                />
                <StatCard
                    label="Avg Completion"
                    value={isDemoMode ? "68%" : "62%"}
                    trend="2.1%"
                    trendUp={false}
                    icon={<BookOpen size={20} />}
                />
                <StatCard
                    label="Tasks Active"
                    value="8"
                    trend="5"
                    trendUp={true}
                    icon={<CheckSquare size={20} />}
                />
                <StatCard
                    label="Engagement"
                    value={isDemoMode ? "92" : "85"}
                    trend="4.5%"
                    trendUp={true}
                    icon={<TrendingUp size={20} />}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-headers mb-4">Member Growth</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.memberGrowth}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgb(var(--color-surface))', borderRadius: '8px', border: '1px solid rgb(var(--color-borders))', color: 'rgb(var(--color-headers))' }}
                                    itemStyle={{ color: 'rgb(var(--color-primary))' }}
                                    labelStyle={{ color: 'rgb(var(--color-headers))' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3B82F6"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#1E293B' }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-lg font-semibold text-headers mb-4">Weekly Active Members</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.weeklyActiveMembers}>
                                <defs>
                                    <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgb(var(--color-surface))', borderRadius: '8px', border: '1px solid rgb(var(--color-borders))', color: 'rgb(var(--color-headers))' }}
                                    labelStyle={{ color: 'rgb(var(--color-headers))' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#3B82F6"
                                    fillOpacity={1}
                                    fill="url(#colorActive)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            {/* Skills & Paths Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="p-6 lg:col-span-1">
                    <h3 className="text-lg font-semibold text-headers mb-4">Skills Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.skillsDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
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

                <Card className="p-6 lg:col-span-2">
                    <h3 className="text-lg font-semibold text-headers mb-4">Top Learning Paths</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-sm text-secondary-text border-b border-borders">
                                    <th className="pb-3 font-medium">Path Name</th>
                                    <th className="pb-3 font-medium">Difficulty</th>
                                    <th className="pb-3 font-medium">Enrolled</th>
                                    <th className="pb-3 font-medium">Avg. Progress</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {learningPaths.slice(0, 4).map((path) => (
                                    <tr key={path.id} className="border-b border-borders last:border-0">
                                        <td className="py-4 font-medium text-headers">{path.name}</td>
                                        <td className="py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs ${path.difficulty === 'Beginner' ? 'bg-success/10 text-success border border-success/20' :
                                                path.difficulty === 'Intermediate' ? 'bg-warning/10 text-warning border border-warning/20' :
                                                    'bg-error/10 text-error border border-error/20'
                                                }`}>
                                                {path.difficulty}
                                            </span>
                                        </td>
                                        <td className="py-4 text-secondary-text">
                                            {isDemoMode ? Math.round(Math.random() * 20 + 10) : Math.round(Math.random() * 10 + 5)}
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-surfaceHighlight rounded-full w-24">
                                                    <div
                                                        className="h-full bg-primary rounded-full shadow-glow"
                                                        style={{ width: `${path.completionRate}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-xs text-secondary-text">{path.completionRate}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* Feed Row */}
            <h3 className="text-lg font-semibold text-headers mt-8 mb-4">Recent Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {insightsFeed.slice(0, 4).map((item) => (
                    <Card key={item.id} className="p-4 hover:shadow-glow transition-shadow cursor-pointer border-l-4 border-l-primary bg-surface/50 hover:bg-surface">
                        <div className="flex justify-between items-start mb-2">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium bg-surfaceHighlight text-secondary-text`}>
                                {item.tag}
                            </span>
                            <span className="text-xs text-secondary-text">2h ago</span>
                        </div>
                        <h4 className="font-medium text-headers mb-1">{item.title}</h4>
                        <p className="text-sm text-secondary-text line-clamp-2">{item.description}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}
