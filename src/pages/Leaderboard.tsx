import { motion } from "framer-motion";
import { Trophy, Medal, Crown, Zap, Calendar, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import { getJson } from "@/lib/api";

const Leaderboard = () => {
  const { data } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => getJson<{ items: { id: string; username: string; points: number }[] }>("/api/leaderboard"),
  });

  const items = data?.items ?? [];

  // Function to determine tier based on score
  const getTierFromScore = (score: number) => {
    if (score >= 1000) return "Legendary";
    if (score >= 750) return "Diamond";
    if (score >= 500) return "Platinum";
    if (score >= 250) return "Gold";
    if (score >= 100) return "Silver";
    if (score >= 50) return "Bronze";
    return "Rookie"; // All new users start as Rookie
  };

  // Get all scores for ranking comparison
  const allScores = items.map(it => it.points);
  
  // Helper function to get actual rank based on score
  const getActualRank = (score: number) => {
    const playersWithHigherScores = allScores.filter(s => s > score).length;
    return playersWithHigherScores + 1;
  };
  
  // derive display structure from API items (top 3 and rest)
  const topPlayers = items.slice(0, 3).map((it, idx) => ({
    rank: getActualRank(it.points),
    name: it.username,
    score: it.points,
    avatar: "🏆",
    winRate: 0,
    streak: 0,
    tier: getTierFromScore(it.points),
    totalGames: 0,
  }));

  const allPlayers = items.map((it, idx) => ({
    rank: getActualRank(it.points),
    name: it.username,
    score: it.points,
    avatar: "🏆",
    winRate: 0,
    streak: 0,
    tier: getTierFromScore(it.points),
    totalGames: 0,
  }));

  const getRankIcon = (rank: number, score: number, allScores: number[]) => {
    // Count how many players have higher scores
    const playersWithHigherScores = allScores.filter(s => s > score).length;
    const actualRank = playersWithHigherScores + 1;
    
    if (actualRank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (actualRank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (actualRank === 3) return <Medal className="w-6 h-6 text-orange-400" />;
    return <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">#{actualRank}</span>;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Legendary": return "text-purple-400 bg-purple-400/10 border-purple-400/30";
      case "Diamond": return "text-cyan-400 bg-cyan-400/10 border-cyan-400/30";
      case "Platinum": return "text-gray-300 bg-gray-300/10 border-gray-300/30";
      case "Gold": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
      case "Silver": return "text-gray-400 bg-gray-400/10 border-gray-400/30";
      case "Bronze": return "text-orange-400 bg-orange-400/10 border-orange-400/30";
      case "Rookie": return "text-green-400 bg-green-400/10 border-green-400/30";
      default: return "text-muted-foreground bg-muted/10 border-muted/30";
    }
  };

  const getRankCardClass = (rank: number, score: number, allScores: number[]) => {
    // Count how many players have higher scores
    const playersWithHigherScores = allScores.filter(s => s > score).length;
    const actualRank = playersWithHigherScores + 1;
    
    if (actualRank === 1) return "rank-gold scale-105";
    if (actualRank === 2) return "rank-silver";
    if (actualRank === 3) return "rank-bronze";
    return "";
  };

  return (
    <div className="min-h-screen pt-20 px-6">
      <div className="container mx-auto py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-gaming font-bold mb-4 text-glow">
            Hall of Champions
          </h1>
          <p className="text-lg text-muted-foreground">
            The ultimate ranking of debugging masters across the realm
          </p>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto"
        >
          {topPlayers.map((player, index) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`card-gaming p-6 text-center relative ${getRankCardClass(player.rank, player.score, allScores)} ${
                player.rank === 1 ? 'order-2 md:order-2' : 
                player.rank === 2 ? 'order-1 md:order-1' : 
                'order-3 md:order-3'
              }`}
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                {getRankIcon(player.rank, player.score, allScores)}
              </div>
              
              <div className="mt-4 mb-4">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-3xl mb-3">
                  {player.avatar}
                </div>
                <h3 className="font-gaming font-bold text-lg text-foreground mb-2">
                  {player.name}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getTierColor(player.tier)}`}>
                  {player.tier}
                </span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Score:</span>
                  <span className="font-bold text-primary">{player.score.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Win Rate:</span>
                  <span className="font-bold text-green-400">{player.winRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Streak:</span>
                  <span className="font-bold text-orange-400">{player.streak}</span>
                </div>
              </div>
            </motion.div>
            ))}
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="card-gaming p-6 text-center">
            <Trophy className="w-8 h-8 text-primary mx-auto mb-3" />
            <div className="text-2xl font-gaming font-bold text-foreground">{items.length}</div>
            <div className="text-sm text-muted-foreground">Players Ranked</div>
          </Card>
          
          <Card className="card-gaming p-6 text-center">
            <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-2xl font-gaming font-bold text-foreground">—</div>
            <div className="text-sm text-muted-foreground">Bugs Fixed</div>
          </Card>
          
          <Card className="card-gaming p-6 text-center">
            <Calendar className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-2xl font-gaming font-bold text-foreground">—</div>
            <div className="text-sm text-muted-foreground">Matches Today</div>
          </Card>
          
          <Card className="card-gaming p-6 text-center">
            <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-2xl font-gaming font-bold text-foreground">—</div>
            <div className="text-sm text-muted-foreground">Avg. Fix Time</div>
          </Card>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-gaming font-bold text-foreground">
              Global Rankings
            </h2>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">Weekly</Button>
              <Button variant="outline" size="sm">Monthly</Button>
              <Button className="btn-secondary-gaming" size="sm">All Time</Button>
            </div>
          </div>

          <Card className="card-gaming overflow-hidden">
            <div className="space-y-2">
              {allPlayers.map((player, index) => (
                <motion.div
                  key={player.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  className={`flex items-center gap-4 p-4 hover:bg-accent/10 transition-colors ${
                    index < 3 ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 flex justify-center">
                      {getRankIcon(player.rank, player.score, allScores)}
                    </div>
                    
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-xl">
                      {player.avatar}
                    </div>
                    
                    <div>
                      <div className="font-gaming font-bold text-foreground">
                        {player.name}
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold border ${getTierColor(player.tier)}`}>
                        {player.tier}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-8 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-primary">{player.score.toLocaleString()}</div>
                      <div className="text-muted-foreground text-xs">Score</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-bold text-green-400">{player.winRate}%</div>
                      <div className="text-muted-foreground text-xs">Win Rate</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-bold text-orange-400">{player.streak}</div>
                      <div className="text-muted-foreground text-xs">Streak</div>
                    </div>
                    
                    <div className="text-center">
                      <div className="font-bold text-accent">{player.totalGames}</div>
                      <div className="text-muted-foreground text-xs">Games</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;