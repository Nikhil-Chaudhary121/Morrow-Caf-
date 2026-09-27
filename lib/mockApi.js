// Mocks POST /api/claim exactly to the given contract, with no network call.
// There is no backend for this — see README for why this approach was chosen.
//
// Success shape: { success: true, claimCode, message }
// Error shape:   { success: false, message }
//
// A small random failure rate is built in on purpose, so the UI's error
// state is a real, exercised path and not just dead code — not because the
// "backend" is actually unreliable.

import { offer } from "@/lib/shopData";

function generateClaimCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${offer.claimCodePrefix}-${code}`;
}

const FAILURE_RATE = 0.12;

export function claimOffer({ name, phone }) {
  return new Promise((resolve) => {
    const delay = 700 + Math.random() * 500;

    setTimeout(() => {
      if (Math.random() < FAILURE_RATE) {
        resolve({
          success: false,
          message: "Unable to process your request.",
        });
        return;
      }

      resolve({
        success: true,
        claimCode: generateClaimCode(),
        message: "Your offer has been claimed.",
      });
    }, delay);
  });
}
