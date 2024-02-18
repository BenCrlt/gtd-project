"use client";

import { motion } from "framer-motion";
import { useMemo, useRef } from "react";
import Typography from "../typography";

export type Props = {
  value: string;
  onViewportEnter: () => void;
  onClick: () => void;
  placeOnViewport: number;
};

const OPACITY_BY_PLACE = [0.3, 0.3, 0.5, 1, 0.5, 0.3, 0.3];

export const TimeScrollAreaItem = ({
  value,
  onViewportEnter,
  onClick,
  placeOnViewport,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const opacity = useMemo(
    () => (placeOnViewport !== -1 ? OPACITY_BY_PLACE[placeOnViewport] : 0.3),
    [placeOnViewport]
  );

  return (
    <motion.div
      ref={ref}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className={
        "flex justify-center items-center cursor-pointer snap-center px-2"
      }
      onClick={() => {
        ref.current?.scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "start",
        });
        onClick();
      }}
      onViewportEnter={() => onViewportEnter()}
      style={{
        opacity,
      }}
    >
      <Typography variant="h2">{value}</Typography>
    </motion.div>
  );
};
