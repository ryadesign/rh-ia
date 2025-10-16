import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Loader } from 'lucide-react';

const VoiceInput = ({ onTranscript, onError }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    // Vérifier si l'API Web Speech est supportée
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'fr-FR';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (onError) {
          onError(event.error);
        }
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [onTranscript, onError]);

  const startListening = () => {
    if (recognition && !isListening) {
      try {
        recognition.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting recognition:', error);
        if (onError) {
          onError(error.message);
        }
      }
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  if (!isSupported) {
    return (
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <MicOff className="w-4 h-4" />
        <span>Reconnaissance vocale non supportée</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={isListening ? stopListening : startListening}
      className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
        isListening
          ? 'bg-red-500 hover:bg-red-600 animate-listening shadow-lg shadow-red-500/50'
          : 'bg-primary hover:bg-blue-700 shadow-md'
      }`}
      title={isListening ? 'Arrêter l\'écoute' : 'Démarrer la reconnaissance vocale'}
    >
      {isListening ? (
        <Mic className="w-6 h-6 text-white" />
      ) : (
        <Mic className="w-6 h-6 text-white" />
      )}
    </button>
  );
};

export default VoiceInput;

