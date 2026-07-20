"use client";

import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import styled from "styled-components";
import bunnyCry from "./animations/bunnyCry.json";
import bunnyPlease from "./animations/bunnyPlease.json";
import bunnyYes from "./animations/bunnyYes.json";
import bunnyPunch from "./animations/bunnyPunch.json";
import Button from "./components/Button";


const getRandomPosition = () => {
  if (typeof window !== 'undefined') {
    return ({
      randomLeft: `${Math.random() * (window.innerWidth - 100)}px`,
      randomTop: `${Math.random() * (window.innerHeight - 50)}px`,
    })
  } else {
    return ({
      randomLeft: "0px",
      randomTop: "0px",
    })
  }
}

type CountdownProps = {
  onFinish: () => void;
  initialSeconds?: number;
};

function Countdown({ onFinish, initialSeconds = 3 }: CountdownProps) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      onFinish();
      return;
    }

    const timer = window.setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds, onFinish]);

  return (
    <div className="home-container">
      <div className="title">Get ready...</div>
      <div className="title" style={{ fontSize: "4rem" }}>{seconds}</div>
    </div>
  );
}

function Home() {

  const [bunnyState, setBunnyState] = useState("normal")
  const [hovered, setHovered] = useState(false);
  const [randomPosition, setRandomPosition] = useState(getRandomPosition());
  const [hasStarted, setHasStarted] = useState(false)
  const [step, setStep] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateType, setSelectedDateType] = useState("");

  const bunnyObj: { [key: number]: string } = { 0: "cry", 1: "punch" };
  const handleHover = (hoverState: boolean) => {
    setHasStarted(true)
    if (hoverState === true) {
      setRandomPosition(getRandomPosition());
      const randomBunnyState = Math.floor(Math.random() * 2);
      setBunnyState(bunnyObj[randomBunnyState] as string)
    }
    setHovered(hoverState);

  };

  const messages = [
  "Ever since I met you...",
  "You've made ordinary days feel special ❤️",
  "You always know how to make me smile 😊",
  "There's something I've wanted to ask..."
  ];

  const dates = [
  {
    title: "🍽️ Dinner",
    emoji: "🍽️",
    description: "A cozy dinner together"
  },
  {
    title: "☕ Coffee",
    emoji: "☕",
    description: "Coffee and long conversations"
  },
  {
    title: "🎬 Movie",
    emoji: "🎬",
    description: "Movie night"
  },
  {
    title: "🌳 Picnic",
    emoji: "🌳",
    description: "Relax in the park"
  },
  {
    title: "🎳 Bowling",
    emoji: "🎳",
    description: "A little competition"
  },
  {
    title: "🎨 Museum",
    emoji: "🎨",
    description: "Art gallery or museum"
  },
  {
    title: "🏖️ Beach",
    emoji: "🏖️",
    description: "Sunset walk"
  },
  {
    title: "🎡 Amusement Park",
    emoji: "🎡",
    description: "Ride everything!"
  }
]; 

  return (
    <StyledHome data-testid="container">
        {/* STEP 0 */}
    {step === 0 && (
      <div className="home-container">

      <Lottie
        animationData={bunnyPlease}
        loop
        style={{ width: 300, height: 300 }}
        />

        <div className="title">
          Hi Asake, Adeola Mi ❤️
        </div>

        <button onClick={() => setStep(1)}>
          Start
        </button>

      </div>
    )}

     {/* STEP 1 */}
    {step === 1 && (
      <div className="home-container">

        <Lottie
          animationData={bunnyPlease}
          loop
          style={{ width: 300, height: 300 }}
        />

        <div className="title">
          {messages[messageIndex]}
        </div>

        <button
          onClick={() => {
            if (messageIndex < messages.length - 1) {
              setMessageIndex(messageIndex + 1);
            } else {
              setStep(2);
            }
          }}
        >
          Continue
        </button>

      </div>
    )}

    {/* STEP 2 */}
    {step === 2 && (
      <Countdown onFinish={() => setStep(3)} />
    )}

     {/* STEP 3 - YOUR CURRENT CODE GOES HERE */}
    {step === 3 && (
      <div className="home-container">
        {bunnyState === "yes" ? <div className="title">Hasta la vista Baby  !!!!</div> : <div className="title">Will you go on a date with me?</div>}
        <div className="animation">
          {bunnyState === "normal" && (
            <Lottie
              animationData={bunnyPlease}
              loop
              style={{
              width: "100%",
              maxWidth: 320,
              height: "auto",
            }}
            />
          )}

          {bunnyState === "cry" && (
            <Lottie
              animationData={bunnyCry}
              loop
              style={{
              width: "100%",
              maxWidth: 320,
              height: "auto",
            }}
            />
          )}

          {bunnyState === "yes" && (
            <Lottie
              animationData={bunnyYes}
              loop
              style={{
              width: "100%",
              maxWidth: 400,
              height: "auto",
            }}
            />
          )}

          {bunnyState === "punch" && (
            <Lottie
              animationData={bunnyPunch}
              loop
              style={{
              width: "100%",
              maxWidth: 320,
              height: "auto",
            }}
            />
          )}
        </div>
        {bunnyState !== "yes" && <div className="buttons">
          <button onClick={() => {
            setBunnyState("yes");
            setStep(5);
          }} onMouseEnter={() => setBunnyState("normal")}>Yes</button>
          <Button
            $randomleft={randomPosition.randomLeft}
            $randomtop={randomPosition.randomTop}
            $hasstarted={hasStarted}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}

          >
            No
          </Button>
        </div>}
      </div>
    )}

        {/* STEP 4 */}
    {step === 4 && (
      <div className="home-container">
        <Lottie
          animationData={bunnyYes}
          height={400}
          width={400}
        />

        <div className="title">
          You just made me the happiest person alive ❤️
        </div>

        <p
          style={{
            color: "#5caff3",
            fontSize: "1.3rem",
            fontFamily: "Comic Sans MS",
          }}
        >
          I can&#39;t wait for our first date 🥰
        </p>
      </div>
    )}

      {step === 5 && (
  <div className="home-container">
    <div className="title">
      Yay!! ❤️
    </div>
    <Lottie
      animationData={bunnyYes}
      height={100}
      width={100}
    />

    <h2>Which day works best for you?</h2>

    <div style={{ width: "100%", maxWidth: "350px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "10px",
          fontWeight: "bold",
          color: "#5caff3",
          fontSize: "1.2rem",
        }}
      >
        Pick a date ❤️
      </label>

      <input
        type="date"
        value={selectedDate}
        min={new Date().toISOString().split("T")[0]}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="date-picker"
      />
    </div>

    <button
      disabled={!selectedDate}
      onClick={() => setStep(6)}
    >
      Continue →
    </button>

  </div>
  )}

    {step === 6 && (
  <div className="home-container">

    <h1 className="title">
      What is your ideal date?
    </h1>

    <div className="date-grid">

      {dates.map((item) => (

        <div
          key={item.title}
          className={`date-card ${
            selectedDateType === item.title ? "active" : ""
          }`}
          onClick={() => setSelectedDateType(item.title)}
        >

          <div className="emoji">
            {item.emoji}
          </div>

          <h3>{item.title}</h3>

          <p>{item.description}</p>

        </div>

      ))}

    </div>

    <button
      disabled={!selectedDateType}
      onClick={() => setStep(7)}
    >
      Continue
    </button>

  </div>
)}

{step === 7 && (
  <div className="home-container">

    <Lottie
      animationData={bunnyYes}
      loop
      style={{ width: 350, height: 350 }}
    />

    <div className="title">
      Perfect! ❤️
    </div>

    <h2>
      Our first date is looking amazing!
    </h2>

    <div className="summary">

      <p>
        📅 Date: <strong>Preferred Date:{" "}
            {selectedDate &&
              new Date(selectedDate).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}</strong>
      </p>

      <p>
        ❤️ Date Idea: <strong>{selectedDateType}</strong>
      </p>

    </div>

    <button
      onClick={() => alert("Can't wait 🥰")}
    >
      Finish
    </button>

  </div>
)}
      
    </StyledHome >
  );
}

const StyledHome = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #feeafb;
  padding: 2rem 1rem;
  overflow-y: auto;
  box-sizing: border-box;

  .home-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    max-width: 900px;
    width: 100%;
    margin: auto;
    text-align: center;
  }

  .title {
    font-size: 2rem;
    color: #5caff3;
    font-family: "Comic Sans MS", cursive;
    text-align: center;
    line-height: 1.4;
  }

  .animation {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .date-picker {
  width: 100%;
  padding: 14px;
  font-size: 1rem;
  border: 2px solid #ffb6d9;
  border-radius: 12px;
  background: white;
  outline: none;
  cursor: pointer;
}

.date-picker:focus {
  border-color: #ff4fa0;
}
  .day-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin: 20px 0;
    width: 100%;
  }

  .selected {
    background: #ff4fa0;
    color: white;
  }

  .date-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    width: 100%;
    max-width: 900px;
  }

  .date-card {
    background: white;
    border-radius: 18px;
    padding: 20px;
    cursor: pointer;
    transition: 0.3s;
    border: 3px solid transparent;
    text-align: center;
  }

  .date-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }

  .date-card.active {
    border-color: #ff4fa0;
    background: #fff0f7;
  }

  .emoji {
    font-size: 3rem;
    margin-bottom: 10px;
  }

  .buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
  }

  button {
    padding: 12px 24px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: 0.3s;
  }

  button:hover {
    transform: scale(1.05);
  }

  /* ---------- Tablet ---------- */
  @media (max-width: 768px) {
    .title {
      font-size: 1.6rem;
    }

    .day-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .date-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }

    .emoji {
      font-size: 2.5rem;
    }
  }

  /* ---------- Mobile ---------- */
  @media (max-width: 480px) {
    .title {
      font-size: 1.3rem;
      padding: 0 10px;
    }

    .day-grid {
      grid-template-columns: 1fr;
    }

    .date-grid {
      grid-template-columns: 1fr;
      gap: 15px;
    }

    .date-card {
      padding: 16px;
    }

    .emoji {
      font-size: 2.2rem;
    }

    .buttons {
      flex-direction: column;
      align-items: center;
    }

    button {
      width: 90%;
      max-width: 280px;
    }
  }
`;

export default Home;
