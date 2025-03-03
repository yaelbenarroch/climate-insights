
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, LineChart, Line, 
  PieChart, Pie, Cell
} from "recharts";

// Sample climate data for visualizations
const temperatureData = [
  { month: "Jan", global: 0.92, northern: 1.23, southern: 0.62 },
  { month: "Feb", global: 0.98, northern: 1.33, southern: 0.65 },
  { month: "Mar", global: 1.02, northern: 1.41, southern: 0.67 },
  { month: "Apr", global: 1.13, northern: 1.52, southern: 0.78 },
  { month: "May", global: 1.06, northern: 1.29, southern: 0.85 },
  { month: "Jun", global: 0.99, northern: 1.17, southern: 0.81 },
  { month: "Jul", global: 0.95, northern: 1.08, southern: 0.82 },
  { month: "Aug", global: 1.01, northern: 1.22, southern: 0.83 },
  { month: "Sep", global: 1.11, northern: 1.31, southern: 0.92 },
  { month: "Oct", global: 1.18, northern: 1.39, southern: 0.97 },
  { month: "Nov", global: 1.23, northern: 1.45, southern: 1.02 },
  { month: "Dec", global: 1.15, northern: 1.37, southern: 0.93 }
];

const emissionsData = [
  { name: "United States", value: 14.7 },
  { name: "China", value: 27.2 },
  { name: "EU", value: 9.8 },
  { name: "India", value: 6.8 },
  { name: "Russia", value: 4.7 },
  { name: "Japan", value: 3.0 },
  { name: "Rest of World", value: 33.8 }
];

const impactData = [
  { year: 2010, temperature: 0.72, sealevel: 2.5, extremeEvents: 64 },
  { year: 2011, temperature: 0.61, sealevel: 2.8, extremeEvents: 71 },
  { year: 2012, temperature: 0.65, sealevel: 3.1, extremeEvents: 89 },
  { year: 2013, temperature: 0.68, sealevel: 3.2, extremeEvents: 78 },
  { year: 2014, temperature: 0.75, sealevel: 3.5, extremeEvents: 83 },
  { year: 2015, temperature: 0.90, sealevel: 3.7, extremeEvents: 91 },
  { year: 2016, temperature: 1.02, sealevel: 4.0, extremeEvents: 98 },
  { year: 2017, temperature: 0.92, sealevel: 4.2, extremeEvents: 97 },
  { year: 2018, temperature: 0.85, sealevel: 4.4, extremeEvents: 102 },
  { year: 2019, temperature: 0.98, sealevel: 4.8, extremeEvents: 109 },
  { year: 2020, temperature: 1.03, sealevel: 5.1, extremeEvents: 112 },
  { year: 2021, temperature: 0.85, sealevel: 5.4, extremeEvents: 114 },
  { year: 2022, temperature: 0.90, sealevel: 5.7, extremeEvents: 119 }
];

const projectionData = [
  { year: 2025, lowEmissions: 1.1, moderateEmissions: 1.2, highEmissions: 1.3 },
  { year: 2030, lowEmissions: 1.2, moderateEmissions: 1.4, highEmissions: 1.6 },
  { year: 2035, lowEmissions: 1.3, moderateEmissions: 1.6, highEmissions: 2.0 },
  { year: 2040, lowEmissions: 1.4, moderateEmissions: 1.8, highEmissions: 2.3 },
  { year: 2045, lowEmissions: 1.5, moderateEmissions: 2.0, highEmissions: 2.7 },
  { year: 2050, lowEmissions: 1.6, moderateEmissions: 2.2, highEmissions: 3.1 },
  { year: 2055, lowEmissions: 1.6, moderateEmissions: 2.4, highEmissions: 3.4 },
  { year: 2060, lowEmissions: 1.7, moderateEmissions: 2.6, highEmissions: 3.8 },
  { year: 2065, lowEmissions: 1.7, moderateEmissions: 2.8, highEmissions: 4.1 },
  { year: 2070, lowEmissions: 1.8, moderateEmissions: 3.0, highEmissions: 4.5 }
];

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const Insights = () => {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-6 text-3xl font-bold tracking-tight">Climate Insights</h1>
        <p className="mb-10 text-muted-foreground">
          Explore data visualizations and analysis of global climate trends, emissions, and projections.
        </p>

        <Tabs defaultValue="temperature">
          <TabsList className="mb-8 w-full justify-start overflow-x-auto">
            <TabsTrigger value="temperature">Temperature Trends</TabsTrigger>
            <TabsTrigger value="emissions">Global Emissions</TabsTrigger>
            <TabsTrigger value="impacts">Climate Impacts</TabsTrigger>
            <TabsTrigger value="projections">Future Projections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="temperature" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Global Temperature Anomalies (°C)</CardTitle>
                <CardDescription>
                  Monthly temperature anomalies compared to the 1951-1980 baseline average
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={temperatureData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="global" 
                      stackId="1" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.6} 
                      name="Global"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="northern" 
                      stackId="2" 
                      stroke="#ef4444" 
                      fill="#ef4444" 
                      fillOpacity={0.5} 
                      name="Northern Hemisphere"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="southern" 
                      stackId="3" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.5} 
                      name="Southern Hemisphere"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="emissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Global CO₂ Emissions by Country (2022)</CardTitle>
                <CardDescription>
                  Percentage of global carbon dioxide emissions by major emitters
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={emissionsData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      >
                        {emissionsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <h3 className="text-xl font-medium">Key Insights</h3>
                  <ul className="space-y-2">
                    <li>China remains the largest emitter at 27.2% of global emissions</li>
                    <li>The US is the second largest at 14.7%</li>
                    <li>The EU collectively accounts for 9.8% of emissions</li>
                    <li>India's emissions have grown to 6.8% as its economy expands</li>
                    <li>The remaining 33.8% comes from all other countries combined</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="impacts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Climate Change Impacts (2010-2022)</CardTitle>
                <CardDescription>
                  Tracking key climate impact indicators over the past decade
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={impactData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="year" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="temperature"
                      name="Temperature Anomaly (°C)"
                      stroke="#ef4444"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="sealevel"
                      name="Sea Level Rise (cm)"
                      stroke="#3b82f6"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="extremeEvents"
                      name="Extreme Weather Events"
                      stroke="#10b981"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Future Temperature Projections (°C)</CardTitle>
                <CardDescription>
                  Global temperature rise projections under different emission scenarios
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={projectionData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="lowEmissions"
                      name="Low Emissions Scenario"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="moderateEmissions"
                      name="Moderate Emissions Scenario"
                      stroke="#f59e0b"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="highEmissions"
                      name="High Emissions Scenario"
                      stroke="#ef4444"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Insights;
