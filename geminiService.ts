import { GoogleGenAI } from "@google/genai";
import { ResultType } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDeepDreamAnalysis = async (result: ResultType): Promise<string> => {
  try {
    const prompt = `
      Você é um especialista místico e psicológico em interpretação de sonhos (baseado em Jung e Freud).
      O usuário acabou de completar um teste de 30 perguntas sobre um sonho recente.
      
      O Resultado Final calculado foi: "${result.title}"
      Subtítulo: "${result.subtitle}"
      Descrição Básica: "${result.description}"
      
      Sua tarefa:
      Escreva uma análise "profunda" e personalizada de 2 parágrafos (aprox 150 palavras) para este usuário.
      Fale diretamente com ele ("Você...").
      Use um tom místico, acolhedor, mas psicologicamente perspicaz.
      Aprofunde o significado do arquétipo "${result.title}".
      Encoraje o usuário a realizar o exercício proposto: "${result.exercise}".
      
      Não use formatação markdown complexa (apenas texto corrido).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Não foi possível conectar ao oráculo dos sonhos no momento. Concentre-se na sua reflexão interna.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "O oráculo está silencioso agora (Erro de conexão). Mas sua jornada continua com o exercício proposto.";
  }
};
