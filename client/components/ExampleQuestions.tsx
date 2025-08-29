import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Sparkles } from "lucide-react";

interface ExampleQuestionsProps {
  onQuestionClick: (question: string) => void;
  disabled?: boolean;
}

const exampleQuestions = [
  "What's the grace period for premium payment? ⏰",
  "How long do I wait for pre-existing diseases coverage? 🏥",
  "Does this cover maternity stuff? 🤱",
  "What's this No Claim Discount about? 💰",
  "Any limits on room rent and ICU charges? 🏨",
  "What AYUSH treatments are covered? 🌿",
  "How do they define a 'Hospital'? 🏥",
  "Any free health check-ups included? 🩺",
];

export function ExampleQuestions({
  onQuestionClick,
  disabled = false,
}: ExampleQuestionsProps) {
  return (
    <Card className="border-purple-100 bg-gradient-to-r from-purple-25/50 to-pink-25/50 backdrop-blur-sm shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-purple-900 text-lg">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-lg">
            <HelpCircle className="h-4 w-4 text-white" />
          </div>
          Quick Questions to Try
          <span className="text-lg">💡</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {exampleQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-left justify-start h-auto py-3 px-4 text-sm hover:bg-purple-50 border-purple-200 text-purple-700 hover:text-purple-800 hover:border-purple-300 transition-all duration-200 hover:scale-105 font-calm"
              onClick={() =>
                onQuestionClick(
                  question.replace(/[⏰🏥🤱��🏨🌿🩺]/g, "").trim(),
                )
              }
              disabled={disabled}
            >
              <Sparkles className="h-3 w-3 mr-2 text-purple-400" />
              {question}
            </Button>
          ))}
        </div>
        <div className="mt-4 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-purple-200/50">
          <p className="text-sm text-purple-600 font-calm text-center">
            ✨ Click any question above to try it out, or type your own below!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
