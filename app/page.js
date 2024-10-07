"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { Howl } from "howler";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Particles } from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Parallax } from "react-parallax";
import dayjs from "dayjs";
import birthdayCakeAnimation from "./assets/lilin.json";
import balloonsAnimation from "./assets/balloons.json";
import confettiAnimation from "./assets/conffeti.json";
import fireworksAnimation from "./assets/fireworks.json";
import { particlesConfig } from "./particlesConfig";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material"; // Import Dialog

const styles = {
  pageContainer: {
    display: "flex",
    top: 0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "200vh",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    position: "relative",
  },
  customCursor: {
    position: "absolute",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
    zIndex: 1000,
  },
  title: {
    fontSize: "4rem",
    color: "#fff",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    "@media (maxWidth: 768px)": {
      fontSize: "2.5rem",
    },
    "@media (maxWidth: 480px)": {
      fontSize: "2rem",
    },
  },
  body: {
    fontSize: "2rem",
    color: "#fff",
    marginBottom: "20px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
    "@media (maxWidth: 768px)": {
      fontSize: "1.5rem",
    },
    "@media (maxWidth: 480px)": {
      fontSize: "1.2rem",
    },
  },
  countdown: {
    fontSize: "1.5rem",
    color: "#fff",
    marginBottom: "20px",
    textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
    "@media (maxWidth: 768px)": {
      fontSize: "1.2rem",
    },
    "@media (maxWidth: 480px)": {
      fontSize: "1rem",
    },
  },
  lottieContainer: {
    width: "300px",
    height: "300px",
    marginBottom: "500px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    "@media (maxWidth: 768px)": {
      width: "200px",
      height: "200px",
    },
    "@media (maxWidth: 480px)": {
      width: "150px",
      height: "150px",
    },
  },
  lottieLarge: {
    "@media (maxWidth: 768px)": {
      width: "50%",
      height: "50%",
    },
    "@media (maxWidth: 480px)": {
      width: "50%",
      height: "50%",
    },
  },
  balloonAnimationContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
    pointerEvents: "none",
  },
  button: {
    padding: "15px 30px",
    fontSize: "1.5rem",
    color: "#fff",
    backgroundColor: "#ff66b3",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
    transition: "background-color 0.3s, transform 0.3s",
    "@media (maxWidth: 768px)": {
      fontSize: "1.2rem",
      padding: "10px 20px",
    },
    "@media (maxWidth: 480px)": {
      fontSize: "1rem",
      padding: "8px 16px",
    },
  },
  canvasContainer: {
    width: "100%",
    height: "500px",
    "@media (maxWidth: 768px)": {
      height: "400px",
    },
    "@media (maxWidth: 480px)": {
      height: "300px",
    },
  },
  confettiContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: -1,
  },
  fireworksContainer: {
    position: "fixed",
    top: "20%",
    left: "50%",
    width: "60vw",
    height: "60vh",
    pointerEvents: "none",
    transform: "translateX(-50%)",
    zIndex: -1,
    "@media (maxWidth: 768px)": {
      width: "80vw",
      height: "50vh",
    },
    "@media (maxWidth: 480px)": {
      width: "90vw",
      height: "40vh",
    },
  },
  particles: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  parallaxContainer: {
    width: "100%",
    marginBottom: "10px",
    "@media (maxWidth: 768px)": {
      width: "50%",
      height: "20px",
    },
    "@media (maxWidth: 480px)": {
      width: "40%",
      height: "20px",
    },
  },
};

export default function Home() {
  const [theme, setTheme] = useState("day");
  const [isBirthday, setIsBirthday] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [cursorStyle, setCursorStyle] = useState({ top: 0, left: 0 });
  const [openModal, setOpenModal] = useState(false); // State untuk modal

  const targetDate = dayjs("2024-10-08"); // Adjust birthday date

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const diff = targetDate.diff(now);
      if (diff <= 0) {
        setIsBirthday(true);
        setCountdown("🎉 It's your Birthday! 🎉");
      } else {
        const days = targetDate.diff(now, "day");
        const hours = targetDate.diff(now, "hour") % 24;
        const minutes = targetDate.diff(now, "minute") % 60;
        const seconds = targetDate.diff(now, "second") % 60;
        setCountdown(
          `${days}d ${hours}h ${minutes}m ${seconds}s until your birthday!`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    const hour = new Date().getHours();
    setTheme(hour >= 6 && hour < 18 ? "day" : "night");
  }, []);

  const handleCursorMove = (e) => {
    setCursorStyle({ top: e.clientY, left: e.clientX });
  };

  const sound = new Howl({
    src: ["/happy-birthday.mp3"],
    autoplay: false,
    loop: false,
    volume: 1.0,
  });

  const handleButtonClick = () => {
    sound.play();
    setOpenModal(true); // Membuka modal
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Menutup modal
  };

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        ...styles.pageContainer,
        background:
          theme === "day"
            ? "linear-gradient(135deg, #FFDEE9, #B5FFFC)"
            : "linear-gradient(135deg, #0F2027, #203A43, #2C5364)",
      }}
      onMouseMove={handleCursorMove}
    >
      {/* Custom Cursor */}
      <div
        className="custom-cursor"
        style={{
          ...styles.customCursor,
          top: cursorStyle.top,
          left: cursorStyle.left,
        }}
      />

      {/* Parallax Section */}
      <Parallax
        strength={300}
        bgImage={theme === "day" ? "/day-theme-bg.jpg" : "/night-theme-bg.jpg"}
        style={styles.parallaxContainer}
      >
        <div style={{ height: 500 }}>
          <motion.h1 style={styles.title}>Happy Birthday</motion.h1>
          <motion.h1 style={styles.body}>- Denada Putri -</motion.h1>
          <motion.p style={styles.countdown}>{countdown}</motion.p>
        </div>
      </Parallax>

      {/* Particle Effect */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          ...particlesConfig,
          background: {
            color: {
              value: theme === "day" ? "#FFDEE9" : "#0F2027",
            },
          },
        }}
        loaded={particlesLoaded}
        style={styles.particles}
      />

      {/* Birthday Cake Animation */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={styles.lottieContainer}
      >
        <Player
          autoplay
          loop
          src={birthdayCakeAnimation}
          style={styles.lottieLarge}
        />
      </motion.div>

      {/* Balloons covering the entire screen */}
      <motion.div style={styles.balloonAnimationContainer}>
        <Player
          autoplay
          loop
          src={balloonsAnimation}
          style={{ width: "100%", height: "100%" }}
        />
      </motion.div>

      {/* Interactive Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={styles.button}
        onClick={handleButtonClick}
      >
        Make a Wish 🎁
      </motion.button>

      {/* 3D Element: Rotating Stars */}
      <motion.div style={styles.canvasContainer}>
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Stars radius={100} depth={50} count={5000} factor={4} fade />
          <OrbitControls />
        </Canvas>
      </motion.div>

      {/* Confetti */}
      {isBirthday && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={styles.confettiContainer}
        >
          <Player
            autoplay
            loop
            src={confettiAnimation}
            style={styles.lottieConfetti}
          />
        </motion.div>
      )}

      {/* Fireworks */}
      {isBirthday && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={styles.fireworksContainer}
        >
          <Player
            autoplay
            loop
            src={fireworksAnimation}
            style={styles.lottieFireworks}
          />
        </motion.div>
      )}

      {/* Modal for making a wish */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>🎉 Make a Wish 🎉</DialogTitle>
        <DialogContent>
          <p>Wishing you a day filled with happiness!</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}
