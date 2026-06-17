import axios from "axios";
import type { Decoracao } from "../Types/Decoracao";

const API_BASE = "http://localhost:5103/api";

export const getDecoracao = async (): Promise<Decoracao[]> => {
    try {
           const resposta = await axios.get(`${API_BASE}/Laar`);
        return resposta.data
    } catch (error) {
        console.error ("Erro ao buscar dados: ", error);
        throw error; 
    }
}

export const deleteDecoracao = async (idDecoracao: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE}/Laar/${idDecoracao}`);
  } catch (error) {
    console.error("Erro ao deletar o produto: ", error);
    throw error;
  }
}

export const enviarFotoParaAPI = async (file: File): Promise<string | undefined> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await axios.post(`${API_BASE}/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
     return res.data.caminhoImagem ?? res.data.CaminhoImagem;
  } catch (error) {
    console.error("Erro no upload da imagem: ", error);
    return undefined;
  }
}

export const postDecoracao = async (decoracao: Decoracao): Promise<void> => {
  try {
   await axios.post(`${API_BASE}/Laar`, decoracao);
  } catch (error) {
    console.error("Erro ao cadastrar o produto", error);
    throw error;
  }
}

export const putDecoracao = async (decoracao: Decoracao): Promise<void> => {
  try {
    if (!decoracao.id) {
      throw new Error("ID do produto não informado");
    }
    await axios.put(`${API_BASE}/Laar/${decoracao.id}`, decoracao);
  } catch (error) {
    console.error("Erro ao atualizar o produto", error);
    throw error;
  }
}