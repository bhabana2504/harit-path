import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Camera, 
  Upload, 
  ArrowLeft, 
  MapPin, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Loader2,
  Info,
  Phone
} from "lucide-react";

interface PestDetectionProps {
  onBack: () => void;
}

export default function PestDetection({ onBack }: PestDetectionProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Camera access is required for pest detection. Please allow camera permission.');
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setSelectedImage(imageData);
        stopCamera();
        analyzeImage();
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setCameraActive(false);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setResults({
        pest: "Aphids (Green Peach Aphid)",
        confidence: 92,
        severity: "Medium",
        location: "Pune, Maharashtra",
        timestamp: new Date().toLocaleString(),
        treatment: {
          immediate: [
            "Spray neem oil solution (2-3 ml per liter water)",
            "Remove heavily infested leaves manually",
            "Increase air circulation around plants"
          ],
          preventive: [
            "Use yellow sticky traps to monitor aphid population",
            "Encourage beneficial insects like ladybugs",
            "Avoid over-fertilizing with nitrogen"
          ]
        },
        expertContact: true
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetDetection = () => {
    setSelectedImage(null);
    setResults(null);
    stopCamera();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-primary text-primary-foreground p-6 rounded-b-3xl">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-primary-foreground mr-3">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="farmer-heading">Pest & Disease Detection</h1>
            <p className="farmer-text-lg opacity-90">AI-powered crop health analysis</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {!selectedImage && !cameraActive && (
          <>
            {/* Instructions */}
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription className="farmer-text-lg">
                Take a clear photo of affected leaves or crops for accurate pest detection. 
                Ensure good lighting and focus on the problem area.
              </AlertDescription>
            </Alert>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 gap-4">
              <Button 
                onClick={startCamera}
                className="voice-button h-20 farmer-text-lg"
              >
                <Camera className="w-8 h-8 mr-3" />
                Take Photo with Camera
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="h-20 farmer-text-lg border-2 border-dashed"
              >
                <Upload className="w-8 h-8 mr-3" />
                Upload from Gallery
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Recent Detections */}
            <Card className="farmer-card">
              <CardHeader>
                <CardTitle className="farmer-text-xl text-primary">Recent Detections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Leaf Blight</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                    <Badge variant="destructive">High</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Spider Mites</p>
                      <p className="text-sm text-muted-foreground">5 days ago</p>
                    </div>
                    <Badge className="bg-warning text-warning-foreground">Medium</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Camera View */}
        {cameraActive && (
          <div className="space-y-4">
            <Card className="farmer-card overflow-hidden">
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 border-4 border-primary/50 rounded-lg m-4 pointer-events-none">
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-primary"></div>
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary"></div>
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-primary"></div>
                </div>
              </div>
            </Card>
            
            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={stopCamera} className="farmer-text-lg">
                Cancel
              </Button>
              <Button onClick={captureImage} className="voice-button farmer-text-lg">
                <Camera className="w-5 h-5 mr-2" />
                Capture
              </Button>
            </div>
          </div>
        )}

        {/* Image Analysis */}
        {selectedImage && (
          <div className="space-y-6">
            <Card className="farmer-card">
              <CardContent className="p-0">
                <img 
                  src={selectedImage} 
                  alt="Captured crop" 
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="farmer-text-lg">Pune, Maharashtra</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="farmer-text-lg">{new Date().toLocaleTimeString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {isAnalyzing && (
              <Card className="farmer-card">
                <CardContent className="p-8 text-center">
                  <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
                  <h3 className="farmer-text-xl font-semibold mb-2">Analyzing Image...</h3>
                  <p className="farmer-text-lg text-muted-foreground">
                    Our AI is examining your crop photo for pests and diseases
                  </p>
                </CardContent>
              </Card>
            )}

            {results && (
              <div className="space-y-4">
                {/* Detection Results */}
                <Card className="farmer-card">
                  <CardHeader>
                    <CardTitle className="farmer-text-xl text-primary flex items-center">
                      <AlertTriangle className="w-6 h-6 mr-2 text-warning" />
                      Detection Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="farmer-text-xl font-semibold">{results.pest}</h3>
                          <p className="farmer-text-lg text-muted-foreground">
                            Confidence: {results.confidence}%
                          </p>
                        </div>
                        <Badge 
                          className={`farmer-text-lg ${
                            results.severity === 'Low' ? 'bg-success' : 
                            results.severity === 'Medium' ? 'bg-warning' : 
                            'bg-destructive'
                          }`}
                        >
                          {results.severity} Risk
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Treatment Recommendations */}
                <Card className="farmer-card">
                  <CardHeader>
                    <CardTitle className="farmer-text-xl text-success flex items-center">
                      <CheckCircle className="w-6 h-6 mr-2" />
                      Treatment Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="farmer-text-xl font-semibold text-destructive mb-2">
                          Immediate Action Required:
                        </h4>
                        <ul className="space-y-2">
                          {results.treatment.immediate.map((item: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-destructive mt-1">•</span>
                              <span className="farmer-text-lg">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="farmer-text-xl font-semibold text-primary mb-2">
                          Prevention Tips:
                        </h4>
                        <ul className="space-y-2">
                          {results.treatment.preventive.map((item: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-primary mt-1">•</span>
                              <span className="farmer-text-lg">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Expert Contact */}
                {results.expertContact && (
                  <Card className="farmer-card">
                    <CardContent className="p-4">
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertDescription className="farmer-text-lg">
                          Need more help? Connect with our agricultural experts for personalized advice.
                        </AlertDescription>
                      </Alert>
                      <Button className="w-full mt-4 voice-button farmer-text-lg">
                        <Phone className="w-5 h-5 mr-2" />
                        Contact Expert Now
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <Button variant="outline" onClick={resetDetection} className="farmer-text-lg">
                Detect Another
              </Button>
              {results && (
                <Button className="voice-button farmer-text-lg">
                  Save Results
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}