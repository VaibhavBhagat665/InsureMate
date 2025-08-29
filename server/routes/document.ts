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

    const EXTERNAL_API_URL = "https://intelligent-doc-system-390083348949.us-central1.run.app/api/v1/hackrx/run";
    const AUTH_TOKEN = process.env.HACKRX_AUTH_TOKEN;

    if (!AUTH_TOKEN) {
      console.error("HACKRX_AUTH_TOKEN environment variable is not set");
      return res.status(500).json({
        error: "Authentication token not configured"
      });
    }

    console.log("Calling external document analysis API...");
    console.log("Documents URL:", documents);
    console.log("Questions count:", questions.length);

    const externalResponse = await fetch(EXTERNAL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${AUTH_TOKEN}`
      },
      body: JSON.stringify({
        documents,
        questions
      })
    });

    if (!externalResponse.ok) {
      const errorText = await externalResponse.text();
      console.error("External API error:", externalResponse.status, errorText);
      return res.status(500).json({
        error: `External API error: ${externalResponse.status}`
      });
    }

    const externalData = await externalResponse.json();
    console.log("External API response received successfully");

    // Ensure the response matches our expected format
    const response: DocumentAnalysisResponse = {
      answers: externalData.answers || []
    };

    res.json(response);
  } catch (error) {
    console.error("Document analysis error:", error);
    res.status(500).json({
      error: "Internal server error during document analysis"
    });
  }
};
