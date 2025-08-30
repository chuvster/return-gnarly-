import { FileText, Languages, Volume2, Eye, Download, RefreshCw, Lightbulb, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AccessibilityRecommendation {
  id: string;
  category: "text" | "visual" | "audio" | "navigation";
  title: string;
  description: string;
  improvement: string;
  priority: "high" | "medium" | "low";
}

const mockRecommendations: AccessibilityRecommendation[] = [
  {
    id: "1",
    category: "text",
    title: "Text Complexity Reduction",
    description: "Some sentences are quite long and complex, making them difficult to read.",
    improvement: "Break down complex sentences into shorter, clearer statements. Use simpler vocabulary where possible.",
    priority: "high"
  },
  {
    id: "2",
    category: "visual",
    title: "Add Visual Structure",
    description: "The text lacks clear visual hierarchy and structure.",
    improvement: "Add more headings, bullet points, and white space to improve readability and navigation.",
    priority: "medium"
  },
  {
    id: "3",
    category: "text",
    title: "Technical Term Definitions",
    description: "Technical terms are used without explanation.",
    improvement: "Provide definitions or explanations for technical terms when first introduced.",
    priority: "medium"
  },
  {
    id: "4",
    category: "audio",
    title: "Audio Description Support",
    description: "Consider adding audio descriptions for visual elements.",
    improvement: "Include descriptions of diagrams, charts, or visual content for screen reader users.",
    priority: "low"
  }
];

export default function StudentPage() {
  const [selectedText, setSelectedText] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [targetLanguage, setTargetLanguage] = useState<string>("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState("1");
  const [voiceLanguage, setVoiceLanguage] = useState("en-US");

  // Sample lecture content
  const sampleContent = `Introduction to Computer Science - Lecture 1

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
We will primarily use Python for this course due to its simplicity and readability. Python is an excellent language for beginners because it has clear syntax, extensive libraries, and strong community support.

Assignment Guidelines:
All assignments must be submitted through the course management system. Late submissions will result in grade penalties unless prior arrangements are made.

Remember to follow good programming practices: write clean, readable code, use meaningful variable names, comment your code appropriately, and test your programs thoroughly.`;

  const languages = [
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" },
    { code: "ar", name: "Arabic" }
  ];

  const voiceLanguages = [
    { code: "en-US", name: "English (US)" },
    { code: "en-GB", name: "English (UK)" },
    { code: "es-ES", name: "Spanish" },
    { code: "fr-FR", name: "French" },
    { code: "de-DE", name: "German" },
    { code: "it-IT", name: "Italian" },
    { code: "pt-BR", name: "Portuguese" },
    { code: "ja-JP", name: "Japanese" },
    { code: "ko-KR", name: "Korean" },
    { code: "zh-CN", name: "Chinese" }
  ];

  const handleTranslate = () => {
    if (!selectedText || !targetLanguage) return;
    
    setIsTranslating(true);
    
    // Simulate translation
    setTimeout(() => {
      const mockTranslations: Record<string, string> = {
        "es": `Introducción a las Ciencias de la Computación - Conferencia 1

Bienvenidos a FIT1008 Introducción a las Ciencias de la Computación. Este curso cubrirá conceptos fundamentales de programación, estructuras de datos y algoritmos.

Temas Clave:
1. Fundamentos de Programación
   - Variables y tipos de datos
   - Estructuras de control (bucles, condicionales)
   - Funciones y métodos

2. Estructuras de Datos
   - Arrays y listas
   - Pilas y colas
   - Árboles y grafos

3. Algoritmos
   - Algoritmos de ordenamiento
   - Algoritmos de búsqueda
   - Complejidad de tiempo y espacio`,
        
        "fr": `Introduction à l'Informatique - Cours 1

Bienvenue au FIT1008 Introduction à l'Informatique. Ce cours couvrira les concepts fondamentaux de programmation, les structures de données et les algorithmes.

Sujets Clés:
1. Fondamentaux de Programmation
   - Variables et types de données
   - Structures de contrôle (boucles, conditionnelles)
   - Fonctions et méthodes

2. Structures de Données
   - Tableaux et listes
   - Piles et files
   - Arbres et graphes

3. Algorithmes
   - Algorithmes de tri
   - Algorithmes de recherche
   - Complexité temporelle et spatiale`,

        "de": `Einführung in die Informatik - Vorlesung 1

Willkommen zu FIT1008 Einführung in die Informatik. Dieser Kurs wird grundlegende Programmierkonzepte, Datenstrukturen und Algorithmen behandeln.

Hauptthemen:
1. Programmiergrundlagen
   - Variablen und Datentypen
   - Kontrollstrukturen (Schleifen, Bedingungen)
   - Funktionen und Methoden

2. Datenstrukturen
   - Arrays und Listen
   - Stapel und Warteschlangen
   - Bäume und Graphen

3. Algorithmen
   - Sortieralgorithmen
   - Suchalgorithmen
   - Zeit- und Raumkomplexität`
      };
      
      setTranslatedText(mockTranslations[targetLanguage] || "Translation not available for this language.");
      setIsTranslating(false);
    }, 2000);
  };

  const handleTextToSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = parseFloat(voiceSpeed);
      utterance.lang = voiceLanguage;
      speechSynthesis.speak(utterance);
    }
  };

  const analyzeAccessibility = () => {
    setIsAnalyzing(true);
    
    // Simulate accessibility analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 3000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "text": return <FileText className="h-4 w-4" />;
      case "visual": return <Eye className="h-4 w-4" />;
      case "audio": return <Volume2 className="h-4 w-4" />;
      case "navigation": return <RefreshCw className="h-4 w-4" />;
      default: return <Lightbulb className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#3F3734] mb-4">Student Learning Tools</h1>
        <p className="text-lg text-gray-600">
          Read content, translate to different languages, and get accessibility recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Content Reader Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Course Content Reader
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={selectedText || sampleContent}
                onChange={(e) => setSelectedText(e.target.value)}
                className="min-h-96 font-serif text-base leading-relaxed"
                placeholder="Paste your lecture content here to read, translate, or analyze..."
              />
              
              <div className="flex flex-wrap gap-3 mt-4">
                <Button
                  onClick={() => handleTextToSpeech(selectedText || sampleContent)}
                  variant="outline"
                  size="sm"
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Read Aloud
                </Button>
                
                <Button
                  onClick={analyzeAccessibility}
                  variant="outline"
                  size="sm"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Analyze Accessibility
                    </>
                  )}
                </Button>
                
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Translation Results */}
          {translatedText && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  Translated Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 max-h-80 overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm font-serif leading-relaxed">
                    {translatedText}
                  </pre>
                </div>
                
                <div className="flex gap-3 mt-4">
                  <Button
                    onClick={() => handleTextToSpeech(translatedText)}
                    variant="outline"
                    size="sm"
                  >
                    <Volume2 className="h-4 w-4 mr-2" />
                    Listen in Target Language
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Save Translation
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Tools & Settings Panel */}
        <div className="space-y-6">
          {/* Translation Tools */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="h-5 w-5" />
                Translation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Target Language</label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                onClick={handleTranslate}
                disabled={!targetLanguage || isTranslating}
                className="w-full bg-[#9BC2E4] hover:bg-[#8BB1D9]"
              >
                {isTranslating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Translating...
                  </>
                ) : (
                  <>
                    <Languages className="h-4 w-4 mr-2" />
                    Translate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Audio Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Audio Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Voice Language</label>
                <Select value={voiceLanguage} onValueChange={setVoiceLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {voiceLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Speech Speed</label>
                <Select value={voiceSpeed} onValueChange={setVoiceSpeed}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5x (Slow)</SelectItem>
                    <SelectItem value="0.75">0.75x</SelectItem>
                    <SelectItem value="1">1x (Normal)</SelectItem>
                    <SelectItem value="1.25">1.25x</SelectItem>
                    <SelectItem value="1.5">1.5x (Fast)</SelectItem>
                    <SelectItem value="2">2x (Very Fast)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button
                onClick={() => handleTextToSpeech("This is a test of the text to speech functionality.")}
                variant="outline"
                className="w-full"
              >
                Test Voice Settings
              </Button>
            </CardContent>
          </Card>

          {/* Accessibility Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Accessibility Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing ? (
                <div className="text-center py-8">
                  <RefreshCw className="h-8 w-8 mx-auto mb-4 text-[#9BC2E4] animate-spin" />
                  <p className="text-sm text-gray-600">Analyzing content for accessibility improvements...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {mockRecommendations.slice(0, 3).map((rec) => (
                    <div key={rec.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        {getCategoryIcon(rec.category)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-semibold">{rec.title}</h4>
                            <Badge className={getPriorityColor(rec.priority)}>
                              {rec.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">{rec.description}</p>
                          <p className="text-xs text-[#3F3734] font-medium">{rec.improvement}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" size="sm" className="w-full">
                    View All Recommendations
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
