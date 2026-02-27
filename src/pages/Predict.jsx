import React from "react";
import PredictionForm from "../components/PredictionForm";
import { motion } from "framer-motion";

export default function Predict() {
  return (
    <div style={{ position: "relative", overflow: "hidden", minHeight: "90vh", padding: "2rem 0" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <PredictionForm />
      </motion.div>
    </div>
  );
}
