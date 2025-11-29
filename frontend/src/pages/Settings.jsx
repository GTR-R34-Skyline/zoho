import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Database, Bell, Zap, Sliders, Moon, Sun, Monitor, Save, RefreshCw, Upload, Download, CheckCircle, AlertCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export default function Settings() {
    const { theme, switchTheme } = useTheme();
    const [activeSection, setActiveSection] = useState('appearance');
    const [settings, setSettings] = useState({
        theme: theme,
        accent_color: '#3B82F6',
        db_connection_string: '',
        webhook_url: '',
        bot_enabled: true,
        in_app_notifications: true,
        email_notifications: false
    });
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null); // 'success' | 'error'
    const [dbTestStatus, setDbTestStatus] = useState(null); // 'testing' | 'success' | 'error'

    // Fetch settings on mount
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/settings`);
                const data = response.data;
                setSettings(data);
                // Sync global theme if different
                if (data.theme && data.theme !== theme) {
                    switchTheme(data.theme);
                }
            } catch (error) {
                console.error("Failed to fetch settings:", error);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveStatus(null);

        try {
            await axios.put(`${API_BASE_URL}/settings`, settings);
            setSaveStatus('success');
            setTimeout(() => setSaveStatus(null), 3000);
        } catch (error) {
            console.error("Failed to save settings:", error);
            setSaveStatus('error');
        } finally {
            setIsSaving(false);
        }
    };

    const handleTestDb = async () => {
        setDbTestStatus('testing');
        try {
            // Auto-save first to ensure backend has latest string
            await axios.put(`${API_BASE_URL}/settings`, settings);
            await axios.get(`${API_BASE_URL}/admin/test-db`);
            setDbTestStatus('success');
        } catch (error) {
            setDbTestStatus('error');
        }
    };

    const handleImport = () => {
        document.getElementById('import-file').click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('strategy', 'overwrite'); // Default strategy

        setIsSaving(true);
        try {
            await axios.post(`${API_BASE_URL}/admin/import`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSaveStatus('success');
            setTimeout(() => setSaveStatus(null), 3000);
            // Refresh settings after import
            const response = await axios.get(`${API_BASE_URL}/settings`);
            setSettings(response.data);
        } catch (error) {
            console.error("Failed to import data:", error);
            setSaveStatus('error');
        } finally {
            setIsSaving(false);
            e.target.value = null; // Reset input
        }
    };

    const sections = [
        { id: 'appearance', label: 'Appearance', icon: Monitor },
        { id: 'database', label: 'Database', icon: Database },
        { id: 'integrations', label: 'Integrations', icon: Zap },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'advanced', label: 'Advanced', icon: Sliders },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-headers">Settings</h1>
                <Button onClick={handleSave} disabled={isSaving} className="gap-2">
                    {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>

            {saveStatus === 'success' && (
                <div className="bg-success/10 border border-success/20 text-success px-4 py-3 rounded-lg flex items-center gap-2 animate-fade-in">
                    <CheckCircle size={18} /> Settings saved successfully.
                </div>
            )}

            {saveStatus === 'error' && (
                <div className="bg-error/10 border border-error/20 text-error px-4 py-3 rounded-lg flex items-center gap-2 animate-fade-in">
                    <AlertCircle size={18} /> Failed to save settings.
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Navigation */}
                <Card className="p-2 h-fit lg:col-span-1">
                    <nav className="space-y-1">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium text-left
                  ${activeSection === section.id
                                        ? 'bg-primary/10 text-primary border border-primary/20 shadow-glow'
                                        : 'text-secondary-text hover:bg-white/5 hover:text-headers'
                                    }
                `}
                            >
                                <section.icon size={18} />
                                {section.label}
                            </button>
                        ))}
                    </nav>
                </Card>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-6">

                    {/* Appearance Section */}
                    {activeSection === 'appearance' && (
                        <Card className="p-6 space-y-8">
                            <div>
                                <h2 className="text-lg font-semibold text-headers mb-4">Theme Preference</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    {[
                                        { id: 'light', label: 'Light', icon: Sun },
                                        { id: 'dark', label: 'Dark', icon: Moon },
                                        { id: 'black-blue', label: 'Black-Blue', icon: Monitor }
                                    ].map((themeOption) => (
                                        <button
                                            key={themeOption.id}
                                            onClick={() => {
                                                setSettings({ ...settings, theme: themeOption.id });
                                                switchTheme(themeOption.id);
                                            }}
                                            className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all
                        ${settings.theme === themeOption.id
                                                    ? 'border-primary bg-primary/5 text-primary shadow-glow'
                                                    : 'border-borders bg-surface hover:border-primary/50 text-secondary-text'
                                                }
                      `}
                                        >
                                            <themeOption.icon size={24} />
                                            <span className="font-medium">{themeOption.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-headers mb-4">Accent Color</h2>
                                <div className="flex flex-wrap gap-4">
                                    {[
                                        '#3B82F6', // Blue
                                        '#8B5CF6', // Violet
                                        '#10B981', // Emerald
                                        '#F59E0B', // Amber
                                        '#EF4444', // Red
                                        '#EC4899', // Pink
                                    ].map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSettings({ ...settings, accent_color: color })}
                                            className={`w-10 h-10 rounded-full transition-transform hover:scale-110 focus:outline-none ring-2 ring-offset-2 ring-offset-background
                        ${settings.accent_color === color ? 'ring-white scale-110' : 'ring-transparent'}
                      `}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Database Section */}
                    {activeSection === 'database' && (
                        <Card className="p-6 space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-headers mb-4">Database Connection</h2>
                                <p className="text-sm text-secondary-text mb-4">Configure your MongoDB connection string. This is encrypted and stored securely.</p>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <Input
                                            type="password"
                                            placeholder="mongodb+srv://..."
                                            value={settings.db_connection_string || ''}
                                            onChange={(e) => setSettings({ ...settings, db_connection_string: e.target.value })}
                                        />
                                    </div>
                                    <Button onClick={handleTestDb} disabled={!settings.db_connection_string || dbTestStatus === 'testing'}>
                                        {dbTestStatus === 'testing' ? 'Testing...' : 'Test Connection'}
                                    </Button>
                                </div>

                                {dbTestStatus === 'success' && (
                                    <div className="mt-4 flex items-center gap-2 text-success text-sm animate-fade-in">
                                        <CheckCircle size={16} /> Connection successful!
                                    </div>
                                )}

                                {dbTestStatus === 'error' && (
                                    <div className="mt-4 flex items-center gap-2 text-error text-sm animate-fade-in">
                                        <AlertCircle size={16} /> Connection failed. Please check your string.
                                    </div>
                                )}
                            </div>
                        </Card>
                    )}

                    {/* Integrations Section */}
                    {activeSection === 'integrations' && (
                        <Card className="p-6 space-y-6">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-lg font-semibold text-headers">Zoho Cliq Bot</h2>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm ${settings.bot_enabled ? 'text-success' : 'text-secondary-text'}`}>
                                            {settings.bot_enabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                        <button
                                            onClick={() => setSettings({ ...settings, bot_enabled: !settings.bot_enabled })}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                        ${settings.bot_enabled ? 'bg-primary shadow-glow' : 'bg-surfaceHighlight'}
                      `}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.bot_enabled ? 'translate-x-6' : 'translate-x-1'}`} />
                                        </button>
                                    </div>
                                </div>

                                <Input
                                    label="Webhook URL"
                                    placeholder="https://cliq.zoho.com/api/v2/..."
                                    value={settings.webhook_url || ''}
                                    onChange={(e) => setSettings({ ...settings, webhook_url: e.target.value })}
                                    disabled={!settings.bot_enabled}
                                />
                                <p className="text-xs text-secondary-text mt-2">
                                    Paste the incoming webhook URL from your Zoho Cliq bot configuration.
                                </p>
                            </div>
                        </Card>
                    )}

                    {/* Notifications Section */}
                    {activeSection === 'notifications' && (
                        <Card className="p-6 space-y-6">
                            <h2 className="text-lg font-semibold text-headers mb-4">Notification Preferences</h2>

                            <div className="flex items-center justify-between p-4 bg-surfaceHighlight/30 rounded-lg border border-borders">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                        <Bell size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-headers">In-App Mentions</h3>
                                        <p className="text-sm text-secondary-text">Get notified when someone mentions you in a task.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSettings({ ...settings, in_app_notifications: !settings.in_app_notifications })}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${settings.in_app_notifications ? 'bg-primary shadow-glow' : 'bg-surfaceHighlight'}
                  `}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.in_app_notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-surfaceHighlight/30 rounded-lg border border-borders">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                        <Bell size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-headers">Email Updates</h3>
                                        <p className="text-sm text-secondary-text">Receive daily summaries of team progress.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSettings({ ...settings, email_notifications: !settings.email_notifications })}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                    ${settings.email_notifications ? 'bg-primary shadow-glow' : 'bg-surfaceHighlight'}
                  `}
                                >
                                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.email_notifications ? 'translate-x-6' : 'translate-x-1'}`} />
                                </button>
                            </div>
                        </Card>
                    )}

                    {/* Advanced Section */}
                    {activeSection === 'advanced' && (
                        <Card className="p-6 space-y-6">
                            <h2 className="text-lg font-semibold text-headers mb-4">Data Management</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 border border-borders rounded-xl bg-surfaceHighlight/10">
                                    <h3 className="font-medium text-headers mb-2">Export Data</h3>
                                    <p className="text-sm text-secondary-text mb-4">Download a JSON backup of all members, tasks, and paths.</p>
                                    <Button variant="outline" className="w-full gap-2" onClick={() => window.open(`${API_BASE_URL}/admin/export`, '_blank')}>
                                        <Download size={16} /> Export JSON
                                    </Button>
                                </div>

                                <div className="p-4 border border-borders rounded-xl bg-surfaceHighlight/10">
                                    <h3 className="font-medium text-headers mb-2">Import Data</h3>
                                    <p className="text-sm text-secondary-text mb-4">Restore data from a previous backup file.</p>
                                    <Button variant="outline" className="w-full gap-2" onClick={handleImport}>
                                        <Upload size={16} /> Import JSON
                                    </Button>
                                    <input
                                        type="file"
                                        id="import-file"
                                        className="hidden"
                                        accept=".json"
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-borders">
                                <h3 className="font-medium text-error mb-2">Danger Zone</h3>
                                <p className="text-sm text-secondary-text mb-4">Resetting demo data will revert all changes to the initial state.</p>
                                <Button variant="danger" className="gap-2">
                                    <RefreshCw size={16} /> Reset Demo Data
                                </Button>
                            </div>
                        </Card>
                    )}

                </div>
            </div>
        </div>
    );
}
