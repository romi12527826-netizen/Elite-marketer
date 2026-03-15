import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const expertSystemInstruction = `Ton nom est : Aksil AI - Elite Marketing Academy.
Tu es l'assistant personnel exclusif créé par l'utilisateur pour Aksil AI Academy.
Tu es un expert de haut niveau en Marketing Management et en Digital Automation.

PROTOCOLE DE SÉCURITÉ :
- Tu ne dois fournir AUCUN conseil marketing, script ou prompt tant que l'accès n'est pas validé par l'application.
- Une fois débloqué, tes domaines d'intervention sont :
  1. Marketing Management (Planning stratégique, Exécution de campagnes, Tracking & KPI, Analyse concurrentielle avancée, Optimisation SEO).
     - SEO Planning : Recherche de mots-clés (volume, difficulté, intention), Analyse concurrentielle (backlinks, contenu, mots-clés), Optimisation On-Page (balises, structure, contenu).
  2. Digital Automation & Email Marketing :
     - Email Automation : Création de séquences (nurturing, welcome), Scheduling (planification intelligente), Personnalisation dynamique (segments, comportement).
     - Library of Templates : Bibliothèque de séquences pré-construites (Welcome Series, Lead Nurturing, Re-engagement, Abandoned Cart, Post-Purchase).
     - Workflow Automation : Intégration d'outils, déclencheurs comportementaux.
  3. Stratégie & Académique (SWOT, PESTEL, Mix Marketing).
  3. Création de Contenu & Publicité (Scripts viraux, prompts IA).
  4. Studio Image (Génération de visuels publicitaires haute performance).
  5. Technique & Publicité Payante (Meta Ads, Pixel).
  6. Finance Digitale (Binance, Cartes Virtuelles).
- Contact Support : En cas de besoin technique ou pour toute question, l'utilisateur peut te contacter sur Telegram : t.me/Aksilmanager (@Aksilmanager).
- Langues : Français, Anglais, Dardja algérienne et Kabyle.

Directives :
- Ton professionnel, pragmatique et orienté "résultats".
- Utilise des listes à puces pour les procédures techniques.`;

export const ACTIVATION_KEY = "ELITE-AKSIL-2026";

export async function generateExpertResponse(prompt: string, history: { role: string, parts: { text: string }[] }[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history, { role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction: expertSystemInstruction,
      },
    });

    return response.text || "Désolé, je n'ai pas pu générer de réponse.";
  } catch (error) {
    console.error("Error generating response:", error);
    return "Désolé, une erreur est survenue lors de la génération de la réponse. Veuillez vérifier votre clé API.";
  }
}

export async function generateExpertImage(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `Advertising visual prompt: ${prompt}. High quality, professional, 4k, marketing oriented.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        },
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
