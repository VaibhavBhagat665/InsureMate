import { RequestHandler } from "express";

export interface DocumentAnalysisRequest {
  documents: string;
  questions: string[];
}

export interface DocumentAnalysisResponse {
  answers: string[];
}

export const handleDocumentAnalysis: RequestHandler = async (req, res) => {
  try {
    const { documents, questions }: DocumentAnalysisRequest = req.body;

    if (!documents || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ 
        error: "Invalid request. 'documents' (string) and 'questions' (array) are required." 
      });
    }

    // Mock responses for development
    const mockAnswers = questions.map((question, index) => {
      if (question.toLowerCase().includes("about")) {
        return "This appears to be a PDF document that has been uploaded for analysis. The document analysis service is currently running in mock mode for development purposes.";
      }
      if (question.toLowerCase().includes("summary")) {
        return "Document Summary: This is a comprehensive document that contains valuable information. The content has been processed and is ready for detailed analysis.";
      }
      if (question.toLowerCase().includes("key") || question.toLowerCase().includes("main")) {
        return "Key points from the document: 1) Primary topic discussion, 2) Supporting evidence and examples, 3) Conclusions and recommendations, 4) Additional references and resources.";
      }
      return `Based on the document analysis, here's the answer to "${question}": The document contains relevant information that addresses your query. This is a mock response generated for development purposes.`;
    });

    const response: DocumentAnalysisResponse = {
      answers: mockAnswers
    };

    // Add a small delay to simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    res.json(response);
  } catch (error) {
    console.error("Document analysis error:", error);
    res.status(500).json({ 
      error: "Internal server error during document analysis" 
    });
  }
};
