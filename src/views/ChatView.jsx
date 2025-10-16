import React, { useState, useContext } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Send, Search, Phone, Video, MoreVertical, Smile, Paperclip, Mic, MicOff, Users, Online, Clock } from 'lucide-react';

const ChatView = () => {
  const { currentUser, userType } = useApp();
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Simuler des conversations plus complètes
  const conversations = [
    {
      id: 1,
      name: "Sophie Martin",
      role: "Développeuse Python Senior",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Parfait ! Je suis disponible demain à 14h pour l'entretien.",
      lastMessageTime: "2024-01-15T14:30:00Z",
      unreadCount: 2,
      isOnline: true,
      status: "active",
      messages: [
        {
          id: 1,
          from: "sophie",
          to: currentUser.id,
          content: "Bonjour ! Merci pour votre message concernant le poste de Développeur Python Senior.",
          timestamp: "2024-01-15T10:00:00Z",
          type: "text"
        },
        {
          id: 2,
          from: currentUser.id,
          to: "sophie",
          content: "Bonjour Sophie ! Ravi de votre intérêt. Votre profil correspond parfaitement à nos attentes.",
          timestamp: "2024-01-15T10:15:00Z",
          type: "text"
        },
        {
          id: 3,
          from: "sophie",
          to: currentUser.id,
          content: "Parfait ! Je suis disponible demain à 14h pour l'entretien.",
          timestamp: "2024-01-15T14:30:00Z",
          type: "text"
        }
      ]
    },
    {
      id: 2,
      name: "Thomas Dubois",
      role: "Développeur Full Stack",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastMessage: "J'ai envoyé mon portfolio par email. Qu'en pensez-vous ?",
      lastMessageTime: "2024-01-14T16:45:00Z",
      unreadCount: 0,
      isOnline: false,
      status: "pending",
      messages: [
        {
          id: 4,
          from: "thomas",
          to: currentUser.id,
          content: "Salut ! J'ai vu votre offre pour Développeur Full Stack. Ça m'intéresse beaucoup !",
          timestamp: "2024-01-14T15:00:00Z",
          type: "text"
        },
        {
          id: 5,
          from: currentUser.id,
          to: "thomas",
          content: "Bonjour Thomas ! Ravi de votre intérêt. Pouvez-vous m'envoyer votre portfolio ?",
          timestamp: "2024-01-14T15:30:00Z",
          type: "text"
        },
        {
          id: 6,
          from: "thomas",
          to: currentUser.id,
          content: "J'ai envoyé mon portfolio par email. Qu'en pensez-vous ?",
          timestamp: "2024-01-14T16:45:00Z",
          type: "text"
        }
      ]
    },
    {
      id: 3,
      name: "Marie Leroy",
      role: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Merci pour l'entretien d'hier ! J'attends vos retours avec impatience.",
      lastMessageTime: "2024-01-13T09:20:00Z",
      unreadCount: 1,
      isOnline: true,
      status: "interview",
      messages: [
        {
          id: 7,
          from: "marie",
          to: currentUser.id,
          content: "Bonjour, j'ai 8 ans d'expérience en gestion de produit. Votre offre m'intéresse énormément.",
          timestamp: "2024-01-13T08:00:00Z",
          type: "text"
        },
        {
          id: 8,
          from: currentUser.id,
          to: "marie",
          content: "Bonjour Marie ! Votre profil est excellent. Quand seriez-vous disponible pour un entretien ?",
          timestamp: "2024-01-13T08:30:00Z",
          type: "text"
        },
        {
          id: 9,
          from: "marie",
          to: currentUser.id,
          content: "Merci pour l'entretien d'hier ! J'attends vos retours avec impatience.",
          timestamp: "2024-01-13T09:20:00Z",
          type: "text"
        }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv => 
    conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `Il y a ${days}j`;
    if (hours > 0) return `Il y a ${hours}h`;
    return 'À l\'instant';
  };

  const sendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message = {
        id: Date.now(),
        from: currentUser.id,
        to: selectedChat.id,
        content: newMessage,
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      
      selectedChat.messages.push(message);
      selectedChat.lastMessage = newMessage;
      selectedChat.lastMessageTime = message.timestamp;
      
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="apple-title text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-2">
          Chat
        </h1>
        <p className="apple-body text-sm sm:text-base text-gray-600">
          Communiquez en temps réel avec vos contacts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <div className="apple-card p-4 h-full flex flex-col">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une conversation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 apple-input text-sm"
              />
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                    selectedChat?.id === conversation.id
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {conversation.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold text-sm truncate ${
                          selectedChat?.id === conversation.id ? 'text-white' : 'text-gray-900'
                        }`}>
                          {conversation.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          {conversation.unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                          <span className={`text-xs ${
                            selectedChat?.id === conversation.id ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        </div>
                      </div>
                      
                      <p className={`text-xs mb-2 ${
                        selectedChat?.id === conversation.id ? 'text-blue-100' : 'text-gray-600'
                      }`}>
                        {conversation.role}
                      </p>
                      
                      <p className={`text-sm truncate ${
                        selectedChat?.id === conversation.id ? 'text-white' : 'text-gray-700'
                      }`}>
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3">
          {selectedChat ? (
            <div className="apple-card h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={selectedChat.avatar}
                          alt={selectedChat.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {selectedChat.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{selectedChat.name}</h3>
                      <p className="text-sm text-gray-600">{selectedChat.role}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {selectedChat.isOnline ? (
                          <>
                            <Online className="w-3 h-3 text-green-500" />
                            <span className="text-xs text-green-600">En ligne</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">Hors ligne</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                      <Video className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                      <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-white to-gray-50">
                {selectedChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.from === currentUser.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                        message.from === currentUser.id
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.from === currentUser.id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-200 bg-white">
                <div className="flex items-end gap-3">
                  <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                    <Paperclip className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Tapez votre message..."
                      className="w-full apple-input pr-12"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors">
                      <Smile className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  
                  <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                    <Mic className="w-5 h-5 text-gray-600" />
                  </button>
                  
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="apple-button-primary p-3 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="apple-card h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Sélectionnez une conversation</h3>
                <p className="text-gray-600">Choisissez une conversation pour commencer à échanger</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatView;
