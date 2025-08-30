
import { useState, useEffect } from "react";
import { X, Type, Eye, Volume2, Contrast, MousePointer, Keyboard, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessibilityPanel({ isOpen, onClose }: AccessibilityPanelProps) {
  const [fontSize, setFontSize] = useState([16]);
  const [contrast, setContrast] = useState([100]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [focusIndicator, setFocusIndicator] = useState(true);
  const [voiceSpeed, setVoiceSpeed] = useState([1]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      
      // Apply font size
      root.style.setProperty("--base-font-size", `${fontSize[0]}px`);
      
      // Apply contrast
      root.style.setProperty("--contrast", `${contrast[0]}%`);
      
      // Apply dark mode
      if (darkMode) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
      
      // Apply high contrast
      if (highContrast) {
        root.classList.add("high-contrast");
      } else {
        root.classList.remove("high-contrast");
      }
      
      // Apply reduced motion
      if (reducedMotion) {
        root.classList.add("reduce-motion");
      } else {
        root.classList.remove("reduce-motion");
      }
      
      // Apply keyboard navigation enhancement
      if (keyboardNav) {
        root.classList.add("keyboard-nav");
      } else {
        root.classList.remove("keyboard-nav");
      }
    }
  }, [fontSize, contrast, darkMode, highContrast, reducedMotion, keyboardNav]);

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = voiceSpeed[0];
      speechSynthesis.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
        role="dialog"
        aria-labelledby="accessibility-title"
        aria-modal="true"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 id="accessibility-title" className="text-2xl font-bold text-[#3F3734] flex items-center gap-2">
              <Eye className="h-6 w-6" />
              Accessibility Settings
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Close accessibility panel"
              className="hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Visual Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Type className="h-5 w-5" />
                  Visual Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Font Size */}
                <div>
                  <label htmlFor="font-size" className="block text-sm font-medium mb-2">
                    Font Size: {fontSize[0]}px
                  </label>
                  <Slider
                    id="font-size"
                    min={12}
                    max={24}
                    step={1}
                    value={fontSize}
                    onValueChange={setFontSize}
                    className="w-full"
                    aria-label="Adjust font size"
                  />
                </div>

                {/* Contrast */}
                <div>
                  <label htmlFor="contrast" className="block text-sm font-medium mb-2">
                    Contrast: {contrast[0]}%
                  </label>
                  <Slider
                    id="contrast"
                    min={50}
                    max={200}
                    step={10}
                    value={contrast}
                    onValueChange={setContrast}
                    className="w-full"
                    aria-label="Adjust contrast level"
                  />
                </div>

                {/* Theme Toggles */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label htmlFor="dark-mode" className="text-sm font-medium flex items-center gap-2">
                      {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      Dark Mode
                    </label>
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                      aria-label="Toggle dark mode"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="high-contrast" className="text-sm font-medium flex items-center gap-2">
                      <Contrast className="h-4 w-4" />
                      High Contrast
                    </label>
                    <Switch
                      id="high-contrast"
                      checked={highContrast}
                      onCheckedChange={setHighContrast}
                      aria-label="Toggle high contrast mode"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label htmlFor="reduced-motion" className="text-sm font-medium">
                      Reduce Motion
                    </label>
                    <Switch
                      id="reduced-motion"
                      checked={reducedMotion}
                      onCheckedChange={setReducedMotion}
                      aria-label="Toggle reduced motion"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Keyboard className="h-5 w-5" />
                  Navigation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="keyboard-nav" className="text-sm font-medium">
                    Enhanced Keyboard Navigation
                  </label>
                  <Switch
                    id="keyboard-nav"
                    checked={keyboardNav}
                    onCheckedChange={setKeyboardNav}
                    aria-label="Toggle enhanced keyboard navigation"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label htmlFor="focus-indicator" className="text-sm font-medium flex items-center gap-2">
                    <MousePointer className="h-4 w-4" />
                    Enhanced Focus Indicators
                  </label>
                  <Switch
                    id="focus-indicator"
                    checked={focusIndicator}
                    onCheckedChange={setFocusIndicator}
                    aria-label="Toggle enhanced focus indicators"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Audio Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Volume2 className="h-5 w-5" />
                  Audio & Screen Reader
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="screen-reader" className="text-sm font-medium">
                    Screen Reader Support
                  </label>
                  <Switch
                    id="screen-reader"
                    checked={screenReader}
                    onCheckedChange={setScreenReader}
                    aria-label="Toggle screen reader support"
                  />
                </div>

                <div>
                  <label htmlFor="voice-speed" className="block text-sm font-medium mb-2">
                    Voice Speed: {voiceSpeed[0]}x
                  </label>
                  <Slider
                    id="voice-speed"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={voiceSpeed}
                    onValueChange={setVoiceSpeed}
                    className="w-full"
                    aria-label="Adjust voice speed"
                  />
                </div>

                <Button
                  onClick={() => speakText("This is a test of the text-to-speech functionality")}
                  variant="outline"
                  className="w-full"
                >
                  Test Voice
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Reset</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => {
                    setFontSize([16]);
                    setContrast([100]);
                    setReducedMotion(false);
                    setHighContrast(false);
                    setDarkMode(false);
                    setScreenReader(false);
                    setKeyboardNav(false);
                    setVoiceSpeed([1]);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Reset All Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
