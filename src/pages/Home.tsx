
import { motion } from "framer-motion";
import { ArrowRight, BarChart2, Globe, ArrowUpRight, Droplets, CloudRain, Wind, Thermometer } from "lucide-react";
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
      <section className="w-full pt-32 pb-20 px-4 md:px-6 flex flex-col items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-transparent"></div>
        </div>
        
        <motion.div
          className="container max-w-4xl text-center space-y-6 relative z-10"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
          custom={0}
        >
          <motion.div
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-purple-800 bg-purple-900/30 text-purple-300 text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <span className="flex items-center gap-1.5">
              <Droplets className="h-3.5 w-3.5" />
              Ocean-Climate Data Analytics
            </span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Discover Ocean <span className="text-gradient">Climate Insights</span> with Advanced Analytics
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            Explore oceanic patterns, predict climate trends, and discover actionable insights through advanced machine learning models and intuitive visualizations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/dashboard">
              <Button size="lg" className="gap-1 h-12 px-6 bg-purple-600 hover:bg-purple-700">
                Explore Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/insights">
              <Button variant="outline" size="lg" className="gap-1 h-12 px-6 border-purple-500 text-purple-300 hover:bg-purple-900/50">
                View Insights
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Ocean Visualization */}
        <motion.div
          className="relative w-full max-w-3xl h-[300px] mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[300px] h-[300px] animate-float">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-500/20 animate-pulse-slow" />
              <div className="absolute inset-0 flex items-center justify-center">
                <CloudRain className="h-40 w-40 text-cyan-400" strokeWidth={0.5} />
              </div>
              
              {/* Data points */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-cyan-400/80"
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
          
          {/* Wave animation */}
          <div className="absolute bottom-0 left-0 right-0">
            <div className="wave h-12 w-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container py-20 px-4 md:px-6 bg-slate-950">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ocean Climate Analytics
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
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
              <Card className="h-full overflow-hidden border border-slate-800 bg-slate-900">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-purple-900/30 flex items-center justify-center mb-4 text-purple-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-slate-300 mb-4">{feature.description}</p>
                  <Link 
                    to={feature.link} 
                    className="inline-flex items-center text-cyan-400 text-sm font-medium"
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
      <section className="w-full py-20 px-4 md:px-6 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 relative">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2700&q=80')] bg-cover bg-center"></div>
        </div>
        <motion.div
          className="container max-w-5xl mx-auto text-center space-y-8 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Explore Ocean Climate Insights?
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Start exploring our interactive dashboard and discover the power of data-driven climate analytics.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="gap-1 h-12 px-6 bg-purple-600 hover:bg-purple-700">
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
    title: "Ocean Temperature Analysis",
    description: "Explore sea surface temperature data through interactive visualizations. Track temperature anomalies and monitor thermal trends.",
    icon: <Thermometer className="h-6 w-6" />,
    link: "/dashboard",
  },
  {
    title: "Climate Prediction Models",
    description: "Access machine learning models trained on historical ocean climate data to predict future trends and anomalies.",
    icon: <Wind className="h-6 w-6" />,
    link: "/predictions",
  },
  {
    title: "Marine Ecosystem Insights",
    description: "Understand the impact of changing ocean conditions on marine ecosystems through detailed environmental insights.",
    icon: <CloudRain className="h-6 w-6" />,
    link: "/insights",
  },
];

export default Home;
