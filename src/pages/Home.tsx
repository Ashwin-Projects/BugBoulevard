import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, Zap, Trophy, Users } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Race against time to fix bugs in real-time coding challenges"
    },
    {
      icon: Users,
      title: "Multiplayer Arena",
      description: "Compete with developers worldwide in intense coding battles"
    },
    {
      icon: Trophy,
      title: "Ranked Leaderboard",
      description: "Climb the ranks and prove your debugging supremacy"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-game-bg-primary via-game-bg-secondary to-game-accent-primary opacity-90" />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-glow-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow-secondary/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative container mx-auto px-6 py-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-gaming font-black mb-6 text-glow-intense">
                BUG
                <span className="block text-primary">BOULEVARD</span>
              </h1>
              
              <p className="text-xl md:text-2xl font-body text-muted-foreground mb-12 leading-relaxed">
                The ultimate competitive coding platform where speed meets precision.
                <br />
                Debug faster, code smarter, dominate the leaderboard.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link to="/lobby">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-arena group"
                  >
                    <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                    Enter Arena
                  </motion.button>
                </Link>
                
                <Link to="/leaderboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary-gaming px-8 py-4 rounded-lg flex items-center"
                  >
                    <Trophy className="w-5 h-5 mr-3" />
                    View Rankings
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-gaming font-bold mb-6 text-glow">
              Master the Art of Debugging
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience coding challenges like never before in our high-octane debugging arena
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="card-gaming p-8 text-center group"
                >
                  <div className="relative mb-6 inline-block">
                    <Icon className="w-12 h-12 text-primary group-hover:text-glow-primary transition-colors duration-300" />
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-glow-primary/40 transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-gaming font-bold mb-4 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-game-accent-primary/20 via-transparent to-game-accent-secondary/20" />
        <div className="container mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-gaming font-bold mb-8 text-glow">
              Ready to Race?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Join thousands of developers in the most intense coding competition platform
            </p>
            <Link to="/lobby">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-arena text-xl px-12 py-6"
              >
                Start Racing Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;