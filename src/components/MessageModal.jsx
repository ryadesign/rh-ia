import React, { useState } from 'react';
import { X, Send, Mail, Phone, User, Sparkles, Check } from 'lucide-react';

const MessageModal = ({ candidate, onClose, onSend }) => {
  const [messageType, setMessageType] = useState('email'); // 'email' or 'sms'
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Templates de messages
  const templates = {
    initial: {
      subject: `Opportunité professionnelle - ${candidate.title}`,
      message: `Bonjour ${candidate.name.split(' ')[0]},\n\nNous avons remarqué votre profil et pensons que vous correspondez parfaitement à une opportunité au sein de notre entreprise.\n\nSeriez-vous disponible pour échanger sur ce poste ?\n\nCordialement,`
    },
    interview: {
      subject: 'Invitation à un entretien',
      message: `Bonjour ${candidate.name.split(' ')[0]},\n\nNous serions ravis de vous rencontrer pour discuter de votre candidature.\n\nSeriez-vous disponible pour un entretien cette semaine ?\n\nCordialement,`
    },
    followup: {
      subject: 'Suite à votre candidature',
      message: `Bonjour ${candidate.name.split(' ')[0]},\n\nJe reviens vers vous concernant votre candidature.\n\nAvez-vous des questions ?\n\nCordialement,`
    }
  };

  const handleUseTemplate = (template) => {
    setSubject(templates[template].subject);
    setMessage(templates[template].message);
  };

  const handleSend = async () => {
    setIsSending(true);
    
    // Simuler l'envoi
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (onSend) {
      onSend({
        to: candidate,
        type: messageType,
        subject,
        message,
        timestamp: new Date().toISOString()
      });
    }
    
    setIsSent(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        {isSent ? (
          // Success State
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Message envoyé avec succès !</h3>
            <p className="text-gray-600">
              Votre message a été envoyé à {candidate.name}
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="text-white">
                    <h2 className="text-2xl font-bold">{candidate.name}</h2>
                    <p className="text-blue-100">{candidate.title}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
              {/* Contact Info */}
              <div className="bg-gray-50 rounded-2xl p-4 mb-6 flex gap-4">
                <div className="flex items-center gap-2 flex-1">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">{candidate.email}</span>
                </div>
                <div className="flex items-center gap-2 flex-1">
                  <Phone className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">{candidate.phone}</span>
                </div>
              </div>

              {/* Message Type Selector */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Canal de communication
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setMessageType('email')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                      messageType === 'email'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Mail className="w-5 h-5" />
                    Email
                  </button>
                  <button
                    onClick={() => setMessageType('sms')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold transition-all ${
                      messageType === 'sms'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Phone className="w-5 h-5" />
                    SMS
                  </button>
                </div>
              </div>

              {/* Templates */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Sparkles className="w-4 h-4 inline mr-1" />
                  Templates rapides
                </label>
                <div className="flex gap-2 flex-wrap">
                  {Object.keys(templates).map((key) => (
                    <button
                      key={key}
                      onClick={() => handleUseTemplate(key)}
                      className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                    >
                      {key === 'initial' && '👋 Premier contact'}
                      {key === 'interview' && '📅 Invitation entretien'}
                      {key === 'followup' && '🔄 Suivi candidature'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject (Email only) */}
              {messageType === 'email' && (
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Objet
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Objet du message..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  />
                </div>
              )}

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={messageType === 'email' ? 'Écrivez votre message...' : 'Votre SMS (160 caractères max)...'}
                  maxLength={messageType === 'sms' ? 160 : undefined}
                  className="w-full h-48 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all resize-none"
                />
                {messageType === 'sms' && (
                  <p className="text-sm text-gray-500 mt-2">
                    {message.length}/160 caractères
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSend}
                  disabled={!message || (messageType === 'email' && !subject) || isSending}
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageModal;

