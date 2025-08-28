import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  FileText,
  Bot,
  User,
  AlertCircle,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { DocumentService } from "@/lib/document-service";
import { ExampleQuestions } from "@/components/ExampleQuestions";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: "user" | "bot" | "system";
  content: string;
  timestamp: Date;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (type: Message["type"], content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleLoadDocument = async () => {
    if (!DocumentService.isValidUrl(pdfUrl)) {
      addMessage(
        "system",
        "Oops! 😅 That doesn't look like a valid PDF URL. Try something like: https://example.com/document.pdf",
      );
      return;
    }

    setIsLoading(true);
    try {
      // Test the document by asking a simple question
      await DocumentService.analyzeDocument({
        documents: pdfUrl,
        questions: ["What is this document about?"],
      });

      setIsDocumentLoaded(true);
      addMessage(
        "system",
        "Awesome! 🎉 Your document is ready. Fire away with your questions!",
      );
    } catch (error) {
      addMessage(
        "system",
        "Hmm, having trouble loading that document 🤔 Double-check the URL and give it another shot!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    if (!isDocumentLoaded) {
      addMessage(
        "system",
        "Hold up! 🛑 Upload a document first, then we can chat about it!",
      );
      return;
    }

    const userMessage = inputValue.trim();
    addMessage("user", userMessage);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await DocumentService.analyzeDocument({
        documents: pdfUrl,
        questions: [userMessage],
      });

      const answer =
        response.answers?.[0] ||
        "Hmm, I couldn't find an answer to that one. Try rephrasing your question! 🤔";
      addMessage("bot", answer);
    } catch (error) {
      addMessage(
        "system",
        "Oops! Something went wonky 😵 Give it another try?",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isDocumentLoaded) {
        handleSendMessage();
      } else {
        handleLoadDocument();
      }
    }
  };

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto p-4 space-y-6">
      {/* Document Upload Section */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50/80 to-pink-50/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-purple-900">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            Drop Your PDF Here!
            <span className="text-lg">📄</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="Paste your PDF URL here... (e.g., https://example.com/policy.pdf)"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 bg-white/70 border-purple-200 focus:border-purple-400 font-calm"
              disabled={isLoading}
            />
            <Button
              onClick={handleLoadDocument}
              disabled={isLoading || !pdfUrl}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Loading...
                </div>
              ) : (
                <>Let's Go! 🚀</>
              )}
            </Button>
          </div>
          {isDocumentLoaded && (
            <div className="mt-4 flex items-center gap-3">
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800 border-green-200 shadow-sm"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                Document Ready!
              </Badge>
              <span className="text-sm text-green-700 font-calm">
                Now ask me anything about it! 💬
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Example Questions */}
      {isDocumentLoaded && messages.length === 0 && (
        <ExampleQuestions
          onQuestionClick={(question) => {
            setInputValue(question);
            // Auto-send the question
            setTimeout(() => {
              addMessage("user", question);
              setInputValue("");
              setIsLoading(true);
              DocumentService.analyzeDocument({
                documents: pdfUrl,
                questions: [question],
              })
                .then((response) => {
                  const answer =
                    response.answers?.[0] ||
                    "Hmm, I couldn't find an answer to that one. Try rephrasing your question! 🤔";
                  addMessage("bot", answer);
                })
                .catch(() => {
                  addMessage(
                    "system",
                    "Oops! Something went wonky 😵 Give it another try?",
                  );
                })
                .finally(() => {
                  setIsLoading(false);
                });
            }, 100);
          }}
          disabled={isLoading}
        />
      )}

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col min-h-0 shadow-lg border-purple-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-gray-900">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
              <Bot className="h-5 w-5 text-white" />
            </div>
            Chat with Your Document
            <span className="text-lg">💬</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col min-h-0 p-0">
          <ScrollArea className="flex-1 px-6" ref={scrollAreaRef}>
            <div className="space-y-4 pb-4">
              {messages.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Bot className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-xl font-medium mb-2">Hey there! 👋</p>
                  <p className="text-base font-calm mb-1">
                    Upload a PDF above and let's have a chat about it!
                  </p>
                  <p className="text-sm text-gray-400 font-calm">
                    I'm here to make sense of all that boring text 😴➡️😎
                  </p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-4 items-start",
                      message.type === "user" && "flex-row-reverse",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-md",
                        message.type === "user" &&
                          "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
                        message.type === "bot" &&
                          "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
                        message.type === "system" &&
                          "bg-gradient-to-r from-amber-400 to-orange-400 text-white",
                      )}
                    >
                      {message.type === "user" && <User className="h-5 w-5" />}
                      {message.type === "bot" && <Bot className="h-5 w-5" />}
                      {message.type === "system" && (
                        <AlertCircle className="h-5 w-5" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 max-w-[80%] shadow-sm",
                        message.type === "user" &&
                          "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
                        message.type === "bot" &&
                          "bg-white text-gray-900 border border-gray-200",
                        message.type === "system" &&
                          "bg-amber-50 text-amber-900 border border-amber-200",
                      )}
                    >
                      <p className="text-sm font-calm whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                      <p className="text-xs opacity-70 mt-2 font-calm">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="flex gap-4 items-start">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="rounded-2xl px-4 py-3 bg-white border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="animate-spin h-4 w-4 border-2 border-purple-300 border-t-purple-600 rounded-full"></div>
                      <span className="text-sm text-gray-600 font-calm">
                        Reading your document... 🤔
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          <Separator />
          <div className="p-6">
            <div className="flex gap-3">
              <Input
                placeholder={
                  isDocumentLoaded
                    ? "Ask me anything about your document... 💭"
                    : "Upload a document first to start chatting! 📄"
                }
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={!isDocumentLoaded || isLoading}
                className="flex-1 bg-white/70 border-purple-200 focus:border-purple-400 font-calm"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || !isDocumentLoaded || isLoading}
                size="icon"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
