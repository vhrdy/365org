module.exports = {
    theme: {
      extend: {
        keyframes: {
            "marquee-move-text": {
              from: {
                transform: "translateX(0)",
              },
              to: {
                transform: "translateX(-50%)",
              },
            },
          },
          animation: {
            "marquee-move": "marquee-move-text var(--speed, 30s) linear infinite var(--direction, forwards)",
          },
      },
    },
  };