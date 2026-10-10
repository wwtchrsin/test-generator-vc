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

export function HandDoubleCircle() {
  return (
    <svg className="hand-mark" viewBox="0 30 200 190" aria-hidden="true">
      <path d="M100,35 
          C155,35 195,80 195,130 
          C195,180 155,215 100,215 
          C45,215 5,180 5,130 
          C5,80 45,35 100,35 Z" 
        fill="none" stroke="#c1121f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>

      <path d="M104,39 
          C151,39 187,76 187,126 
          C187,176 151,207 104,207 
          C57,207 13,176 13,126 
          C13,76 57,39 104,39 Z" 
        fill="none" stroke="#c1121f" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
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

export function HandCross() {
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
        d="M12.5 12.8c2.1 2.4 4.5 5.1 6.2 7.8 1.8 2.8 3.1 4.6 3.8 6.2"
        fill="none"
        stroke="#c1121f"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.8 12.3c-2.3 2.6-4.9 5.3-7.1 8.1-1.9 2.4-3.2 4.2-4.4 6.3"
        fill="none"
        stroke="#c1121f"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
