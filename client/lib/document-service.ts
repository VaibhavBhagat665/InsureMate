export interface DocumentAnalysisRequest {
  documents: string;
  questions: string[];
}

export interface DocumentAnalysisResponse {
  answers: string[];
}

export class DocumentService {
  private static readonly API_URL = "/api/analyze-document";

  static async analyzeDocument(
    request: DocumentAnalysisRequest,
  ): Promise<DocumentAnalysisResponse> {
    try {
      // Convert the document URL to a direct download URL if needed
      const originalUrl = request.documents;
      const convertedUrl = this.convertToDirectUrl(request.documents);

      console.log("Original URL:", originalUrl);
      console.log("Converted URL:", convertedUrl);

      const convertedRequest = {
        ...request,
        documents: convertedUrl
      };

      console.log("Sending request to document analysis service:", convertedRequest);

      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(convertedRequest),
      });

      console.log("Document analysis response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Document analysis error response:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Document analysis response data:", data);
      return data;
    } catch (error) {
      console.error("Error analyzing document:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to analyze document: ${error.message}`);
      }
      throw new Error("Failed to analyze document. Please try again.");
    }
  }

  static convertToDirectUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      
      // Convert Google Drive sharing link to direct download (updated format as of May 2024)
      if (urlObj.hostname === 'drive.google.com' && url.includes('/file/d/')) {
        const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (fileIdMatch) {
          const fileId = fileIdMatch[1];
          return `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
        }
      }
      
      // Convert Dropbox sharing link to direct download
      if (urlObj.hostname === 'www.dropbox.com' && url.includes('dropbox.com')) {
        return url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').replace('?dl=0', '');
      }
      
      // For direct PDF URLs, return as-is
      return url;
    } catch {
      return url;
    }
  }

  static isValidUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      
      // Accept direct PDF URLs
      if (url.toLowerCase().endsWith('.pdf')) {
        return true;
      }
      
      // Accept Google Drive links
      if (urlObj.hostname === 'drive.google.com' && url.includes('/file/d/')) {
        return true;
      }
      
      // Accept Dropbox links
      if (urlObj.hostname === 'www.dropbox.com' && url.includes('dropbox.com')) {
        return true;
      }
      
      // Accept OneDrive links
      if (urlObj.hostname.includes('1drv.ms') || urlObj.hostname.includes('onedrive.live.com')) {
        return true;
      }
      
      return false;
    } catch {
      return false;
    }
  }
}
