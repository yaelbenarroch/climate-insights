
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { Download, RefreshCw, Map, Filter, Info } from "lucide-react";

// Mock data fetcher functions
const fetchClimateData = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate random monthly temperature data for the last 5 years
  const years = [2019, 2020, 2021, 2022, 2023];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const temperatureData = years.flatMap(year => 
    months.map((month, i) => ({
      date: `${month} ${year}`,
      temperature: 15 + 10 * Math.sin(i / 12 * Math.PI * 2) + (Math.random() - 0.5) * 3 + (year - 2019) * 0.2,
      precipitation: 50 + 30 * Math.sin(i / 12 * Math.PI * 2) + (Math.random() - 0.5) * 20,
      anomaly: (Math.random() - 0.5) * 2 + (year - 2019) * 0.15,
    }))
  );
  
  return temperatureData;
};

const fetchGlobalStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    globalTemp: 14.9 + (Math.random() - 0.5) * 0.2,
    tempAnomaly: 1.1 + (Math.random() - 0.5) * 0.3,
    co2Level: 415 + Math.floor(Math.random() * 5),
    seaLevelRise: 3.4 + (Math.random() - 0.5) * 0.2,
    arcticIce: 4.1 + (Math.random() - 0.5) * 0.3,
  };
};

const Dashboard = () => {
  const [selectedRegion, setSelectedRegion] = useState("global");
  const [selectedTimeRange, setSelectedTimeRange] = useState("5y");
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: climateData, isLoading: isLoadingClimate } = useQuery({
    queryKey: ['climate', selectedRegion, selectedTimeRange],
    queryFn: fetchClimateData,
  });
  
  const { data: globalStats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['globalStats'],
    queryFn: fetchGlobalStats,
  });

  // Define page animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    },
    exit: { opacity: 0, y: -20 }
  };
  
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };
  
  const regions = [
    { value: "global", label: "Global" },
    { value: "north-america", label: "North America" },
    { value: "europe", label: "Europe" },
    { value: "asia", label: "Asia" },
    { value: "africa", label: "Africa" },
    { value: "south-america", label: "South America" },
    { value: "oceania", label: "Oceania" },
  ];
  
  const timeRanges = [
    { value: "1y", label: "1 Year" },
    { value: "5y", label: "5 Years" },
    { value: "10y", label: "10 Years" },
    { value: "30y", label: "30 Years" },
    { value: "100y", label: "100 Years" },
  ];
  
  // COLORS for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  // Prepare data for pie chart
  const pieData = [
    { name: 'CO2', value: 64 },
    { name: 'Methane', value: 17 },
    { name: 'Nitrous Oxide', value: 6 },
    { name: 'Fluorinated Gases', value: 13 },
  ];

  return (
    <motion.div
      className="container pt-32 pb-16 px-4 md:px-6 max-w-7xl mx-auto"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Climate Dashboard</h1>
          <p className="text-muted-foreground">
            Interactive visualizations of climate data and trends
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map(region => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-[160px] h-9">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm" className="h-9">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </motion.div>
      
      {/* Key Metrics */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {isLoadingStats ? (
          Array(5).fill(0).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-4 pb-2">
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <StatsCard
              title="Global Temperature"
              value={`${globalStats?.globalTemp.toFixed(1)}°C`}
              description="Annual average"
              trend="up"
            />
            <StatsCard
              title="Temperature Anomaly"
              value={`+${globalStats?.tempAnomaly.toFixed(1)}°C`}
              description="vs pre-industrial"
              trend="up"
            />
            <StatsCard
              title="CO₂ Concentration"
              value={`${globalStats?.co2Level} ppm`}
              description="Atmospheric levels"
              trend="up"
            />
            <StatsCard
              title="Sea Level Rise"
              value={`${globalStats?.seaLevelRise.toFixed(1)} mm/yr`}
              description="Current rate"
              trend="up"
            />
            <StatsCard
              title="Arctic Sea Ice"
              value={`${globalStats?.arcticIce.toFixed(1)} M km²`}
              description="September minimum"
              trend="down"
            />
          </>
        )}
      </motion.div>
      
      {/* Tabs */}
      <motion.div variants={itemVariants}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="precipitation">Precipitation</TabsTrigger>
            <TabsTrigger value="emissions">Emissions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Temperature Trends</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {isLoadingClimate ? (
                    <div className="w-full h-[300px] flex items-center justify-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={climateData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                        <XAxis 
                          dataKey="date" 
                          tick={{ fontSize: 12 }} 
                          tickFormatter={(value) => value.split(' ')[0]}
                          interval={5}
                        />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                            borderColor: '#e5e7eb',
                            borderRadius: '0.375rem',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          }} 
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="temperature" 
                          stroke="#3b82f6" 
                          strokeWidth={2} 
                          dot={false}
                          activeDot={{ r: 6 }}
                          animationDuration={1500}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="anomaly" 
                          stroke="#ef4444" 
                          strokeWidth={2} 
                          dot={false}
                          animationDuration={1500}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Greenhouse Gas Composition</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {isLoadingClimate ? (
                    <div className="w-full h-[300px] flex items-center justify-center">
                      <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          animationDuration={1500}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Monthly Precipitation</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {isLoadingClimate ? (
                  <div className="w-full h-[300px] flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={climateData?.slice(-24)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }} 
                        interval={1}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="precipitation" 
                        stroke="#0ea5e9" 
                        fill="#0ea5e9" 
                        fillOpacity={0.2}
                        animationDuration={1500}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="temperature" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  Detailed temperature analysis for the selected region and time period.
                </p>
                
                {isLoadingClimate ? (
                  <div className="w-full h-[400px] flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={climateData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }} 
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="temperature" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        animationDuration={1500}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="anomaly" 
                        stroke="#ef4444" 
                        strokeWidth={2} 
                        animationDuration={1500}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="precipitation" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Precipitation Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  Precipitation patterns and anomalies for the selected region and time period.
                </p>
                
                {isLoadingClimate ? (
                  <div className="w-full h-[400px] flex items-center justify-center">
                    <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={climateData?.slice(-24)}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.2} />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }} 
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="precipitation" 
                        fill="#0ea5e9" 
                        animationDuration={1500}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="emissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Emissions Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-6">
                  Greenhouse gas emissions data for the selected region and time period.
                </p>
                
                <div className="flex items-center justify-center h-[300px]">
                  <div className="text-center space-y-3">
                    <Info className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p>Emissions data is not available for the selected parameters.</p>
                    <Button variant="outline">Request Data</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

// Stats card component
const StatsCard = ({ 
  title, 
  value, 
  description,
  trend
}: { 
  title: string; 
  value: string; 
  description: string;
  trend: 'up' | 'down' | 'neutral'
}) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-red-500';
    if (trend === 'down') return 'text-green-500';
    return 'text-gray-500';
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
