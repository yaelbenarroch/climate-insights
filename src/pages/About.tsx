
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const About = () => {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-12"
      >
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">About Climate Insights</h1>
          <p className="text-muted-foreground max-w-3xl">
            Climate Insights is a comprehensive platform that provides data analytics, 
            visualizations, and machine learning insights about global climate change 
            trends and projections.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>
              Working towards climate literacy and data-driven decision making
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Data Transparency</h3>
                <p className="text-muted-foreground">
                  We believe in making climate data accessible, understandable, and actionable for everyone.
                  Our platform aggregates data from trusted scientific sources and presents it in a way that's
                  easy to comprehend and utilize.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Predictive Insights</h3>
                <p className="text-muted-foreground">
                  By leveraging advanced machine learning models, we provide forecasts and predictions
                  about future climate scenarios. These insights can help individuals, organizations,
                  and policymakers make informed decisions.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Open Source Collaboration</h3>
                <p className="text-muted-foreground">
                  Our platform is built on open-source principles. We welcome contributions from
                  data scientists, climate researchers, and developers who want to improve climate
                  data analysis and visualization.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Educational Resources</h3>
                <p className="text-muted-foreground">
                  We're committed to enhancing climate literacy through educational content that
                  explains complex climate concepts in an accessible way, empowering users to
                  understand the data and its implications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Data Sources</h2>
          <p className="text-muted-foreground max-w-3xl">
            Our platform integrates data from multiple reliable scientific institutions and organizations.
            Below are the primary sources that power our analytics and visualizations.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>NASA GISS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Temperature data from NASA's Goddard Institute for Space Studies,
                  providing global temperature anomalies and trends.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>NOAA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Oceanic and atmospheric data from the National Oceanic and Atmospheric
                  Administration, including sea level measurements.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Global Carbon Project</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Carbon dioxide emissions data and carbon cycle analysis from
                  the Global Carbon Project's annual reports.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>IPCC</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Assessment reports and model projections from the Intergovernmental
                  Panel on Climate Change.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>World Bank Climate Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Economic and development indicators related to climate change
                  and emissions from the World Bank's databank.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Berkeley Earth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Independent temperature data analysis providing comprehensive
                  surface temperature datasets.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How is the climate data processed?</AccordionTrigger>
              <AccordionContent>
                Our platform applies various data processing techniques including normalization,
                outlier detection, and quality control. We then use statistical methods and
                machine learning models to analyze trends, create visualizations, and generate
                predictions. All processing steps are documented and transparent.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>How accurate are the climate projections?</AccordionTrigger>
              <AccordionContent>
                Climate projections involve inherent uncertainties. Our models incorporate
                uncertainty quantification and present results with confidence intervals.
                We use ensemble forecasting techniques that combine multiple models to improve
                prediction reliability. However, all projections should be interpreted as
                possible scenarios rather than precise forecasts.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>How often is the data updated?</AccordionTrigger>
              <AccordionContent>
                We update our datasets monthly for temperature and atmospheric measurements,
                quarterly for sea level data, and annually for emissions and economic indicators.
                Each dataset has a timestamp showing when it was last updated, and we maintain
                a changelog of significant data revisions.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>Can I download the data for my own analysis?</AccordionTrigger>
              <AccordionContent>
                Yes, registered users can download raw data, processed datasets, and visualization
                exports in various formats including CSV, JSON, and Excel. We also provide API
                access for those who wish to integrate our data into their own applications or
                research.
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>How can I contribute to the platform?</AccordionTrigger>
              <AccordionContent>
                We welcome contributions in several forms: data scientists can contribute analysis
                methods, developers can improve our code, and climate experts can review and validate
                content. Visit our GitHub repository to see open issues, submit pull requests, or
                join our contributor community.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="text-muted-foreground">
            Have questions, feedback, or want to collaborate? We'd love to hear from you.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">General Inquiries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Email: info@climateinsights.org</p>
                <p className="text-sm text-muted-foreground">Twitter: @ClimateInsights</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Technical Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">Email: support@climateinsights.org</p>
                <p className="text-sm text-muted-foreground">GitHub: github.com/climate-insights</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
