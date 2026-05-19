"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  Sparkles,
  X,
  ChevronRight,
  Loader2,
  Image as ImageIcon,
  Settings2,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  LIGHTING_PRESETS,
  AESTHETIC_PRESETS,
  BACKGROUND_PRESETS,
  CAMERA_PRESETS,
  COLOR_SCHEME_PRESETS,
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  type PresetOption,
} from "@/constants";

type GenerationStep = "upload" | "presets" | "generate" | "result";

export default function CreateGenerationPage() {
  const [step, setStep] = useState<GenerationStep>("upload");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [selectedPresets, setSelectedPresets] = useState({
    lighting: "",
    aesthetic: "",
    background: "",
    camera: "",
    colorScheme: "",
  });
  const [variants, setVariants] = useState([1]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      setStep("presets");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": ACCEPTED_IMAGE_TYPES.map((t) => `.${t.split("/")[1]}`) },
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  });

  const handlePresetSelect = (category: string, presetId: string) => {
    setSelectedPresets((prev) => ({ ...prev, [category]: presetId }));
  };

  const handleGenerate = async () => {
    setStep("generate");
    setIsGenerating(true);
    // Simulate generation progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 200));
      setGenerationProgress(i);
    }
    setIsGenerating(false);
    setStep("result");
  };

  const PresetGrid = ({
    presets,
    category,
  }: {
    presets: PresetOption[];
    category: string;
  }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {presets.map((preset) => (
        <motion.button
          key={preset.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handlePresetSelect(category, preset.id)}
          className={`relative p-3 rounded-xl border text-left transition-all ${
            selectedPresets[category as keyof typeof selectedPresets] ===
            preset.id
              ? "border-indigo/50 bg-indigo/10 shadow-lg shadow-indigo/10"
              : "border-border bg-card hover:border-white/20"
          }`}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{preset.icon}</span>
            <span className="text-sm font-medium">{preset.name}</span>
          </div>
          <p className="text-xs text-muted-foreground">{preset.description}</p>
          {selectedPresets[category as keyof typeof selectedPresets] ===
            preset.id && (
            <div className="absolute top-2 right-2 h-4 w-4 rounded-full bg-indigo flex items-center justify-center">
              <svg
                className="h-2.5 w-2.5 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-2xl md:text-3xl font-bold">
          Create Generation
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Upload a product image and configure your generation settings.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {(["upload", "presets", "generate", "result"] as GenerationStep[]).map(
          (s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                  step === s
                    ? "bg-gradient-to-r from-indigo to-violet text-white shadow-lg shadow-indigo/25"
                    : i <
                      ["upload", "presets", "generate", "result"].indexOf(step)
                    ? "bg-indigo/20 text-indigo"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs font-medium hidden sm:inline ${
                  step === s ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </span>
              {i < 3 && (
                <ChevronRight className="h-3 w-3 text-muted-foreground" />
              )}
            </div>
          )
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Upload & Preview */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-indigo" />
                Product Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!preview ? (
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    isDragActive
                      ? "border-indigo bg-indigo/5"
                      : "border-border hover:border-indigo/30 hover:bg-white/[0.02]"
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="h-12 w-12 rounded-xl bg-indigo/10 flex items-center justify-center mx-auto mb-3">
                    <Upload className="h-6 w-6 text-indigo" />
                  </div>
                  <p className="text-sm font-medium mb-1">
                    {isDragActive
                      ? "Drop your image here"
                      : "Drag & drop your product image"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, JPEG, WEBP — Max 10MB
                  </p>
                </div>
              ) : (
                <div className="relative group">
                  <img
                    src={preview}
                    alt="Product preview"
                    className="w-full aspect-square object-cover rounded-xl border border-border"
                  />
                  <button
                    onClick={() => {
                      setUploadedFile(null);
                      setPreview(null);
                      setStep("upload");
                    }}
                    className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/60 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Provider & Model Selection */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Settings2 className="h-4 w-4 text-violet" />
                Advanced Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">
                  AI Provider
                </label>
                <Select defaultValue="pollinations">
                  <SelectTrigger className="rounded-xl bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pollinations">Pollinations</SelectItem>
                    <SelectItem value="nvidia">NVIDIA NIMs</SelectItem>
                    <SelectItem value="huggingface">HuggingFace</SelectItem>
                    <SelectItem value="togetherai">TogetherAI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">
                  AI Model
                </label>
                <Select defaultValue="flux-schnell">
                  <SelectTrigger className="rounded-xl bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flux-schnell">FLUX Schnell</SelectItem>
                    <SelectItem value="sdxl">SDXL</SelectItem>
                    <SelectItem value="juggernautxl">JuggernautXL</SelectItem>
                    <SelectItem value="realvisxl">RealVisXL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">
                  Variants: {variants[0]}
                </label>
                <Slider
                  value={variants}
                  onValueChange={(val) => setVariants(Array.isArray(val) ? val : [val])}
                  min={1}
                  max={4}
                  step={1}
                  className="py-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Presets & Generation */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {(step === "upload" || step === "presets") && (
              <motion.div
                key="presets"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-card border-border">
                  <CardContent className="p-5">
                    <Tabs defaultValue="lighting">
                      <TabsList className="bg-secondary/50 mb-4 flex-wrap h-auto gap-1 p-1">
                        <TabsTrigger
                          value="lighting"
                          className="data-[state=active]:bg-indigo/20 data-[state=active]:text-indigo rounded-lg text-xs"
                        >
                          ☀️ Lighting
                        </TabsTrigger>
                        <TabsTrigger
                          value="aesthetic"
                          className="data-[state=active]:bg-indigo/20 data-[state=active]:text-indigo rounded-lg text-xs"
                        >
                          🎨 Aesthetic
                        </TabsTrigger>
                        <TabsTrigger
                          value="background"
                          className="data-[state=active]:bg-indigo/20 data-[state=active]:text-indigo rounded-lg text-xs"
                        >
                          🖼️ Background
                        </TabsTrigger>
                        <TabsTrigger
                          value="camera"
                          className="data-[state=active]:bg-indigo/20 data-[state=active]:text-indigo rounded-lg text-xs"
                        >
                          📷 Camera
                        </TabsTrigger>
                        <TabsTrigger
                          value="color"
                          className="data-[state=active]:bg-indigo/20 data-[state=active]:text-indigo rounded-lg text-xs"
                        >
                          🎨 Color
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="lighting">
                        <PresetGrid
                          presets={LIGHTING_PRESETS}
                          category="lighting"
                        />
                      </TabsContent>
                      <TabsContent value="aesthetic">
                        <PresetGrid
                          presets={AESTHETIC_PRESETS}
                          category="aesthetic"
                        />
                      </TabsContent>
                      <TabsContent value="background">
                        <PresetGrid
                          presets={BACKGROUND_PRESETS}
                          category="background"
                        />
                      </TabsContent>
                      <TabsContent value="camera">
                        <PresetGrid
                          presets={CAMERA_PRESETS}
                          category="camera"
                        />
                      </TabsContent>
                      <TabsContent value="color">
                        <PresetGrid
                          presets={COLOR_SCHEME_PRESETS}
                          category="colorScheme"
                        />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Generate Button - Sticky on mobile */}
                <div className="mt-4 sticky bottom-4 z-10">
                  <Button
                    onClick={handleGenerate}
                    disabled={!uploadedFile}
                    className="w-full bg-gradient-to-r from-indigo to-violet hover:opacity-90 text-white shadow-xl shadow-indigo/25 rounded-xl py-6 text-base font-semibold disabled:opacity-40 disabled:cursor-not-allowed group"
                  >
                    <Wand2 className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                    Generate Product Photo
                  </Button>
                </div>
              </motion.div>
            )}

            {step === "generate" && (
              <motion.div
                key="generating"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-card border-border">
                  <CardContent className="p-12 text-center">
                    <div className="relative h-20 w-20 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo to-violet animate-spin opacity-30" />
                      <div className="absolute inset-1 rounded-full bg-card flex items-center justify-center">
                        <Loader2 className="h-8 w-8 text-indigo animate-spin" />
                      </div>
                    </div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold mb-2">
                      Generating Your Product Photo
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      {generationProgress < 30
                        ? "Analyzing product..."
                        : generationProgress < 60
                        ? "Building prompts & applying presets..."
                        : generationProgress < 90
                        ? "Generating image..."
                        : "Upscaling & finalizing..."}
                    </p>
                    <Progress value={generationProgress} className="h-2 max-w-sm mx-auto" />
                    <p className="text-xs text-muted-foreground mt-2">
                      {generationProgress}% complete
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {step === "result" && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-card border-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-[family-name:var(--font-space-grotesk)]">
                        Generation Complete
                      </CardTitle>
                      <Badge className="bg-success/20 text-success border-success/30">
                        SUCCESS
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {[...Array(variants[0])].map((_, i) => (
                        <div
                          key={i}
                          className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-gradient-to-br from-indigo/10 via-transparent to-violet/10 hover:border-indigo/30 transition-all cursor-pointer"
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <Sparkles className="h-8 w-8 text-indigo mx-auto mb-2" />
                              <span className="text-xs text-muted-foreground">
                                Variant {i + 1}
                              </span>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                            <div className="flex gap-2 w-full">
                              <Button
                                size="sm"
                                className="flex-1 bg-white/20 backdrop-blur-sm text-white text-xs h-7 rounded-lg"
                              >
                                Download
                              </Button>
                              <Button
                                size="sm"
                                className="flex-1 bg-indigo/80 text-white text-xs h-7 rounded-lg"
                              >
                                Upscale
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button
                        variant="outline"
                        className="flex-1 rounded-xl"
                        onClick={() => {
                          setStep("presets");
                          setGenerationProgress(0);
                        }}
                      >
                        Regenerate
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-to-r from-indigo to-violet text-white rounded-xl"
                        onClick={() => {
                          setUploadedFile(null);
                          setPreview(null);
                          setStep("upload");
                          setGenerationProgress(0);
                        }}
                      >
                        New Generation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
