
"use client";

import { Music } from "@/config/data";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BsPause, BsPlay } from "react-icons/bs";
import {
  GiNextButton,
  GiPreviousButton,
  GiSoundOn,
} from "react-icons/gi";
import { LiaListAlt } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { DrawerDemo } from "./MusicList";
import { X } from "lucide-react";

type MusicItem = (typeof Music)[number];

type RootState = {
  musicReducer: {
    state: MusicItem | null;
  };
  listReducer: {
    state: MusicItem[] | null;
  };
};

const MusicPlayer = () => {
  const [Play, setPlay] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [PlayerFill, setPlayerFill] = useState(0);
  const [MusicTime, setMusicTime] = useState("0:00");

  const [Volume, setVolume] = useState(0.7);
  const [Muted, setMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const dispatch = useDispatch();

  const music = useSelector(
    (state: RootState) => state.musicReducer.state
  );

  const musicQueue = useSelector(
    (state: RootState) => state.listReducer.state
  );

  const activeQueue =
    Array.isArray(musicQueue) && musicQueue.length > 0
      ? musicQueue
      : Music;

  // Change music
  useEffect(() => {
    const audio = audioRef.current;

    setPlayerFill(0);
    setMusicTime("0:00");

    if (!music || !audio) return;

    audio.load();

    audio.play().catch((error) => {
      console.error("Audio playback error:", error);
      setPlay(false);
    });
  }, [music]);

  // Play / Pause
  const handlePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      console.error("Audio playback error:", error);
      setPlay(false);
    }
  };

  // Format audio time
  const change_time = (time: number) => {
    const min = Math.floor(time / 60);
    const second = Math.floor(time % 60);

    return `${min}:${second.toString().padStart(2, "0")}`;
  };

  // Update progress
  const updateTime = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.currentTarget;

    if (!audio.duration || !isFinite(audio.duration)) return;

    const progress = (audio.currentTime / audio.duration) * 100;

    setPlayerFill(progress);
    setMusicTime(change_time(audio.currentTime));
  };

  // Seek audio
  const FillHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (isNaN(value)) return;

    setPlayerFill(value);

    const audio = audioRef.current;

    if (audio && audio.duration && isFinite(audio.duration)) {
      audio.currentTime = (value / 100) * audio.duration;
    }
  };

  // Change volume
  const volumeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    setVolume(value);
    setMuted(value === 0);

    if (audioRef.current) {
      audioRef.current.volume = value;
      audioRef.current.muted = value === 0;
    }
  };

  // Mute / Unmute
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const newMuted = !Muted;

    audio.muted = newMuted;
    setMuted(newMuted);

    if (!newMuted && Volume === 0) {
      setVolume(0.7);
      audio.volume = 0.7;
    }
  };

  // Next music
  const nextHandle = () => {
    if (!music || !activeQueue.length) return;

    const index = activeQueue.findIndex(
      (item) => item._id === music._id
    );

    const nextIndex =
      index === -1 || index >= activeQueue.length - 1
        ? 0
        : index + 1;

    const nextMusic = activeQueue[nextIndex];

    if (nextMusic._id === music._id) {
      const audio = audioRef.current;

      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      }

      return;
    }

    dispatch({
      type: "add",
      value: nextMusic,
    });
  };

  // Previous music
  const prevHandle = () => {
    if (!music || !activeQueue.length) return;

    const index = activeQueue.findIndex(
      (item) => item._id === music._id
    );

    const prevIndex =
      index <= 0 ? activeQueue.length - 1 : index - 1;

    const prevMusic = activeQueue[prevIndex];

    if (prevMusic._id === music._id) {
      const audio = audioRef.current;

      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(console.error);
      }

      return;
    }

    dispatch({
      type: "add",
      value: prevMusic,
    });
  };

  // Apply volume
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = Volume;
    audio.muted = Muted;
  }, [Volume, Muted]);

  if (!music) return null;

  return (
    <>
      {/* Desktop Player */}
      <div className="hidden md:flex flex-col items-center gap-2 w-full">
        <div
          className="relative rounded-xl overflow-hidden cursor-pointer"
          onClick={() => setExpanded(true)}
        >
          <img
            src={music.image}
            className="w-[7.5rem] aspect-square rounded-xl object-cover image-shadow"
            alt={music.name}
          />

          <div className="font-bold text-white absolute inset-0 bg-black/50 flex justify-center items-center">
            {MusicTime}
          </div>
        </div>

        <div
          className="max-w-full px-2 text-center cursor-pointer"
          onClick={() => setExpanded(true)}
        >
          <b className="text-sm font-bold truncate block">
            {music.name} -{" "}
            <span className="text-white/60">{music.singer}</span>
          </b>
        </div>

        {/* Desktop Controls */}
        <div className="flex justify-center items-center gap-3">
          <button onClick={prevHandle} className="cursor-pointer">
            <GiPreviousButton />
          </button>

          <button onClick={handlePlay} className="cursor-pointer">
            {Play ? <BsPause size={20} /> : <BsPlay size={20} />}
          </button>

          <button onClick={nextHandle} className="cursor-pointer">
            <GiNextButton />
          </button>
        </div>

        {/* Desktop Progress */}
        <div className="w-full px-5">
          <input
            onChange={FillHandle}
            className="progressbar w-full cursor-pointer"
            type="range"
            min="0"
            max="100"
            step={1}
            value={PlayerFill}
            style={{
              background: `linear-gradient(90deg, #ffffff ${PlayerFill}%, #a1a1a1 ${PlayerFill}%)`,
            }}
          />
        </div>

        {/* Desktop Volume */}
        <div className="w-full px-5">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="cursor-pointer shrink-0"
              aria-label="Toggle volume"
            >
              <GiSoundOn size={20} />
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={Muted ? 0 : Volume}
              onChange={volumeHandle}
              className="w-full cursor-pointer accent-[#E60A54]"
              style={{
                background: `linear-gradient(90deg, #E60A54 ${
                  (Muted ? 0 : Volume) * 100
                }%, #555 ${(Muted ? 0 : Volume) * 100}%)`,
              }}
            />

            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer shrink-0"
            >
              <LiaListAlt size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Player */}
      <div className="md:hidden fixed bottom-[60px] left-0 right-0 z-[100] bg-[#191919] border-t border-white/10 px-3 py-2 shadow-2xl">
        {/* Mobile Progress - Functional */}
        <div className="w-full px-1 mb-2">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={PlayerFill}
            onChange={FillHandle}
            className="progressbar w-full cursor-pointer"
            style={{
              background: `linear-gradient(90deg, #ffffff ${PlayerFill}%, #555 ${PlayerFill}%)`,
              touchAction: "pan-y",
            }}
            aria-label="Music progress"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* Music Info */}
          <div
            className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
            onClick={() => setExpanded(true)}
          >
            <img
              src={music.image}
              alt={music.name}
              className="w-11 h-11 rounded-lg object-cover shrink-0"
            />

            <div className="flex flex-col min-w-0">
              <b className="text-sm truncate">{music.name}</b>

              <span className="text-xs text-white/50 truncate">
                {music.singer}
              </span>

              <span className="text-[10px] text-white/40">
                {MusicTime}
              </span>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={prevHandle}
              className="cursor-pointer"
              aria-label="Previous music"
            >
              <GiPreviousButton size={20} />
            </button>

            <button
              onClick={handlePlay}
              className="cursor-pointer"
              aria-label={Play ? "Pause" : "Play"}
            >
              {Play ? <BsPause size={25} /> : <BsPlay size={25} />}
            </button>

            <button
              onClick={nextHandle}
              className="cursor-pointer"
              aria-label="Next music"
            >
              <GiNextButton size={20} />
            </button>

            <button
              onClick={toggleMute}
              className="cursor-pointer"
              aria-label="Toggle volume"
            >
              <GiSoundOn size={20} />
            </button>

            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer"
              aria-label="Open playlist"
            >
              <LiaListAlt size={22} />
            </button>
          </div>
        </div>

        {/* Mobile Volume */}
        {/* <div className="flex items-center gap-2 mt-2 px-1">
          <GiSoundOn size={16} />

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={Muted ? 0 : Volume}
            onChange={volumeHandle}
            className="w-full cursor-pointer accent-[#E60A54]"
            style={{
              background: `linear-gradient(90deg, #E60A54 ${
                (Muted ? 0 : Volume) * 100
              }%, #555 ${(Muted ? 0 : Volume) * 100}%)`,
            }}
            aria-label="Volume"
          />

          <span className="text-[10px] text-white/50 w-8 text-right">
            {Math.round((Muted ? 0 : Volume) * 100)}%
          </span>
        </div> */}
      </div>

      {/* Single Audio Element */}
      <audio
        ref={audioRef}
        src={music.audio}
        autoPlay
        id="myAdio"
        onTimeUpdate={updateTime}
        onPlay={() => setPlay(true)}
        onPause={() => setPlay(false)}
        onEnded={nextHandle}
        preload="auto"
      />

      {/* Fullscreen Player - React Portal */}
      {expanded &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[2147483647] bg-[#101010] text-white overflow-y-auto">
            <div className="min-h-[100dvh] flex flex-col items-center px-5 py-6 sm:px-10">

              {/* Header */}
              <div className="w-full max-w-5xl flex items-center justify-between">
                <button
                  onClick={() => setExpanded(false)}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                  aria-label="Close player"
                >
                  <X size={22} />
                </button>

                <div className="text-center">
                  <p className="text-[10px] tracking-[3px] text-white/40">
                    NOW PLAYING
                  </p>
                  <p className="text-sm font-bold tracking-widest">
                    MUSIVO
                  </p>
                </div>

                <button
                  onClick={() => setOpen(true)}
                  className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                  aria-label="Open queue"
                >
                  <LiaListAlt size={23} />
                </button>
              </div>

              {/* Player Content */}
              <div className="flex-1 w-full max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 py-10">

                {/* Cover */}
                <div className="w-full max-w-[min(75vw,420px)] lg:max-w-[440px] aspect-square rounded-2xl overflow-hidden image-shadow">
                  <img
                    src={music.image}
                    alt={music.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Controls Area */}
                <div className="w-full max-w-[440px]">
                  <p className="text-xs text-white/40 tracking-[3px] mb-3">
                    PLAYING FROM MUSIVO
                  </p>

                  <h2 className="text-3xl sm:text-4xl font-bold">
                    {music.name}
                  </h2>

                  <p className="text-lg text-white/60 mt-3">
                    {music.singer}
                  </p>

                  {music.album && (
                    <p className="text-sm text-white/40 mt-1">
                      {music.album}
                    </p>
                  )}

                  {/* Progress */}
                  <div className="w-full mt-10">
                    <input
                      onChange={FillHandle}
                      className="progressbar w-full cursor-pointer"
                      type="range"
                      min="0"
                      max="100"
                      step={0.1}
                      value={PlayerFill}
                      style={{
                        background: `linear-gradient(90deg, #ffffff ${PlayerFill}%, #a1a1a1 ${PlayerFill}%)`,
                      }}
                    />

                    <div className="flex justify-between text-xs text-white/50 mt-2">
                      <span>{MusicTime}</span>
                      <span>
                        {audioRef.current?.duration &&
                        isFinite(audioRef.current.duration)
                          ? change_time(audioRef.current.duration)
                          : "0:00"}
                      </span>
                    </div>
                  </div>

                  {/* Main Controls */}
                  <div className="flex items-center justify-between mt-8">
                    <button
                      onClick={toggleMute}
                      className="cursor-pointer text-white/70 hover:text-white"
                      aria-label="Toggle volume"
                    >
                      <GiSoundOn size={25} />
                    </button>

                    <button
                      onClick={prevHandle}
                      className="cursor-pointer"
                      aria-label="Previous music"
                    >
                      <GiPreviousButton size={30} />
                    </button>

                    <button
                      onClick={handlePlay}
                      className="w-16 h-16 rounded-full bg-[#E60A54] hover:bg-[#c90849] text-white flex items-center justify-center transition"
                      aria-label={Play ? "Pause" : "Play"}
                    >
                      {Play ? (
                        <BsPause size={32} />
                      ) : (
                        <BsPlay size={32} />
                      )}
                    </button>

                    <button
                      onClick={nextHandle}
                      className="cursor-pointer"
                      aria-label="Next music"
                    >
                      <GiNextButton size={30} />
                    </button>

                    <button
                      onClick={() => setOpen(true)}
                      className="cursor-pointer text-white/70 hover:text-white"
                      aria-label="Open queue"
                    >
                      <LiaListAlt size={25} />
                    </button>
                  </div>

                  {/* Volume */}
                  <div className="flex items-center gap-3 mt-9">
                    <GiSoundOn size={20} />

                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={Muted ? 0 : Volume}
                      onChange={volumeHandle}
                      className="w-full cursor-pointer accent-[#E60A54]"
                      style={{
                        background: `linear-gradient(90deg, #E60A54 ${
                          (Muted ? 0 : Volume) * 100
                        }%, #555 ${(Muted ? 0 : Volume) * 100}%)`,
                      }}
                    />
                  </div>

                  {/* Queue */}
                  <button
                    onClick={() => setOpen(true)}
                    className="w-full mt-8 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center gap-2 transition"
                  >
                    <LiaListAlt size={20} />
                    <span className="text-sm">Playing Queue</span>
                    <span className="text-xs text-white/50">
                      ({Array.isArray(musicQueue) ? musicQueue.length : 0})
                    </span>
                  </button>
                </div>
              </div>

              <p className="text-[10px] tracking-[3px] text-white/30">
                MUSIVO · FEEL EVERY BEAT
              </p>
            </div>
          </div>,
          document.body
        )}

      <DrawerDemo
        open={open}
        setOpen={setOpen}
        music={music}
      />
    </>
  );
};

export default MusicPlayer;
