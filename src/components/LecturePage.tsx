import { Upload, FileText, Download, Eye, Languages, VolumeX, Volume2, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface ExtractedText {
  content: string;
  pageCount: number;
  wordCount: number;
  language: string;
}

export default function LecturePage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [extractedText, setExtractedText] = useState<ExtractedText | null>(null);
  const [transcriptionText, setTranscriptionText] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setUploadedFile(file);
      setUploadProgress(0);
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } else {
      alert("Please upload a PDF file only.");
    }
  };

  const simulateTextExtraction = () => {
    setIsExtracting(true);
    
    // Simulate PDF text extraction
    setTimeout(() => {
      const mockExtractedText: ExtractedText = {
        content: `Introduction to Computer Science - Lecture 1

Welcome to FIT1008 Introduction to Computer Science. This course will cover fundamental programming concepts, data structures, and algorithms.

Key Topics:
1. Programming Fundamentals
   - Variables and data types
   - Control structures (loops, conditionals)
   - Functions and methods

2. Data Structures
   - Arrays and lists
   - Stacks and queues
   - Trees and graphs

3. Algorithms
   - Sorting algorithms
   - Search algorithms
   - Time and space complexity

Programming Languages:
We will primarily use Python for this course due to its simplicity and readability. Python is an excellent language for beginners because:
- Clear syntax
- Extensive libraries
- Strong community support

Assignment Guidelines:
All assignments must be submitted through the course management system. Late submissions will result in grade penalties unless prior arrangements are made.

Remember to follow good programming practices:
- Write clean, readable code
- Use meaningful variable names
- Comment your code appropriately
- Test your programs thoroughly

Next week, we will dive deeper into Python basics and start our first programming exercises.`,
        pageCount: 5,
        wordCount: 184,
        language: "English"
      };
      
      setExtractedText(mockExtractedText);
      setIsExtracting(false);
    }, 3000);
  };

  const simulateTranscription = () => {
    setIsTranscribing(true);
    
    // Simulate transcription process
    setTimeout(() => {
      setTranscriptionText(`[Transcription Generated]

Hello everyone, and welcome to today's lecture on Introduction to Computer Science. 

Today we'll be covering the fundamental concepts that form the foundation of computer science. These include programming basics, data structures, and algorithmic thinking.

Let's start with programming fundamentals. When we talk about programming, we're essentially giving instructions to a computer in a language it can understand. Python, which we'll be using in this course, is particularly beginner-friendly because of its clean syntax and readability.

Variables are containers for storing data values. In Python, you don't need to declare variable types explicitly - the language handles this for you. For example, if I write 'name equals John', Python automatically recognizes this as a string.

Control structures allow us to control the flow of our program. We have conditional statements like 'if', 'else', and 'elif' that let us make decisions in our code. We also have loops like 'for' and 'while' that let us repeat actions.

Functions are reusable blocks of code that perform specific tasks. They help us organize our code and avoid repetition. Think of a function as a small machine that takes some input, processes it, and gives you an output.

Next week, we'll start with hands-on coding exercises where you'll put these concepts into practice. Make sure to review today's material and come prepared with questions.

That's all for today. See you next week!`);
      setIsTranscribing(false);
    }, 4000);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf") {
        setUploadedFile(file);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#3F3734] mb-4">Lecture Management</h1>
        <p className="text-lg text-gray-600">
          Upload PDF files, extract text content, and generate transcriptions for your lectures
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload PDF File
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-[#9BC2E4] rounded-lg p-8 text-center hover:border-[#8BB1D9] transition-colors cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  aria-label="Upload PDF file"
                />
                
                {uploadedFile ? (
                  <div className="space-y-4">
                    <FileText className="h-12 w-12 mx-auto text-[#9BC2E4]" />
                    <div>
                      <p className="font-semibold text-[#3F3734]">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-600">
                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                    
                    {uploadProgress < 100 && (
                      <div className="w-full">
                        <Progress value={uploadProgress} className="w-full" />
                        <p className="text-sm text-gray-600 mt-2">Uploading... {uploadProgress}%</p>
                      </div>
                    )}
                    
                    {uploadProgress === 100 && (
                      <Badge className="bg-green-100 text-green-800">
                        Upload Complete
                      </Badge>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 mx-auto text-[#9BC2E4]" />
                    <div>
                      <p className="font-semibold text-[#3F3734] mb-2">
                        Drop your PDF file here or click to browse
                      </p>
                      <p className="text-sm text-gray-600">
                        Supports PDF files up to 50MB
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={simulateTextExtraction}
                  disabled={!uploadedFile || isExtracting || uploadProgress < 100}
                  className="flex-1 bg-[#9BC2E4] hover:bg-[#8BB1D9]"
                >
                  {isExtracting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Extracting...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Extract Text
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={simulateTranscription}
                  disabled={!uploadedFile || isTranscribing || uploadProgress < 100}
                  variant="outline"
                  className="flex-1"
                >
                  {isTranscribing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Transcribing...
                    </>
                  ) : (
                    <>
                      <Volume2 className="h-4 w-4 mr-2" />
                      Generate Transcription
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Processing Status */}
          {(isExtracting || isTranscribing) && (
            <Alert>
              <Loader2 className="h-4 w-4 animate-spin" />
              <AlertDescription>
                {isExtracting && "Extracting text from PDF... This may take a few minutes."}
                {isTranscribing && "Generating transcription... This may take a few minutes."}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Extracted Text Results */}
          {extractedText && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Extracted Text Content
                </CardTitle>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>Pages: {extractedText.pageCount}</span>
                  <span>Words: {extractedText.wordCount}</span>
                  <span>Language: {extractedText.language}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {extractedText.content}
                  </pre>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Text
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Transcription Results */}
          {transcriptionText && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Generated Transcription
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={transcriptionText}
                  onChange={(e) => setTranscriptionText(e.target.value)}
                  className="min-h-80 font-mono text-sm"
                  placeholder="Transcription will appear here..."
                />
                
                <div className="flex gap-3 mt-4">
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Save Transcription
                  </Button>
                  <Button size="sm" variant="outline">
                    <Languages className="h-4 w-4 mr-2" />
                    Translate
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-3" />
                View Recent Uploads
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-3" />
                Download All Content
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Languages className="h-4 w-4 mr-3" />
                Bulk Translation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
