import React, { useState, useEffect, useRef } from "react";
import { perguntarAssistente } from "../../services/assistenteService";
import "./ChatAssistente.css";

interface Mensagem {
  tipo: "user" | "assistant";
  texto: string;
}

export default function ChatAssistente() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    {
      tipo: "assistant",
      texto: "Olá! Sou o Assistente Virtual da LaarDecor. Como posso ajudar você hoje com a decoração do seu lar?",
    },
  ]);
  const [input, setInput] = useState("");
  const [digitando, setDigitando] = useState(false);
  const [aberto, setAberto] = useState(false);

  const mensagensEndRef = useRef<HTMLDivElement>(null);

  // Scroll automático para a última mensagem
  const scrollToBottom = () => {
    mensagensEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (aberto) {
      scrollToBottom();
    }
  }, [mensagens, digitando, aberto]);

  const handleEnviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const textoUsuario = input.trim();
    setInput("");

    // Adiciona pergunta imediatamente como balão do usuário
    const novaMensagemUsuario: Mensagem = { tipo: "user", texto: textoUsuario };
    setMensagens((prev) => [...prev, novaMensagemUsuario]);

    // Mostra indicador de digitando
    setDigitando(true);

    try {
      // Envia pergunta ao endpoint através de perguntarAssistente
      const respostaAPI = await perguntarAssistente(textoUsuario);

      // Adiciona resposta recebida da API
      const novaMensagemAssistente: Mensagem = {
        tipo: "assistant",
        texto: respostaAPI || "Desculpe, não consegui processar uma resposta.",
      };
      setMensagens((prev) => [...prev, novaMensagemAssistente]);
    } catch (error) {
      console.error("Erro ao obter resposta do assistente:", error);
      const mensagemErro: Mensagem = {
        tipo: "assistant",
        texto: "Ops! Ocorreu um erro ao conectar com o assistente. Por favor, tente novamente mais tarde.",
      };
      setMensagens((prev) => [...prev, mensagemErro]);
    } finally {
      // Oculta indicador de digitando
      setDigitando(false);
    }
  };

  return (
    <div className="chat-container-root">
      {/* Botão Flutuante para Abrir/Fechar o Chat */}
      <button
        className={`chat-toggle-btn ${aberto ? "active" : ""}`}
        onClick={() => setAberto(!aberto)}
        title={aberto ? "Fechar Assistente" : "Conversar com Assistente"}
        aria-label="Toggle Chat"
      >
        {aberto ? (
          <svg className="chat-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg className="chat-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
      </button>

      {/* Janela de Chat */}
      {aberto && (
        <div className="chat-window">
          {/* Cabeçalho */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-avatar-status"></div>
              <div>
                <h3 className="chat-header-title">Assistente LaarDecor</h3>
                <span className="chat-header-subtitle">Online</span>
              </div>
            </div>
            <button className="chat-header-close-btn" onClick={() => setAberto(false)} title="Minimizar">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>

          {/* Área de Mensagens */}
          <div className="chat-messages-area">
            {mensagens.map((msg, index) => (
              <div
                key={index}
                className={`chat-bubble-wrapper ${
                  msg.tipo === "user" ? "chat-wrapper-user" : "chat-wrapper-assistant"
                }`}
              >
                <div
                  className={`chat-bubble ${
                    msg.tipo === "user" ? "chat-bubble-user" : "chat-bubble-assistant"
                  }`}
                >
                  <p className="chat-bubble-text">{msg.texto}</p>
                </div>
              </div>
            ))}

            {/* Indicador de Digitando */}
            {digitando && (
              <div className="chat-bubble-wrapper chat-wrapper-assistant">
                <div className="chat-bubble chat-bubble-assistant chat-typing-bubble">
                  <div className="chat-typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={mensagensEndRef} />
          </div>

          {/* Campo de Entrada de Mensagens */}
          <form className="chat-input-form" onSubmit={handleEnviar}>
            <input
              type="text"
              className="chat-input-field"
              placeholder="Digite sua mensagem..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={digitando}
            />
            <button type="submit" className="chat-send-btn" disabled={!input.trim() || digitando} title="Enviar">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
