"use client";
import { Send } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import axios from "axios";
import { useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { BACKEND_URL } from "@/config";

export function Prompt() {
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const { getToken } = useAuth();
  return (
    <div>
      <Textarea placeholder="Create a chess application..." ref={promptRef} />
      <div className="flex justify-end pt-2">
        <Button
          onClick={async () => {
            const token = await getToken();

            const response = await axios.post(
              `${BACKEND_URL}/project`,
              {
                prompt: promptRef.current?.value,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log(response.data);
          }}
        >
          <Send />
        </Button>
      </div>
    </div>
  );
}
