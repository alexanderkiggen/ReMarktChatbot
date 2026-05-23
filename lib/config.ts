import { StartScreenPrompt } from "@openai/chatkit";

export const WORKFLOW_ID = process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID?.trim() ?? "";

export const CREATE_SESSION_ENDPOINT = "/api/create-session";

export const STARTER_PROMPTS: StartScreenPrompt[] = [
  {
    label: "Ik heb een vraag over mijn bestelling",
    prompt: "ik heb een vraag over mijn bestelling",
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
