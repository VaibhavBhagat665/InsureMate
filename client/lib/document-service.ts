export interface DocumentAnalysisRequest {
  documents: string;
  questions: string[];
}

export interface DocumentAnalysisResponse {
  answers: string[];
}

export class DocumentService {
  private static readonly API_URL =
    "https://intelligent-doc-system-390083348949.us-central1.run.app/api/v1/hackrx/run";
  private static readonly AUTH_TOKEN =
    "3689cf11b1e8589b1737ce1dc0cb301728be4261489173d3b07fa8feff7c71ea";

  static async analyzeDocument(
    request: DocumentAnalysisRequest,
  ): Promise<DocumentAnalysisResponse> {
    try {
      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${this.AUTH_TOKEN}`,
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error analyzing document:", error);
      throw new Error("Failed to analyze document. Please try again.");
    }
  }

  static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return url.toLowerCase().endsWith(".pdf");
    } catch {
      return false;
    }
  }
}
