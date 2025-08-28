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
      // Convert the document URL to a direct download URL if needed
      const convertedRequest = {
        ...request,
        documents: this.convertToDirectUrl(request.documents)
      };

      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${this.AUTH_TOKEN}`,
        },
        body: JSON.stringify(convertedRequest),
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

  static convertToDirectUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      
      // Convert Google Drive sharing link to direct download
      if (urlObj.hostname === 'drive.google.com' && url.includes('/file/d/')) {
        const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (fileIdMatch) {
          const fileId = fileIdMatch[1];
          return `https://drive.google.com/uc?export=download&id=${fileId}`;
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
