import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Clock, Play, Settings, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CreateRoomDialog from "@/components/CreateRoomDialog";

import { useQuery } from "@tanstack/react-query";
import { getJson } from "@/lib/api";

const Lobby = () => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [createdRooms, setCreatedRooms] = useState<Array<{
    id: string;
    name: string;
    mode: string;
    maxPlayers: number;
    timeLimit: number;
    players: number;
    playerNames: string[];
    status?: 'waiting' | 'in-progress' | 'completed';
    completedAt?: string;
  }>>([{
    id: 'demo-js',
    name: 'JavaScript Challenge',
    mode: 'JavaScript Bug Hunt',
    maxPlayers: 4,
    timeLimit: 15,
    players: 3,
    playerNames: ['CodeNinja', 'DebugMaster', 'JSWizard'],
    status: 'waiting'
  }, {
    id: 'demo-python',
    name: 'Python Challenge',
    mode: 'Python Debug Challenge',
    maxPlayers: 3,
    timeLimit: 20,
    players: 2,
    playerNames: ['PythonPro', 'DataWiz'],
    status: 'in-progress'
  }, {
    id: 'demo-react',
    name: 'React Challenge',
    mode: 'React Component Fix',
    maxPlayers: 2,
    timeLimit: 10,
    players: 1,
    playerNames: ['ReactFan'],
    status: 'waiting'
  }]);

  const [completedModes, setCompletedModes] = useState<string[]>([]);

  useEffect(() => {
    const modes = JSON.parse(localStorage.getItem('completedModes') || '[]');
    setCompletedModes(modes);
  }, []);

  useEffect(() => {
    if (completedModes.length > 0) {
      setCreatedRooms(prev => 
        prev.map(room => ({
          ...room,
          status: completedModes.includes(room.mode) ? 'completed' : room.status
        }))
      );
    }
  }, [completedModes]);
  
  const { data, isError } = useQuery({
    queryKey: ["lobbies"],
    queryFn: () => getJson<{ lobbies: { id: string; mode: string; players: number; maxPlayers: number; playerNames: string[]; name?: string; status?: 'waiting' | 'in-progress' | 'completed' }[] }>("/api/lobby"),
  });
  const gameRooms = [...(data?.lobbies ?? []), ...createdRooms];

  const startMatchmaking = () => {
    setCountdown(5);
  };

  const handleCreateRoom = (roomData: {
    name: string;
    mode: string;
    maxPlayers: number;
    timeLimit: number;
  }) => {
    const newRoom = {
      id: `room_${Date.now()}`,
      name: roomData.name,
      mode: roomData.mode,
      maxPlayers: roomData.maxPlayers,
      timeLimit: roomData.timeLimit,
      players: 1,
      playerNames: ["You"],
      status: 'waiting' as const,
    };
    setCreatedRooms(prev => [...prev, newRoom]);
  };

  const getModeSlug = (mode: string) => {
    return mode.toLowerCase().replace(/[^a-z0-9]/g, '-');
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      // Navigate to game room
      window.location.href = "/game";
    }
  }, [countdown]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-400 border-green-400/30 bg-green-400/10";
      case "Medium": return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
      case "Hard": return "text-orange-400 border-orange-400/30 bg-orange-400/10";
      case "Expert": return "text-red-400 border-red-400/30 bg-red-400/10";
      default: return "text-gray-400 border-gray-400/30 bg-gray-400/10";
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting": return "text-blue-400 border-blue-400/30 bg-blue-400/10";
      case "in-progress": return "text-yellow-400 border-yellow-400/30 bg-yellow-400/10";
      case "completed": return "text-green-400 border-green-400/30 bg-green-400/10";
      default: return "text-gray-400 border-gray-400/30 bg-gray-400/10";
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case "waiting": return "Waiting";
      case "in-progress": return "In Progress";
      case "completed": return "✅ Completed";
      default: return "Unknown";
    }
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
            Battle Arena Lobby
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose your battleground and prepare for coding warfare
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-8">
          {/* Game Rooms */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-gaming font-bold text-foreground">
                Active Rooms
              </h2>
              <Button 
                className="btn-secondary-gaming"
                onClick={() => setShowCreateRoom(true)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Create Room
              </Button>
            </div>

            {isError && (
              <div className="mb-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg text-center">
                Failed to load live lobbies. Showing demo rooms only.
              </div>
            )}

            <div className="space-y-4">
              {gameRooms.map((room) => {
                const effectiveStatus = completedModes.includes(room.mode) ? 'completed' : room.status || 'waiting';
                return (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className="card-gaming p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-xl font-gaming font-bold text-foreground">
                            {room.name || room.mode}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(effectiveStatus)}`}>
                            {getStatusText(effectiveStatus)}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{room.players}/{room.maxPlayers} Players</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>—</span>
                          </div>
                        </div>
                      </div>

                      {effectiveStatus === 'completed' ? (
                        <Button disabled className="opacity-50 px-6 py-3">
                          <Crown className="w-4 h-4 mr-2" />
                          Completed
                        </Button>
                      ) : effectiveStatus === 'in-progress' ? (
                        <Link to={`/game/${getModeSlug(room.mode)}`}>
                          <Button className="btn-gaming px-6 py-3">
                            <Play className="w-4 h-4 mr-2" />
                            Spectate
                          </Button>
                        </Link>
                      ) : (
                        <Link to={`/game/${getModeSlug(room.mode)}`}>
                          <Button className="btn-gaming px-6 py-3">
                            <Play className="w-4 h-4 mr-2" />
                            Join Battle
                          </Button>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Quick Match */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8"
            >
              <Card className="card-gaming p-8 text-center">
                <h3 className="text-2xl font-gaming font-bold mb-4 text-glow">
                  Quick Match
                </h3>
                <p className="text-muted-foreground mb-6">
                  Jump into an instant match with players of similar skill level
                </p>
                
                {countdown ? (
                  <div className="space-y-4">
                    <motion.div
                      key={countdown}
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-6xl font-gaming font-black text-glow-intense"
                    >
                      {countdown}
                    </motion.div>
                    <p className="text-primary">Matching you with opponents...</p>
                  </div>
                ) : (
                  <Button 
                    onClick={startMatchmaking}
                    className="btn-arena text-xl px-12 py-6"
                  >
                    Find Match
                  </Button>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <CreateRoomDialog
        isOpen={showCreateRoom}
        onClose={() => setShowCreateRoom(false)}
        onCreateRoom={handleCreateRoom}
      />
    </div>
  );
};

export default Lobby;
