import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DocumentService } from "@/lib/document-service";
import { Badge } from "@/components/ui/badge";

export function DebugPanel() {
  const [testUrl, setTestUrl] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const testConversion = () => {
    if (!testUrl) return;
    
    const valid = DocumentService.isValidUrl(testUrl);
    const converted = DocumentService.convertToDirectUrl(testUrl);
    
    setIsValid(valid);
    setConvertedUrl(converted);
  };

  return (
    <Card className="border-yellow-200 bg-yellow-50/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-yellow-800 text-base">🔧 Debug Panel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Test Google Drive URL conversion..."
            value={testUrl}
            onChange={(e) => setTestUrl(e.target.value)}
            className="text-sm"
          />
          <Button onClick={testConversion} size="sm" variant="outline">
            Test
          </Button>
        </div>
        
        {isValid !== null && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant={isValid ? "default" : "destructive"}>
                {isValid ? "✅ Valid URL" : "❌ Invalid URL"}
              </Badge>
            </div>
            
            {convertedUrl && (
              <div className="p-2 bg-white rounded border text-xs">
                <p className="font-medium text-gray-600 mb-1">Converted URL:</p>
                <p className="break-all text-blue-600">{convertedUrl}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
