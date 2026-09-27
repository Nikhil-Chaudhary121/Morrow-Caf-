"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { claimOffer } from "@/lib/mockApi";
import { shop, offer } from "@/lib/shopData";

const SHOW_DELAY_MS = 900;

const NAME_RE = /^[A-Za-z][A-Za-z\s.'-]{1,49}$/;
const PHONE_RE = /^[6-9]\d{9}$/;

function useCountdown(minutes) {
  const [seconds, setSeconds] = useState(minutes * 60);
  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export default function ClaimOfferModal() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState("offer"); // offer | confirmSkip | form | success | error
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const nameInputRef = useRef(null);
  const timeLeft = useCountdown(offer.windowMinutes);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (step === "form") {
      const t = setTimeout(() => nameInputRef.current?.focus(), 250);
      return () => clearTimeout(t);
    }
  }, [step]);

  const dismissForGood = () => {
    setVisible(false);
  };

  const requestClose = () => {
    if (step === "offer") {
      setStep("confirmSkip");
    } else {
      dismissForGood();
    }
  };

  const onEscape = (e) => {
    if (e.key === "Escape") requestClose();
  };

  const validate = () => {
    const next = {};
    if (!NAME_RE.test(name.trim())) {
      next.name = "Enter your full name (letters only).";
    }
    if (!PHONE_RE.test(phone)) {
      next.phone = "Enter a valid 10-digit mobile number.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(digits);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const res = await claimOffer({ name: name.trim(), phone });
    setSubmitting(false);
    setResult(res);
    setStep(res.success ? "success" : "error");
  };

  const handleCopy = async () => {
    if (!result?.claimCode) return;
    try {
      await navigator.clipboard.writeText(result.claimCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked — user can still select the code manually
    }
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/60 backdrop-blur-sm sm:items-center sm:p-6"
        onKeyDown={onEscape}
        role="presentation"
      >
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="claim-offer-heading"
          className="relative w-full max-w-md overflow-hidden rounded-t-[28px] bg-ink text-cream shadow-2xl sm:rounded-[28px]"
        >
          {step === "offer" && (
            <OfferStep
              onClaim={() => setStep("form")}
              onClose={requestClose}
              timeLeft={timeLeft}
            />
          )}

          {step === "confirmSkip" && (
            <ConfirmSkipStep
              onBack={() => setStep("offer")}
              onSkip={dismissForGood}
            />
          )}

          {step === "form" && (
            <FormStep
              name={name}
              phone={phone}
              errors={errors}
              submitting={submitting}
              onNameChange={setName}
              onPhoneChange={handlePhoneChange}
              onSubmit={handleSubmit}
              onClose={dismissForGood}
              nameInputRef={nameInputRef}
            />
          )}

          {step === "success" && (
            <SuccessStep result={result} copied={copied} onCopy={handleCopy} onClose={dismissForGood} />
          )}

          {step === "error" && (
            <ErrorStep
              message={result?.message}
              onRetry={() => setStep("form")}
              onClose={dismissForGood}
            />
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CloseButton({ onClick, label = "Close" }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-cream/20"
    >
      <span className="text-lg leading-none">&times;</span>
    </button>
  );
}

function OfferStep({ onClaim, onClose, timeLeft }) {
  return (
    <div className="px-6 pb-8 pt-12 sm:px-8">
      <CloseButton onClick={onClose} />

      <p className="text-center text-xs tracking-wide text-fog/70">
        {shop.name} · {shop.address}
      </p>

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "backOut" }}
        className="mx-auto mt-5 h-20 w-20 overflow-hidden rounded-full bg-moss/20"
      >
        {shop.image ? (
          <img src={shop.image} alt="" className="h-full w-full object-cover" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-4xl">{shop.logo}</span>
        )}
      </motion.div>

      <h2 id="claim-offer-heading" className="mt-6 text-center font-display text-3xl leading-tight">
        {offer.headline}
      </h2>
      <p className="mx-auto mt-3 max-w-xs text-center text-sm text-fog/80">{offer.description}</p>

      <div className="mx-auto mt-6 w-fit rounded-full bg-cream/10 px-4 py-1.5 text-xs text-fog">
        Claim window closes in <span className="tabular-nums text-cream">{timeLeft}</span>
      </div>

      <button
        onClick={onClaim}
        className="mt-7 w-full rounded-full bg-moss px-6 py-4 text-base font-medium text-cream transition-transform active:scale-[0.98] hover:bg-moss/90"
      >
        Claim {offer.amountLabel} off
      </button>

      <button
        onClick={onClose}
        className="mt-3 w-full text-center text-sm text-fog/60 transition-colors hover:text-fog"
      >
        Not right now
      </button>
    </div>
  );
}

function ConfirmSkipStep({ onBack, onSkip }) {
  return (
    <div className="px-6 py-10 text-center sm:px-8">
      <h2 id="claim-offer-heading" className="font-display text-2xl">
        Skip your {offer.amountLabel} off?
      </h2>
      <p className="mx-auto mt-3 max-w-xs text-sm text-fog/80">
        This offer only shows up once per visit. You'll pay full price next time unless you claim it now.
      </p>

      <button
        onClick={onBack}
        className="mt-7 w-full rounded-full bg-moss px-6 py-4 text-base font-medium text-cream transition-transform active:scale-[0.98] hover:bg-moss/90"
      >
        Back to offer
      </button>
      <button
        onClick={onSkip}
        className="mt-3 w-full text-center text-sm text-fog/60 transition-colors hover:text-fog"
      >
        Skip anyway
      </button>
    </div>
  );
}

function FormStep({
  name,
  phone,
  errors,
  submitting,
  onNameChange,
  onPhoneChange,
  onSubmit,
  onClose,
  nameInputRef,
}) {
  return (
    <div className="px-6 pb-8 pt-12 sm:px-8">
      <CloseButton onClick={onClose} />

      <h2 id="claim-offer-heading" className="font-display text-2xl">
        Almost there
      </h2>
      <p className="mt-2 text-sm text-fog/80">
        Add your details and we'll text you a code to show at {shop.name}.
      </p>

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
        <div>
          <label htmlFor="claim-name" className="mb-1.5 block text-xs text-fog/70">
            Full name
          </label>
          <input
            id="claim-name"
            ref={nameInputRef}
            type="text"
            autoComplete="name"
            placeholder="Rahul Sharma"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "claim-name-error" : undefined}
            disabled={submitting}
            className="w-full rounded-xl border border-cream/15 bg-cream/5 px-4 py-3.5 text-base text-cream placeholder:text-fog/40 outline-none transition-colors focus:border-moss disabled:opacity-60"
          />
          {errors.name && (
            <p id="claim-name-error" className="mt-1.5 text-xs text-red-300">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="claim-phone" className="mb-1.5 block text-xs text-fog/70">
            Phone number
          </label>
          <div className="flex items-center overflow-hidden rounded-xl border border-cream/15 bg-cream/5 focus-within:border-moss">
            <span className="border-r border-cream/15 px-4 py-3.5 text-sm text-fog/70">+91</span>
            <input
              id="claim-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="98765 43210"
              value={phone}
              onChange={onPhoneChange}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "claim-phone-error" : undefined}
              disabled={submitting}
              className="w-full bg-transparent px-4 py-3.5 text-base text-cream placeholder:text-fog/40 outline-none disabled:opacity-60"
            />
          </div>
          {errors.phone && (
            <p id="claim-phone-error" className="mt-1.5 text-xs text-red-300">
              {errors.phone}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-moss px-6 py-4 text-base font-medium text-cream transition-transform active:scale-[0.98] hover:bg-moss/90 disabled:opacity-70"
        >
          {submitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-cream/40 border-t-cream" />
              Claiming your offer…
            </>
          ) : (
            `Claim ${offer.amountLabel} off`
          )}
        </button>

        <p className="text-center text-[11px] leading-relaxed text-fog/50">{offer.terms}</p>
      </form>
    </div>
  );
}

function SuccessStep({ result, copied, onCopy, onClose }) {
  return (
    <div className="px-6 pb-8 pt-12 text-center sm:px-8">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-moss text-cream"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.25, duration: 0.4, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      <h2 id="claim-offer-heading" className="mt-5 font-display text-3xl">
        {offer.amountLabel} off claimed
      </h2>
      <p className="mt-2 text-sm text-fog/80">Show this code when you visit {shop.name}.</p>

      <div className="mx-auto mt-6 w-fit rounded-2xl border border-dashed border-cream/25 bg-cream/5 px-8 py-4">
        <p className="font-display text-2xl tracking-widest">{result?.claimCode}</p>
      </div>

      <button
        onClick={onCopy}
        className="mx-auto mt-5 flex items-center gap-2 rounded-full border border-cream/20 px-5 py-2.5 text-sm text-cream transition-colors hover:bg-cream/10"
      >
        {copied ? "Copied ✓" : "Copy code"}
      </button>

      <button
        onClick={onClose}
        className="mt-6 w-full rounded-full bg-cream px-6 py-4 text-base font-medium text-ink transition-transform active:scale-[0.98] hover:bg-fog"
      >
        Done
      </button>
    </div>
  );
}

function ErrorStep({ message, onRetry, onClose }) {
  return (
    <div className="px-6 pb-8 pt-12 text-center sm:px-8">
      <CloseButton onClick={onClose} />

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-400/15 text-red-300">
        <span className="text-2xl">!</span>
      </div>

      <h2 id="claim-offer-heading" className="mt-5 font-display text-2xl">
        Couldn't claim your offer
      </h2>
      <p className="mx-auto mt-2 max-w-xs text-sm text-fog/80">
        {message || "Unable to process your request."} Your details weren't lost — just try again.
      </p>

      <button
        onClick={onRetry}
        className="mt-7 w-full rounded-full bg-moss px-6 py-4 text-base font-medium text-cream transition-transform active:scale-[0.98] hover:bg-moss/90"
      >
        Try again
      </button>
    </div>
  );
}
