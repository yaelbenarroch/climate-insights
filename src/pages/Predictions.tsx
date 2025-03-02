
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ComposedChart, Bar, Scatter, ScatterChart, ZAxis
} from "recharts";
import { 
  CalendarClock, RefreshCw, AlertCircle, 
  BarChart2, LineChart as LineChartIcon, Info
} from "lucide-react";

// Mock data fetcher for predictions
const fetchPredictionData = async (model: string, scenario: string, confidence: number) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  // Base year and data points
  const baseYear = 2024;
  const years = Array.from({ length: 76 }, (_, i) => baseYear + i);
  
  // Generate prediction data with uncertainty ranges
  let baseline = 14.8; // Baseline temperature in °C
  let anomalyFactor: number;
  
  // Different scenarios have different rates of change
  switch (scenario) {
    case "rcp2.6": anomalyFactor = 0.015; break;
    case "rcp4.5": anomalyFactor = 0.025; break;
    case "rcp6.0": anomalyFactor = 0.035; break;
    case "rcp8.5": anomalyFactor = 0.055; break;
    default: anomalyFactor = 0.025;
  }
  
  // Different models have different fluctuations
  const modelNoise = {
    "gfdl": 0.15,
    "hadley": 0.20,
    "nasa": 0.12,
    "ensemble": 0.08,
  }[model] || 0.1;
  
  // Generate data with predictions and uncertainty ranges
  const predictionData = years.map(year => {
    const yearsSinceBase = year - baseYear;
    // Non-linear increase over time
    const tempIncrease = (yearsSinceBase) * anomalyFactor * (1 + yearsSinceBase / 100);
    const predictedTemp = baseline + tempIncrease;
    
    // Calculate uncertainty based on confidence level parameter
    const uncertaintyRange = modelNoise * (1 + yearsSinceBase / 30) * (1 - confidence / 100);
    
    return {
      year,
      predicted: predictedTemp + (Math.random() - 0.5) * modelNoise,
      lower: predictedTemp - uncertaintyRange,
      upper: predictedTemp + uncertaintyRange,
      // Additional data for different prediction types
      precipitation: 900 - yearsSinceBase * (scenario === "rcp8.5" ? 2.5 : 1.2) + (Math.random() - 0.5) * 50,
      sealevel: 0 + yearsSinceBase * (scenario === "rcp8.5" ? 0.55 : 0.3) + (Math.random() - 0.5) * 0.1,
    };
  });
  
  return predictionData;
};

const Predictions = () => {
  const [selectedModel, setSelectedModel] = useState("ensemble");
  const [selectedScenario, setSelectedScenario] = useState("rcp4.5");
  const [confidenceLevel, setConfidenceLevel] = useState(80);
  const [selectedCategory, setSelectedCategory] = useState("temperature");
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['predictions', selectedModel, selectedScenario, confidenceLevel, selectedCategory],
    queryFn: () => fetchPredictionData(selectedModel, selectedScenario, confidenceLevel),
  });
  
  const models = [
    { value: "ensemble", label: "Ensemble Average" },
    { value: "gfdl", label: "GFDL-CM4" },
    { value: "hadley", label: "HadGEM3-GC3.1" },
    { value: "nasa", label: "NASA GISS-E2.1" },
  ];
  
  const scenarios = [
    { value: "rcp2.6", label: "RCP 2.6 (Low Emissions)" },
    { value: "rcp4.5", label: "RCP 4.5 (Moderate Mitigation)" },
    { value: "rcp6.0", label: "RCP 6.0 (Moderate Emissions)" },
    { value: "rcp8.5", label: "RCP 8.5 (High Emissions)" },
  ];
  
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, staggerChildren: 0.1 }
    },
    exit: { opacity: 0, y: -20 }
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };
  
  // Format the data for the current category
  const getChartData = () => {
    if (!data) return [];
    
    switch (selectedCategory) {
      case "temperature":
        return data.filter((_, i) => i % 5 === 0); // Reduce data points
      case "precipitation":
        return data.filter((_, i) => i % 5 === 0); // Reduce data points
      case "sealevel":
        return data.filter((_, i) => i % 5 === 0); // Reduce data points
      default:
        return data.filter((_, i) => i % 5 === 0); // Reduce data points
    }
  };
  
  // Get y-axis label based on category
  const getYAxisLabel = () => {
    switch (selectedCategory) {
      case "temperature": return "Temperature (°C)";
      case "precipitation": return "Precipitation (mm/year)";
      case "sealevel": return "Sea Level Rise (m)";
      default: return "";
    }
  };
  
  const getLegendForCategory = () => {
    switch (selectedCategory) {
      case "temperature":
        return ["Predicted Temperature", "Uncertainty Range"];
      case "precipitation":
        return ["Predicted Precipitation"];
      case "sealevel":
        return ["Predicted Sea Level Rise"];
      default:
        return ["Predicted Value"];
    }
  };
  
  // Get scenario description
  const getScenarioDescription = () => {
    switch (selectedScenario) {
      case "rcp2.6":
        return "A scenario with very low greenhouse gas emissions with radiative forcing peaking at 3 W/m² before 2100.";
      case "rcp4.5":
        return "An intermediate stabilization scenario where emissions peak around 2040, then decline with radiative forcing of 4.5 W/m².";
      case "rcp6.0":
        return "An intermediate stabilization scenario where emissions peak around 2080, then decline with radiative forcing of 6.0 W/m².";
      case "rcp8.5":
        return "A high emission scenario representing a future with no policy changes to reduce emissions.";
      default:
        return "";
    }
  };
  
  // Get model description
  const getModelDescription = () => {
    switch (selectedModel) {
      case "ensemble":
        return "Average of multiple climate models, reducing individual model biases for more robust projections.";
      case "gfdl":
        return "NOAA Geophysical Fluid Dynamics Laboratory model with detailed ocean-atmosphere coupling.";
      case "hadley":
        return "UK Met Office Hadley Centre model known for its detailed atmospheric physics.";
      case "nasa":
        return "NASA Goddard Institute for Space Studies model with strong representation of stratospheric processes.";
      default:
        return "";
    }
  };

  return (
    <motion.div
      className="container pt-32 pb-16 px-4 md:px-6 max-w-7xl mx-auto"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Climate Predictions</h1>
        <p className="text-muted-foreground">
          Explore future climate scenarios using advanced machine learning models
        </p>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar with controls */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Model Parameters</CardTitle>
              <CardDescription>Configure the prediction model</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Climate Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">{getModelDescription()}</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Emissions Scenario</label>
                <Select value={selectedScenario} onValueChange={setSelectedScenario}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select scenario" />
                  </SelectTrigger>
                  <SelectContent>
                    {scenarios.map((scenario) => (
                      <SelectItem key={scenario.value} value={scenario.value}>
                        {scenario.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">{getScenarioDescription()}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Confidence Level</label>
                  <Badge variant="outline">{confidenceLevel}%</Badge>
                </div>
                <Slider
                  value={[confidenceLevel]}
                  min={50}
                  max={95}
                  step={5}
                  onValueChange={(vals) => setConfidenceLevel(vals[0])}
                />
                <p className="text-xs text-muted-foreground">
                  Higher values show narrower uncertainty ranges
                </p>
              </div>
              
              <div className="space-y-2 pt-4">
                <label className="text-sm font-medium">Prediction Type</label>
                <div className="grid grid-cols-1 gap-2">
                  <Button 
                    variant={selectedCategory === "temperature" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("temperature")}
                    className="justify-start"
                  >
                    <LineChartIcon className="h-4 w-4 mr-2" />
                    Temperature
                  </Button>
                  <Button 
                    variant={selectedCategory === "precipitation" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("precipitation")}
                    className="justify-start"
                  >
                    <BarChart2 className="h-4 w-4 mr-2" />
                    Precipitation
                  </Button>
                  <Button 
                    variant={selectedCategory === "sealevel" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory("sealevel")}
                    className="justify-start"
                  >
                    <LineChartIcon className="h-4 w-4 mr-2" />
                    Sea Level Rise
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Model Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>Apr 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Resolution:</span>
                  <span>Global</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Source:</span>
                  <span>CMIP6</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Training Period:</span>
                  <span>1950-2023</span>
                </div>
              </div>
              
              <Alert className="mt-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  These projections are based on historical data and climate models. 
                  Actual outcomes may vary based on future emissions and policy changes.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Prediction chart */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>
                    {selectedCategory === "temperature" ? "Temperature Projection" : 
                     selectedCategory === "precipitation" ? "Precipitation Projection" : 
                     "Sea Level Rise Projection"}
                  </CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <CalendarClock className="h-3.5 w-3.5 mr-1.5" />
                    2024 - 2100 projection
                  </CardDescription>
                </div>
                
                <Badge variant="outline" className="font-normal">
                  {models.find(m => m.value === selectedModel)?.label} • 
                  {scenarios.find(s => s.value === selectedScenario)?.label.split(" ")[0]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {isLoading ? (
                <div className="h-[400px] w-full flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
                    <p className="text-sm text-muted-foreground mt-2">Processing model data...</p>
                  </div>
                </div>
              ) : isError ? (
                <div className="h-[400px] w-full flex items-center justify-center">
                  <div className="flex flex-col items-center">
                    <AlertCircle className="h-8 w-8 text-red-500" />
                    <p className="text-sm text-muted-foreground mt-2">Error loading prediction data</p>
                  </div>
                </div>
              ) : (
                <>
                  {selectedCategory === "temperature" && (
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer>
                        <ComposedChart data={getChartData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                          <XAxis dataKey="year" />
                          <YAxis label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }} />
                          <Tooltip
                            formatter={(value) => [`${Number(value).toFixed(2)}°C`, "Temperature"]}
                            labelFormatter={(year) => `Year ${year}`}
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              borderColor: '#e5e7eb',
                              borderRadius: '0.375rem',
                            }}
                          />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="upper" 
                            stackId="1" 
                            fill="#3b82f6" 
                            fillOpacity={0.15} 
                            stroke="none"
                            name="Uncertainty Range"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="lower" 
                            stackId="1" 
                            fill="#3b82f6"
                            fillOpacity={0.05} 
                            stroke="none" 
                            name="Uncertainty Range"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="predicted" 
                            stroke="#3b82f6" 
                            strokeWidth={2} 
                            dot={false}
                            activeDot={{ r: 6 }}
                            name="Predicted Temperature"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                  
                  {selectedCategory === "precipitation" && (
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer>
                        <AreaChart data={getChartData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                          <XAxis dataKey="year" />
                          <YAxis label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }} />
                          <Tooltip
                            formatter={(value) => [`${Number(value).toFixed(0)} mm/year`, "Precipitation"]}
                            labelFormatter={(year) => `Year ${year}`}
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              borderColor: '#e5e7eb',
                              borderRadius: '0.375rem',
                            }}
                          />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="precipitation" 
                            stroke="#0ea5e9" 
                            strokeWidth={2}
                            fill="#0ea5e9" 
                            fillOpacity={0.1}
                            name="Predicted Precipitation"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                  
                  {selectedCategory === "sealevel" && (
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer>
                        <LineChart data={getChartData()} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                          <XAxis dataKey="year" />
                          <YAxis label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }} />
                          <Tooltip
                            formatter={(value) => [`${Number(value).toFixed(2)} m`, "Sea Level Rise"]}
                            labelFormatter={(year) => `Year ${year}`}
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              borderColor: '#e5e7eb',
                              borderRadius: '0.375rem',
                            }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="sealevel" 
                            stroke="#8b5cf6" 
                            strokeWidth={2} 
                            dot={false}
                            activeDot={{ r: 6 }}
                            name="Predicted Sea Level Rise"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
          
          {/* Additional insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {selectedCategory === "temperature" && (
                    <>
                      <li className="flex gap-2">
                        <div className="rounded-full h-6 w-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs">1</div>
                        <div className="flex-1 text-sm">
                          <strong>Warming Acceleration:</strong> Temperature increase accelerates in higher emission scenarios.
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <div className="rounded-full h-6 w-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs">2</div>
                        <div className="flex-1 text-sm">
                          <strong>Critical Thresholds:</strong> 1.5°C warming threshold likely exceeded by 2040 in all but the lowest emission scenario.
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <div className="rounded-full h-6 w-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs">3</div>
                        <div className="flex-1 text-sm">
                          <strong>Uncertainty Growth:</strong> Prediction uncertainty increases over longer time horizons.
                        </div>
                      </li>
                    </>
                  )}
                  {selectedCategory === "precipitation" && (
                    <>
                      <li className="flex gap-2">
                        <div className="rounded-full h-6 w-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs">1</div>
                        <div className="flex-1 text-sm">
                          <strong>Pattern Shifts:</strong> Precipitation patterns show significant regional variations and seasonal shifts.
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <div className="rounded-full h-6 w-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs">2</div>
                        <div className="flex-1 text-sm">
                          <strong>Extreme Events:</strong> Increased frequency of extreme precipitation events even with declining averages.
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <div className="rounded-full h-6 w-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs">3</div>
                        <div className="flex-1 text-sm">
                          <strong>Drought Risk:</strong> Higher temperature scenarios correlate with increased drought risk in many regions.
                        </div>
                      </li>
                    </>
                  )}
                  {selectedCategory === "sealevel" && (
                    <>
                      <li className="flex gap-2">
                        <div className="rounded-full h-6 w-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs">1</div>
                        <div className="flex-1 text-sm">
                          <strong>Thermal Expansion:</strong> Ocean warming causes water expansion, contributing significantly to sea level rise.
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <div className="rounded-full h-6 w-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs">2</div>
                        <div className="flex-1 text-sm">
                          <strong>Ice Sheet Contribution:</strong> Greenland and Antarctic ice sheet melt accelerates in higher emission scenarios.
                        </div>
                      </li>
                      <li className="flex gap-2">
                        <div className="rounded-full h-6 w-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs">3</div>
                        <div className="flex-1 text-sm">
                          <strong>Coastal Impact:</strong> Even moderate sea level rise significantly increases coastal flooding events.
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Model Confidence</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-[170px]">
                    {!isLoading && data && (
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                          <XAxis type="number" dataKey="year" name="Year" />
                          <YAxis 
                            type="number" 
                            dataKey={selectedCategory === "temperature" ? "predicted" : 
                                     selectedCategory === "precipitation" ? "precipitation" : "sealevel"} 
                            name="Value" 
                          />
                          <ZAxis 
                            type="number" 
                            dataKey={selectedCategory === "temperature" ? 
                              (d: any) => d.upper - d.lower : 0.5} 
                            range={[20, 400]} 
                            name="Uncertainty" 
                          />
                          <Tooltip 
                            cursor={{ strokeDasharray: '3 3' }}
                            formatter={(value) => [
                              `${Number(value).toFixed(2)} ${selectedCategory === "temperature" ? "°C" : 
                                selectedCategory === "precipitation" ? "mm" : "m"}`, 
                              selectedCategory === "temperature" ? "Temperature" : 
                              selectedCategory === "precipitation" ? "Precipitation" : "Sea Level"
                            ]}
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              borderColor: '#e5e7eb',
                              borderRadius: '0.375rem',
                            }}
                          />
                          <Scatter 
                            name="Prediction Points" 
                            data={getChartData().filter((_, i) => i % 3 === 0)} 
                            fill="#3b82f6"
                            opacity={0.7}
                          />
                        </ScatterChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Model Accuracy:</span>
                      <span className="font-medium">
                        {selectedModel === "ensemble" ? "High" : 
                         selectedModel === "nasa" ? "Medium-High" : 
                         selectedModel === "hadley" ? "Medium" : "Medium"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Uncertainty Growth:</span>
                      <span className="font-medium">
                        {selectedScenario === "rcp8.5" ? "High" : 
                         selectedScenario === "rcp2.6" ? "Low" : "Medium"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Confidence Level:</span>
                      <span className="font-medium">{confidenceLevel}%</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Bubble size indicates uncertainty range. Larger bubbles represent wider prediction ranges.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Predictions;
