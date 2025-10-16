import React, { useState, useContext } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Send, Search, Filter, Clock, User, Building2, Mail, Phone, Star, CheckCircle, AlertCircle } from 'lucide-react';

const MessagesView = () => {
  const { messages, candidates, jobs, currentUser } = useApp();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Simuler des conversations plus complètes
  const conversations = [
    {
      id: 1,
      candidate: candidates[0],
      job: jobs[0],
      lastMessage: "Merci pour votre intérêt ! Quand pouvons-nous programmer un entretien ?",
      lastMessageTime: "2024-01-15T14:30:00Z",
      unreadCount: 2,
      status: "active",
      messages: [
        {
          id: 1,
          from: candidates[0].id,
          to: currentUser.id,
          content: "Bonjour, je suis très intéressé par le poste de Développeur Python Senior. J'ai 6 ans d'expérience avec Django et PostgreSQL.",
          timestamp: "2024-01-15T10:00:00Z",
          type: "text"
        },
        {
          id: 2,
          from: currentUser.id,
          to: candidates[0].id,
          content: "Bonjour Sophie ! Merci pour votre candidature. Votre profil correspond parfaitement à nos attentes. Pouvez-vous me dire votre disponibilité pour un entretien ?",
          timestamp: "2024-01-15T11:15:00Z",
          type: "text"
        },
        {
          id: 3,
          from: candidates[0].id,
          to: currentUser.id,
          content: "Merci pour votre intérêt ! Quand pouvons-nous programmer un entretien ?",
          timestamp: "2024-01-15T14:30:00Z",
          type: "text"
        }
      ]
    },
    {
      id: 2,
      candidate: candidates[1],
      job: jobs[1],
      lastMessage: "Parfait, j'envoie mon CV détaillé par email.",
      lastMessageTime: "2024-01-14T16:45:00Z",
      unreadCount: 0,
      status: "pending",
      messages: [
        {
          id: 4,
          from: candidates[1].id,
          to: currentUser.id,
          content: "Salut ! J'ai vu votre offre pour Développeur Full Stack. Ça m'intéresse beaucoup !",
          timestamp: "2024-01-14T15:00:00Z",
          type: "text"
        },
        {
          id: 5,
          from: currentUser.id,
          to: candidates[1].id,
          content: "Bonjour Thomas ! Ravi de votre intérêt. Pouvez-vous m'envoyer votre CV et me parler de vos projets React récents ?",
          timestamp: "2024-01-14T15:30:00Z",
          type: "text"
        },
        {
          id: 6,
          from: candidates[1].id,
          to: currentUser.id,
          content: "Parfait, j'envoie mon CV détaillé par email.",
          timestamp: "2024-01-14T16:45:00Z",
          type: "text"
        }
      ]
    },
    {
      id: 3,
      candidate: candidates[2],
      job: jobs[2],
      lastMessage: "Je suis disponible dès la semaine prochaine pour un entretien.",
      lastMessageTime: "2024-01-13T09:20:00Z",
      unreadCount: 1,
      status: "interview",
      messages: [
        {
          id: 7,
          from: candidates[2].id,
          to: currentUser.id,
          content: "Bonjour, j'ai 8 ans d'expérience en gestion de projet digital. Votre offre m'intéresse énormément.",
          timestamp: "2024-01-13T08:00:00Z",
          type: "text"
        },
        {
          id: 8,
          from: currentUser.id,
          to: candidates[2].id,
          content: "Bonjour Marie ! Votre profil est excellent. Quand seriez-vous disponible pour un entretien ?",
          timestamp: "2024-01-13T08:30:00Z",
          type: "text"
        },
        {
          id: 9,
          from: candidates[2].id,
          to: currentUser.id,
          content: "Je suis disponible dès la semaine prochaine pour un entretien.",
          timestamp: "2024-01-13T09:20:00Z",
          type: "text"
        }
      ]
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.job.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || conv.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'interview': return 'bg-blue-100 text-blue-700';
      case 'hired': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'En cours';
      case 'pending': return 'En attente';
      case 'interview': return 'Entretien';
      case 'hired': return 'Embauché';
      default: return 'Nouveau';
    }
  };

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
    if (newMessage.trim() && selectedConversation) {
      // Simuler l'envoi du message
      const message = {
        id: Date.now(),
        from: currentUser.id,
        to: selectedConversation.candidate.id,
        content: newMessage,
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      
      selectedConversation.messages.push(message);
      selectedConversation.lastMessage = newMessage;
      selectedConversation.lastMessageTime = message.timestamp;
      
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="apple-title text-3xl sm:text-4xl lg:text-5xl text-black mb-2">
          Messages
        </h1>
        <p className="apple-body text-sm sm:text-base text-gray-500">
          Gérez vos conversations avec les candidats
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Conversations List */}
        <div className="lg:col-span-1">
          <div className="apple-card p-4 h-full flex flex-col">
            {/* Search & Filter */}
            <div className="mb-4 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher une conversation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 apple-input text-sm"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    filterStatus === 'all' 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Tous
                </button>
                <button
                  onClick={() => setFilterStatus('active')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    filterStatus === 'active' 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Actifs
                </button>
                <button
                  onClick={() => setFilterStatus('interview')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    filterStatus === 'interview' 
                      ? 'bg-black text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Entretiens
                </button>
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedConversation?.id === conversation.id
                      ? 'bg-black text-white'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={conversation.candidate.photo}
                        alt={conversation.candidate.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-semibold text-sm truncate ${
                          selectedConversation?.id === conversation.id ? 'text-white' : 'text-black'
                        }`}>
                          {conversation.candidate.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          {conversation.unreadCount > 0 && (
                            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {conversation.unreadCount}
                            </span>
                          )}
                          <span className={`text-xs ${
                            selectedConversation?.id === conversation.id ? 'text-gray-300' : 'text-gray-500'
                          }`}>
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        </div>
                      </div>
                      
                      <p className={`text-xs mb-2 ${
                        selectedConversation?.id === conversation.id ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {conversation.job.title}
                      </p>
                      
                      <p className={`text-sm truncate ${
                        selectedConversation?.id === conversation.id ? 'text-gray-200' : 'text-gray-700'
                      }`}>
                        {conversation.lastMessage}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(conversation.status)}`}>
                          {getStatusLabel(conversation.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          {selectedConversation ? (
            <div className="apple-card h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={selectedConversation.candidate.photo}
                      alt={selectedConversation.candidate.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-black">{selectedConversation.candidate.name}</h3>
                    <p className="text-sm text-gray-500">{selectedConversation.job.title} - {selectedConversation.job.company}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Phone className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Mail className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.from === currentUser.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.from === currentUser.id
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-black'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.from === currentUser.id ? 'text-gray-300' : 'text-gray-500'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Tapez votre message..."
                    className="flex-1 apple-input"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="apple-button-primary px-4 py-2 disabled:opacity-40"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="apple-card h-full flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Sélectionnez une conversation</h3>
                <p className="text-gray-500">Choisissez une conversation pour commencer à échanger</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesView;
