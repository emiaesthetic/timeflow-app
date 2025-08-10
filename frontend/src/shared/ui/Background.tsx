function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 800 600"
      >
        <defs>
          <radialGradient id="grad1" cx="30%" cy="40%" r="75%">
            <stop offset="0%" stopColor="var(--accent-3)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--accent-3)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="grad2" cx="70%" cy="45%" r="85%">
            <stop offset="0%" stopColor="var(--accent-1)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent-1)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="grad3" cx="50%" cy="75%" r="90%">
            <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
          </radialGradient>

          <filter
            id="blur"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="120" />
          </filter>
        </defs>

        <circle
          cx="240"
          cy="220"
          r="280"
          fill="url(#grad1)"
          filter="url(#blur)"
        />
        <circle
          cx="580"
          cy="260"
          r="320"
          fill="url(#grad2)"
          filter="url(#blur)"
        />
        <circle
          cx="460"
          cy="520"
          r="300"
          fill="url(#grad3)"
          filter="url(#blur)"
        />
      </svg>
    </div>
  );
}

export { Background };
