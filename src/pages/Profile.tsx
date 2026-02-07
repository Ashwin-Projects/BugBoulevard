import { motion } from "framer-motion";
import { Trophy, Target, Zap, Clock, TrendingUp, Calendar, Code, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); } catch { return null; }
  })();
  const userStats = storedUser ? {
    name: storedUser.username || "Player",
    avatar: "👤",
    rank: 0,
    tier: "",
    score: 0,
    winRate: 0,
    totalGames: 0,
    streak: 0,
    avgFixTime: "—",
    favoriteLanguage: "—",
    totalBugsFixed: 0,
    perfectGames: 0
  } : null;

  const recentMatches: any[] = [];
  const achievements: any[] = [];
  const skillProgress: any[] = [];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Legendary": return "text-purple-400 bg-purple-400/10 border-purple-400/30";
      case "Diamond": return "text-cyan-400 bg-cyan-400/10 border-cyan-400/30";
      case "Platinum": return "text-gray-300 bg-gray-300/10 border-gray-300/30";
      case "Gold": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "Silver": return "text-gray-400 bg-gray-400/10 border-gray-400/30";
      case "Bronze": return "text-orange-400 bg-orange-400/10 border-orange-400/30";
      default: return "text-muted-foreground bg-muted/10 border-muted/30";
    }
  };

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="container mx-auto py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {userStats ? (
            <>
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-6xl animate-pulse-glow">
                  {userStats.avatar}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-game-bg-secondary border-2 border-primary rounded-full px-3 py-1">
                  <span className="text-sm font-gaming font-bold text-primary">#{userStats.rank}</span>
                </div>
              </div>
              
              <h1 className="text-4xl font-gaming font-bold mb-2 text-glow">
                {userStats.name}
              </h1>
              <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getTierColor(userStats.tier)}`}>
                {userStats.tier || "Unranked"}
              </span>
            </>
          ) : (
            <div className="text-muted-foreground">You’re not logged in. Please use the Login page.</div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats Cards */}
          <div className="lg:col-span-2 space-y-8">
            {/* Performance Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-gaming font-bold mb-6 text-foreground">
                Performance Stats
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="card-gaming p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Trophy className="w-6 h-6 text-primary" />
                    <span className="font-gaming font-bold">Total Score</span>
                  </div>
                  <div className="text-3xl font-gaming font-black text-glow">
                    {userStats ? userStats.score.toLocaleString() : 0}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    —
                  </div>
                </Card>

                <Card className="card-gaming p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-6 h-6 text-green-400" />
                    <span className="font-gaming font-bold">Win Rate</span>
                  </div>
                  <div className="text-3xl font-gaming font-black text-green-400">
                    {userStats ? userStats.winRate : 0}%
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    {userStats ? userStats.totalGames : 0} total games
                  </div>
                </Card>

                <Card className="card-gaming p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    <span className="font-gaming font-bold">Current Streak</span>
                  </div>
                  <div className="text-3xl font-gaming font-black text-yellow-400">
                    {userStats ? userStats.streak : 0}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    games won in a row
                  </div>
                </Card>

                <Card className="card-gaming p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-6 h-6 text-blue-400" />
                    <span className="font-gaming font-bold">Avg Fix Time</span>
                  </div>
                  <div className="text-3xl font-gaming font-black text-blue-400">
                    {userStats ? userStats.avgFixTime : "—"}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">
                    per bug fixed
                  </div>
                </Card>
              </div>
            </motion.div>

            {/* Recent Matches */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-gaming font-bold mb-6 text-foreground">
                Recent Matches
              </h2>
              <Card className="card-gaming overflow-hidden">
                <div className="space-y-2">
                  {recentMatches.length === 0 ? (
                    <div className="p-6 text-sm text-muted-foreground">No recent matches yet.</div>
                  ) : (
                    recentMatches.map((match, index) => (
                      <motion.div
                        key={match.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-4 p-4 hover:bg-accent/10 transition-colors"
                      >
                        <div className={`w-3 h-3 rounded-full ${
                          match.result === 'win' ? 'bg-green-400' : 'bg-red-400'
                        }`} />
                        
                        <div className="flex-1">
                          <div className="font-gaming font-bold text-foreground">
                            {match.challenge}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {match.date}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-primary">
                            {match.score} pts
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {match.time}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Right Panel */}
          <div className="space-y-8">
            {/* Skill Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-xl font-gaming font-bold mb-6 text-foreground">
                Skill Progress
              </h2>
              <Card className="card-gaming p-6">
                <div className="space-y-4">
                  {skillProgress.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-gaming font-bold text-sm">{skill.skill}</span>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                          className={`h-2 rounded-full ${skill.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-gaming font-bold mb-6 text-foreground">
                Achievements
              </h2>
              <Card className="card-gaming p-6">
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        achievement.earned 
                          ? 'bg-primary/10 border-primary/30' 
                          : 'bg-muted/10 border-muted/20 opacity-60'
                      }`}
                    >
                      <div className="text-2xl">
                        {achievement.earned ? achievement.icon : '🔒'}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-sm text-foreground">
                          {achievement.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {achievement.description}
                        </div>
                      </div>
                      {achievement.earned && (
                        <Award className="w-4 h-4 text-primary" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Card className="card-gaming p-6 text-center">
                <h3 className="font-gaming font-bold mb-4 text-foreground">
                  Ready for Battle?
                </h3>
                <div className="space-y-3">
                  <Button className="btn-gaming w-full">
                    Find Quick Match
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Full Stats
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;