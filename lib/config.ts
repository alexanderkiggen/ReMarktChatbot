import { StartScreenPrompt } from "@openai/chatkit";

export const WORKFLOW_ID = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "Waar kan de ReDuck Bot mij mee helpen?",
    prompt: "Waar kan de ReDuck Bot mij mee helpen?",
    icon: "circle-question",
  },
  {
    label: "Product retourneren",
    prompt: "Ik wil graag een product retourneren",
    icon: "circle-question",
  },
    {
    label: "Informatie over mijn bestelling",
    prompt: "Ik wil graag informatie over mijn bestelling",
    icon: "circle-question",
  },
];

export const PLACEHOLDER_INPUT = "Vraag iets...";

export const GREETING = "Hoe kan ik je vandaag helpen?";
