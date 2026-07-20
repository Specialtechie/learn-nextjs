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
  const [selectedDay, setSelectedDay] = useState("");
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
              style={{ width: 300, height: 300 }}
            />
          )}

          {bunnyState === "cry" && (
            <Lottie
              animationData={bunnyCry}
              loop
              style={{ width: 300, height: 300 }}
            />
          )}

          {bunnyState === "yes" && (
            <Lottie
              animationData={bunnyYes}
              loop
              style={{ width: 400, height: 400 }}
            />
          )}

          {bunnyState === "punch" && (
            <Lottie
              animationData={bunnyPunch}
              loop
              style={{ width: 300, height: 300 }}
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
          I can't wait for our first date 🥰
        </p>
      </div>
    )}

      {step === 5 && (
  <div className="home-container">

    <Lottie
      animationData={bunnyYes}
      height={300}
      width={300}
    />

    <div className="title">
      Yay!! ❤️
    </div>

    <h2>Which day works best for you?</h2>

    <div className="day-grid">

      {[
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ].map((day) => (
        <button
          key={day}
          className={selectedDay === day ? "selected" : ""}
          onClick={() => setSelectedDay(day)}
        >
          {day}
        </button>
      ))}

    </div>

    <button
      disabled={!selectedDay}
      onClick={() => setStep(6)}
    >
      Continue →
    </button>

  </div>
  )}

    {step === 6 && (
  <div className="home-container">

    <h1 className="title">
      What's your ideal date?
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
        📅 Day: <strong>{selectedDay}</strong>
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
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color:#feeafb;
  .home-container{
    display: flex;
    flex-direction:column;
    gap:3rem;
    align-items: center;
    justify-content: center;
    .title{
      font-size: 2rem;
      color:#5caff3;
      font-family: comic sans ms;
    }
  }
  .day-grid{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:15px;
    margin:20px 0;
    }

.date-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
  gap:20px;
  width:900px;
  max-width:90vw;
}

.date-card{
  background:white;
  border-radius:18px;
  padding:20px;
  cursor:pointer;
  transition:.3s;
  border:3px solid transparent;
}

.date-card:hover{
  transform:translateY(-6px);
}

.date-card.active{
  border-color:#ff4fa0;
  background:#fff0f7;
}

.selected{
  background:#ff4fa0;
  color:white;
}

.emoji{
  font-size:3rem;
}
  .buttons{
    display: flex;
    gap: 2rem;
  }
`;

export default Home;
