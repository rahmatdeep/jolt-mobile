"use client";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
// import { Header } from '@/components/Header'

// import { ThemeButton } from '@/components/theme-button'

export function Appbar() {
  return (
    <div className="flex justify-between">
      <div>Jolt</div>
      <div>
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
