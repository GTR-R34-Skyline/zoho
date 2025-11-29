import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Bot, User, MoreVertical, Phone, Video, Search } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import Avatar from '../components/Avatar';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export default function Chat() {
    const location = useLocation();
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hello! I am the Zoho LMS Bot. You can use commands like /help to see what I can do.', time: '10:00 AM' }
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [members, setMembers] = useState([]);
    const [activeChat, setActiveChat] = useState(null); // { id: 'bot', name: 'Zoho Bot' } or member object

    useEffect(() => {
        fetchMembers();
    }, []);

    useEffect(() => {
        if (location.state?.memberId && members.length > 0) {
            const member = members.find(m => m._id === location.state.memberId);
            if (member) {
                setActiveChat(member);
            }
        } else if (!activeChat) {
            setActiveChat({ _id: 'bot', name: 'Zoho Bot', role: 'Assistant' });
        }
    }, [location.state, members]);

    const fetchMembers = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/members`);
            setMembers(response.data);
        } catch (error) {
            console.error("Failed to fetch members:", error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg]);
        setNewMessage('');

        // Command Parsing Logic
        if (newMessage.startsWith('/')) {
            await handleCommand(newMessage);
        } else if (activeChat._id === 'bot') {
            // Bot auto-response for non-commands
            setTimeout(() => {
                const botMsg = {
                    id: Date.now() + 1,
                    sender: 'bot',
                    text: "I'm listening! Try /help to see available commands.",
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, botMsg]);
            }, 1000);
        }
    };

    const handleCommand = async (command) => {
        const parts = command.split(' ');
        const cmd = parts[0].toLowerCase();
        let responseText = '';

        switch (cmd) {
            case '/help':
                responseText = "Available commands:\n/addSkill [skill] - Add a skill to your profile\n/recommend - Get course recommendations";
                break;
            case '/recommend':
                responseText = "I can recommend courses based on your skills. (Feature coming soon!)";
                break;
            default:
                responseText = `Unknown command: ${cmd}. Try /help.`;
        }

        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: responseText,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, botMsg]);
        }, 500);
    };

    return (
        <div className="h-[calc(100vh-2rem)] flex gap-6 animate-fade-in">
            {/* Sidebar List */}
            <Card className="w-80 flex flex-col p-0 overflow-hidden hidden lg:flex">
                <div className="p-4 border-b border-borders">
                    <Input placeholder="Search chats..." icon={Search} />
                </div>
                <div className="flex-1 overflow-y-auto">
                    {/* Bot Entry */}
                    <div
                        onClick={() => setActiveChat({ _id: 'bot', name: 'Zoho Bot', role: 'Assistant' })}
                        className={`p-4 flex items-center gap-3 hover:bg-surfaceHighlight cursor-pointer transition-colors ${activeChat?._id === 'bot' ? 'bg-primary/10 border-l-4 border-primary' : ''}`}
                    >
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
                            <Bot size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                                <h4 className={`font-medium truncate ${activeChat?._id === 'bot' ? 'text-primary' : 'text-headers'}`}>Zoho Bot</h4>
                                <span className="text-xs text-secondary-text">Now</span>
                            </div>
                            <p className="text-sm text-secondary-text truncate">Always here to help</p>
                        </div>
                    </div>

                    {/* Members List */}
                    {members.map((member) => (
                        <div
                            key={member._id}
                            onClick={() => setActiveChat(member)}
                            className={`p-4 flex items-center gap-3 hover:bg-surfaceHighlight cursor-pointer transition-colors ${activeChat?._id === member._id ? 'bg-primary/10 border-l-4 border-primary' : ''}`}
                        >
                            <Avatar src={member.avatar} initials={member.initials} size="md" className={activeChat?._id === member._id ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface' : ''} />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <h4 className={`font-medium truncate ${activeChat?._id === member._id ? 'text-primary' : 'text-headers'}`}>{member.name}</h4>
                                    <span className="text-xs text-secondary-text">10:01 AM</span>
                                </div>
                                <p className="text-sm text-secondary-text truncate">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Chat Area */}
            <Card className="flex-1 flex flex-col p-0 overflow-hidden relative">
                {/* Header */}
                <div className="p-4 border-b border-borders flex justify-between items-center bg-surface/50 backdrop-blur">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            {activeChat?._id === 'bot' ? (
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30 shadow-glow">
                                    <Bot size={24} />
                                </div>
                            ) : (
                                <Avatar src={activeChat?.avatar} initials={activeChat?.initials} size="md" />
                            )}
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-surface"></span>
                        </div>
                        <div>
                            <h3 className="font-bold text-headers">{activeChat?.name || 'Select a chat'}</h3>
                            <p className="text-xs text-primary flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Online
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm"><Phone size={20} /></Button>
                        <Button variant="ghost" size="sm"><Video size={20} /></Button>
                        <Button variant="ghost" size="sm"><MoreVertical size={20} /></Button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-background to-surface/50">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'bot' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-surfaceHighlight text-secondary-text'
                                }`}>
                                {msg.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                            </div>
                            <div className={`max-w-[70%] space-y-1 ${msg.sender === 'user' ? 'items-end flex flex-col' : ''}`}>
                                <div className={`p-4 rounded-2xl shadow-sm ${msg.sender === 'user'
                                    ? 'bg-primary text-white rounded-tr-none shadow-glow'
                                    : 'bg-surface border border-borders rounded-tl-none text-headers'
                                    }`}>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                                </div>
                                <span className="text-xs text-secondary-text px-1">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-borders bg-surface">
                    <form onSubmit={handleSendMessage} className="flex gap-3">
                        <Input
                            className="flex-1"
                            placeholder={activeChat?._id === 'bot' ? "Type a message or command (e.g., /help)..." : "Type a message..."}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            autoFocus
                        />
                        <Button type="submit" className="shadow-glow">
                            <Send size={18} />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
}
