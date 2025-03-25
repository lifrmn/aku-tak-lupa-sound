// LyricsDisplay.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import AudioPlayer from "./AudioPlayer";
import backgroundImage from "../public/whatsapp-bg.jpg";

const lyrics = [
  { text: "Aku dah lupa tak ingat lagi", emoji: "💬", time: 1000 },
  { text: "Nama kau pun hilang dari hati", emoji: "❤️", time: 3000 },
  { text: "Aku move on hidup sendiri", emoji: "😊", time: 5000 },
  { text: "Tak perlu kau aku happy", emoji: "🎉", time: 7000 },
  { text: "Aku dah lupa tak ingat lagi", emoji: "💬", time: 9000 },
  { text: "Nama kau pun hilang dari hati", emoji: "💔", time: 11000 },
  { text: "Aku move on hidup sendiri", emoji: "😎", time: 13000 },
  { text: "Tak perlu kau aku happy", emoji: "🥳", time: 15000 },
];

export default function LyricsDisplay({ audioRef }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!audioRef.current) return;

    const updateLyrics = () => {
      const currentTime = audioRef.current.currentTime * 1000;
      const lineIndex = lyrics.findIndex(lyric => currentTime < lyric.time);
      if (lineIndex !== -1 && lineIndex !== currentLine) {
        setDisplayedText(lyrics[lineIndex].text);
        setCurrentLine(lineIndex);
      }
    };

    const interval = setInterval(updateLyrics, 500);
    return () => clearInterval(interval);
  }, [audioRef, currentLine]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-4"
      >
        <Card className="bg-gray-800 p-4 mb-4 w-full rounded-2xl shadow-xl border border-gray-600">
          <CardContent className="text-lg font-semibold flex items-center gap-2 text-green-300 bg-gray-700 px-4 py-2 rounded-lg">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {lyrics[currentLine]?.emoji} {displayedText}
            </motion.span>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// AudioPlayer.jsx
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import LyricsDisplay from "./LyricsDisplay";

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const playSong = () => {
    if (!audioRef.current) return;
    setPlaying(true);
    audioRef.current.play();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <audio ref={audioRef} src="/audio.mp4" />
      <LyricsDisplay audioRef={audioRef} />
      {!playing && (
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={playSong}
            className="bg-green-500 text-white px-6 py-3 rounded-full mt-6 flex items-center gap-2 shadow-lg hover:bg-green-600 transition"
          >
            <Play size={20} /> Play
          </Button>
        </motion.div>
      )}
    </div>
  );
}
