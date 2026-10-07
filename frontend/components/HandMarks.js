export function HandCircle({ color = "#3a3a3a" }) {
  return (
    <svg className="hand-mark" viewBox="0 0 36 36" aria-hidden="true">
      <path
        d="M7.2 16.8c-1.1-6.4 8.6-12.2 16.4-9.4 6.2 2.2 8.8 10.1 5.4 15.4-3.8 6.1-15.2 7.6-19.2 2.1-1.8-2.5-1.9-5.3-2.6-8.1"
        fill="none"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HandTick() {
  return (
    <svg className="hand-mark" viewBox="0 0 36 36" aria-hidden="true">
      <path
        d="M6.8 18.2c.2-7.1 9.4-12.6 16.7-9.1 5.8 2.7 7.6 11.2 3.6 16.1-4.2 5.2-14.8 6.2-18.7 1-1.4-1.9-1.6-4.6-1.6-8"
        fill="none"
        stroke="#c1121f"
        strokeWidth="1.55"
        strokeLinecap="round"
      />
      <path
        d="M11.2 18.4c1.8 1.8 3.6 4.4 5.1 6.3 4.4-6.6 8.1-10.7 12.4-16.2"
        fill="none"
        stroke="#c1121f"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
