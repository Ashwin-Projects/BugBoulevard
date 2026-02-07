import { useState } from "react";
import { motion } from "framer-motion";
import { X, Users, Clock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateRoomDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRoom: (roomData: {
    name: string;
    mode: string;
    maxPlayers: number;
    timeLimit: number;
  }) => void;
}

const CreateRoomDialog = ({ isOpen, onClose, onCreateRoom }: CreateRoomDialogProps) => {
  const [roomName, setRoomName] = useState("");
  const [gameMode, setGameMode] = useState("JavaScript Bug Hunt");
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [timeLimit, setTimeLimit] = useState(15);

  const handleCreateRoom = () => {
    if (roomName.trim()) {
      onCreateRoom({
        name: roomName.trim(),
        mode: gameMode,
        maxPlayers,
        timeLimit,
      });
      setRoomName("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-md"
      >
        <Card className="card-gaming p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-gaming font-bold text-glow">
              Create Battle Room
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="roomName" className="text-sm font-semibold">
                Room Name
              </Label>
              <Input
                id="roomName"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name..."
                className="mt-1"
                maxLength={30}
              />
            </div>

            <div>
              <Label className="text-sm font-semibold">Game Mode</Label>
              <Select value={gameMode} onValueChange={setGameMode}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JavaScript Bug Hunt">JavaScript Bug Hunt</SelectItem>
                  <SelectItem value="Python Debug Challenge">Python Debug Challenge</SelectItem>
                  <SelectItem value="React Component Fix">React Component Fix</SelectItem>
                  <SelectItem value="Algorithm Race">Algorithm Race</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-semibold">Max Players</Label>
              <Select value={maxPlayers.toString()} onValueChange={(value) => setMaxPlayers(parseInt(value))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Players</SelectItem>
                  <SelectItem value="4">4 Players</SelectItem>
                  <SelectItem value="6">6 Players</SelectItem>
                  <SelectItem value="8">8 Players</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-semibold">Time Limit (minutes)</Label>
              <Select value={timeLimit.toString()} onValueChange={(value) => setTimeLimit(parseInt(value))}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateRoom}
                disabled={!roomName.trim()}
                className="btn-gaming flex-1"
              >
                <Settings className="w-4 h-4 mr-2" />
                Create Room
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default CreateRoomDialog;
