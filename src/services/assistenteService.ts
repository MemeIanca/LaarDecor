import axios from "axios";

const API_BASE = "http://localhost:5103/api";

export const perguntarAssistente = async (texto: string): Promise<string> => {
  try {
    const resposta = await axios.post<string>(
      `${API_BASE}/Assistente`,
      JSON.stringify(texto),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = resposta.data;
    // Remove qualquer prefixo "SEGURO" retornado pelo modelo do backend
    if (data && data.startsWith("SEGURO")) {
      data = data.replace(/^SEGURO\s*/i, "");
    }
    return data;
  } catch (error) {
    console.error("Erro ao chamar o assistente do backend:", error);
    throw error;
  }
};
