import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  MessageCircle,
  Sparkles,
  FileText,
  ArrowRight,
  Zap,
} from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your PDF",
    description:
      "Paste any PDF URL - insurance policies, contracts, research papers, you name it! 📄",
    color: "from-purple-400 to-pink-400",
    bgColor: "bg-purple-50",
    emoji: "🚀",
  },
  {
    icon: Sparkles,
    title: "AI Does the Magic",
    description:
      "Our smart AI reads and understands your document in seconds ✨",
    color: "from-blue-400 to-purple-400",
    bgColor: "bg-blue-50",
    emoji: "🤖",
  },
  {
    icon: MessageCircle,
    title: "Ask Anything",
    description:
      "Chat naturally! Ask questions like you're talking to a friend 💬",
    color: "from-green-400 to-blue-400",
    bgColor: "bg-green-50",
    emoji: "💭",
  },
];

const features = [
  { icon: Zap, text: "Lightning fast responses", color: "text-yellow-500" },
  { icon: FileText, text: "Supports all PDF types", color: "text-blue-500" },
  {
    icon: Sparkles,
    text: "Smart context understanding",
    color: "text-purple-500",
  },
];

export function HowToUse() {
  return (
    <div className="py-12 bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge
            variant="secondary"
            className="mb-4 bg-purple-100 text-purple-700 border-purple-200"
          >
            ✨ How It Works
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Dead Simple. <span className="text-gradient">Super Smart.</span>
          </h2>
          <p className="text-lg text-gray-600 font-calm">
            No tech skills needed. Just upload, ask, and get answers! 🎯
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-8 z-10">
                    <ArrowRight className="h-6 w-6 text-gray-300 mx-auto" />
                  </div>
                )}
                <Card
                  className={`${step.bgColor} border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${step.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl mb-2">{step.emoji}</div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-gray-600 font-calm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Features */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold mb-2">
              Why People Love InsureMate
            </h3>
            <p className="text-gray-600 font-calm">
              Built for real humans, not robots 🤝
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 justify-center md:justify-start"
                >
                  <IconComponent className={`h-5 w-5 ${feature.color}`} />
                  <span className="font-calm text-gray-700">
                    {feature.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Try it now - it's free and takes 30 seconds!
          </div>
        </div>
      </div>
    </div>
  );
}
