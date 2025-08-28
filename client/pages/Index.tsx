import { ChatInterface } from "@/components/ChatInterface";
import { HowToUse } from "@/components/HowToUse";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-purple-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2.5 rounded-xl shadow-lg">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gradient">InsureMate</h1>
                <p className="text-sm text-gray-600 font-calm">
                  Your AI document buddy 🤖
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-600 font-calm">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                AI-Powered & Ready
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-purple-700 mb-6 border border-purple-200/50">
              ✨ Smart Document Analysis
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Turn Any PDF into a{" "}
              <span className="text-gradient">Smart Conversation</span>
            </h2>
            <p className="text-xl text-gray-600 mb-4 font-calm max-w-2xl mx-auto leading-relaxed">
              Just drop your PDF link and start chatting! Perfect for insurance
              docs, contracts, or any document that makes your brain hurt 🧠
            </p>
            <p className="text-base text-gray-500 font-calm">
              No downloads, no sign-ups, just pure AI magic ✨
            </p>
          </div>

          {/* Chat Interface */}
          <div className="h-[calc(100vh-200px)] mb-8">
            <ChatInterface />
          </div>
        </div>

        {/* How to Use Section */}
        <HowToUse />

        {/* Footer */}
        <footer className="bg-white/50 backdrop-blur-sm border-t border-purple-200/50 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-600 font-calm">
              Made with 💜 for people who hate reading long documents
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
