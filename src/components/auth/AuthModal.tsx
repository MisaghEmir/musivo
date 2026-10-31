"use client";

import { useState } from "react";
import { BiX, BiEnvelope, BiLock } from "react-icons/bi";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // اتصال به API ورود را بعداً اینجا انجام می‌دهیم.
    console.log({ email, password });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-[#181818] p-7 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-white/40 transition hover:text-white"
        >
          <BiX size={25} />
        </button>

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Welcome <span className="text-[#E60A54]">Back</span>
          </h2>

          <p className="mt-3 text-sm text-white/40">
            Sign in to continue listening to your favorite music.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="mb-2 block text-sm text-white/70">
              Email Address
            </label>

            <div className="flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 focus-within:border-[#E60A54]/60">
              <BiEnvelope size={20} className="text-white/40" />

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Password
            </label>

            <div className="flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-4 focus-within:border-[#E60A54]/60">
              <BiLock size={20} className="text-white/40" />

              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 h-12 rounded-xl bg-[#E60A54] text-sm font-bold text-white transition hover:bg-[#c90849]"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/40">
          Don't have an account?{" "}
          <button className="font-semibold text-[#E60A54] hover:text-[#ff3978]">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;