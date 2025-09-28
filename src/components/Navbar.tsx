import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Code2, Trophy, Users, User, Home, LogIn } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/lobby", label: "Lobby", icon: Users },
    { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
    { path: "/profile", label: "Profile", icon: User },
    { path: "/login", label: "Login", icon: LogIn },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-accent/30"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Code2 className="w-8 h-8 text-primary group-hover:text-glow-primary transition-colors" />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:bg-glow-primary/30 transition-all duration-300" />
            </div>
            <span className="text-xl font-gaming font-bold text-glow">
              BugBoulevard
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-lg font-body font-semibold tracking-wide transition-all duration-300 flex items-center space-x-2 ${
                    isActive(item.path)
                      ? "text-primary bg-primary/10 shadow-[0_0_15px_hsl(var(--glow-primary)/0.4)]"
                      : "text-muted-foreground hover:text-accent hover:bg-accent/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/30"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
