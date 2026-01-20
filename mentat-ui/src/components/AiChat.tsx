import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { FileText, Send, Loader2, AlertCircle } from 'lucide-react';

export function AiChat() {
  const [question, setQuestion] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous results
    setAnswer('');
    setError('');

    // Validate question
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    setIsLoading(true);

    try {
      // Build FormData
      const formData = new FormData();
      formData.append('question', question);
      if (file) {
        formData.append('file', file);
      }

      // Send request to FastAPI backend
      const response = await fetch('http://localhost:8000/ask', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error responses
        setError(data.detail || 'An error occurred');
      } else {
        // Handle success response
        setAnswer(data.answer);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to connect to the server. Make sure the backend is running at http://localhost:8000'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate PDF file type
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        setError('');
      } else {
        setFile(null);
        setError('Only PDF files are supported');
        e.target.value = '';
      }
    }
  };

  const clearFile = () => {
    setFile(null);
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="w-full max-w-6xl p-8 space-y-8 relative z-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-white text-6xl font-bold tracking-tight">Mentat AI Helper</h1>
        <p className="text-lg text-blue-100/80">
          Ask questions or upload a PDF 
        </p>
      </div>

      {/* Input Form */}
      <Card className="p-8 space-y-8 bg-[#2f2f2f] backdrop-blur-sm shadow-2xl border-gray-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 space-y-2">
                <Label htmlFor="question" className="text-lg text-gray-200">Ask a question</Label>
                <Textarea
                  id="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="What would you like to know?"
                  className="min-h-[56px] resize-none text-lg bg-[#3e3e3e] border-gray-600 text-white placeholder:text-gray-400"
                  disabled={isLoading}
                />
              </div>
              <div className="flex flex-col gap-2 pt-7">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-14 w-14 bg-[#3e3e3e] border-gray-600 text-gray-200 hover:bg-gray-600 hover:text-white"
                  onClick={() => document.getElementById('file-input')?.click()}
                  disabled={isLoading}
                >
                  <FileText className="size-6" />
                </Button>
                {file && (
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    className="h-10 w-10 border-gray-600 text-red-400 hover:bg-gray-700 hover:text-red-300"
                    onClick={clearFile}
                    disabled={isLoading}
                  >
                    ×
                  </Button>
                )}
              </div>
              <Input
                id="file-input"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                disabled={isLoading}
                className="hidden"
              />
            </div>
            {file && (
              <div className="flex items-center gap-3 text-sm text-gray-300 ml-1">
                <FileText className="size-4" />
                <span>{file.name}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-lg bg-gradient-to-br from-[#050d1a] via-[#0f2847] to-[#2a3a4a] hover:opacity-90 text-white"
            disabled={isLoading || !question.trim()}
          >
            {isLoading ? (
              <>
                <Loader2 className="size-5 mr-2 animate-spin" />
                Thinking…
              </>
            ) : (
              <>
                <Send className="size-5 mr-2" />
                Ask
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Response Area */}
      {(answer || error) && (
        <Card className="p-8 bg-[#2f2f2f] backdrop-blur-sm shadow-2xl border-gray-700">
          {error && (
            <div className="flex items-start gap-4 text-red-400">
              <AlertCircle className="size-6 mt-1 shrink-0" />
              <div>
                <p className="text-lg font-semibold">Error</p>
                <p className="text-base mt-2">{error}</p>
              </div>
            </div>
          )}

          {answer && (
            <div className="space-y-3">
              <p className="text-lg font-semibold text-gray-200">Answer:</p>
              <div className="text-base text-gray-300 whitespace-pre-wrap leading-relaxed ">{answer}</div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}