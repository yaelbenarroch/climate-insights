
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Globe, ArrowUpRight, Sparkles, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.6,
        ease: [0.1, 0.5, 0.3, 1],
      },
    }),
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full pt-32 pb-20 px-4 md:px-6 flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-transparent dark:from-gray-900 dark:to-gray-950">
        <motion.div
          className="container max-w-4xl text-center space-y-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          custom={0}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Advanced Climate Data Analytics
            </span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Unlock Powerful <span className="text-gradient">Climate Insights</span> with ML and AI
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore climate patterns, predict future trends, and discover actionable insights through advanced machine learning models and intuitive visualizations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/dashboard">
              <Button size="lg" className="gap-1 h-12 px-6">
                Explore Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="gap-1 h-12 px-6">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Floating Globe Visualization */}
        <motion.div
          className="relative w-full max-w-3xl h-[400px] mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[300px] h-[300px] animate-float">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-teal-400/20 animate-pulse-slow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="h-40 w-40 text-blue-500 dark:text-blue-400" strokeWidth={0.5} />
              </div>
              
              {/* Data points */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-blue-500/80 dark:bg-blue-400/80"
                  style={{
                    width: Math.random() * 8 + 4 + "px",
                    height: Math.random() * 8 + 4 + "px",
                    left: Math.random() * 100 + "%",
                    top: Math.random() * 100 + "%",
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.8 + i * 0.1,
                    duration: 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container py-20 px-4 md:px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Analytics Tools
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform combines advanced machine learning algorithms with intuitive visualizations
            to transform complex climate data into actionable insights.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUpVariants}
              custom={i + 1}
            >
              <Card className="h-full overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                  <Link 
                    to={feature.link} 
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium"
                  >
                    Learn more
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 px-4 md:px-6 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-900">
        <motion.div
          className="container max-w-5xl mx-auto text-center space-y-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Explore Climate Insights?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Start exploring our interactive dashboard and discover the power of data-driven climate analytics.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="gap-1 h-12 px-6">
              Get Started
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

const features = [
  {
    title: "Interactive Dashboard",
    description: "Explore global climate data through interactive visualizations. Filter by region, time period, and climate variables.",
    icon: <BarChart2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
    link: "/dashboard",
  },
  {
    title: "Predictive Models",
    description: "Access machine learning models trained on historical climate data to predict future trends and anomalies.",
    icon: <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
    link: "/predictions",
  },
  {
    title: "Impact Analysis",
    description: "Understand the potential impact of climate change on different regions and ecosystems through detailed insights.",
    icon: <Leaf className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
    link: "/insights",
  },
];

export default Home;
