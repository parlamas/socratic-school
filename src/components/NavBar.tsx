//src/components/Navbar.tsx - WITH AUTH SUPPORT

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoading = status === "loading";

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Mobile burger button (math menu) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-1.5 sm:p-2 text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Open math menu"
          >
            <svg
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-1.5 sm:space-x-2 text-base sm:text-xl font-semibold text-gray-900 no-underline hover:text-blue-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">SS</span>
              </div>
              <span className="text-sm sm:text-base md:text-lg">
                Socratic School
              </span>
            </Link>
          </div>

          {/* Navigation Links - Center (only show when signed in) */}
          {session && (
            <div className="hidden md:flex items-center space-x-8">
              {session.user.role === "student" && (
                <>
                  <Link
                    href="/students/dashboard"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors no-underline"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/students/courses"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors no-underline"
                  >
                    My Courses
                  </Link>
                  <Link
                    href="/students/profile"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors no-underline"
                  >
                    Profile
                  </Link>
                </>
              )}
              {session.user.role === "instructor" && (
                <>
                  <Link
                    href="/instructor/dashboard"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors no-underline"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/instructor/courses"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors no-underline"
                  >
                    My Courses
                  </Link>
                  <Link
                    href="/instructor/students"
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors no-underline"
                  >
                    Students
                  </Link>
                </>
              )}
            </div>
          )}

          {/* Auth Buttons - Right */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isLoading ? (
              // Loading state
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="h-6 w-16 sm:h-8 sm:w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-20 sm:h-8 sm:w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : session ? (
              // Signed in state
              <div className="flex items-center space-x-2 sm:space-x-4">
                {/* User info - hidden on mobile */}
                <div className="hidden md:flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">
                      {session.user.firstName?.[0] || session.user.username?.[0] || "U"}
                    </span>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">
                      {session.user.firstName || session.user.username}
                    </p>
                    <p className="text-gray-500 capitalize">
                      {session.user.role}
                    </p>
                  </div>
                </div>

                {/* Sign out button - smaller on mobile */}
                <button
                  onClick={handleSignOut}
                  className="text-xs sm:text-sm text-gray-700 hover:text-red-600 font-medium transition-colors no-underline px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-gray-50 border border-gray-300 hover:border-red-300"
                >
                  <span className="hidden sm:inline">Sign Out</span>
                  <span className="sm:hidden">Exit</span>
                </button>
              </div>
            ) : (
              // Signed out state - more compact on mobile
              <>
                <Link
                  href="/students/sign-in"
                  className="text-xs sm:text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors no-underline px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-gray-50"
                >
                  <span className="hidden sm:inline">Student Sign In</span>
                  <span className="sm:hidden">Student</span>
                </Link>
                <Link
                  href="/instructor/sign-in"
                  className="text-xs sm:text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors no-underline px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg hover:bg-gray-50"
                >
                  <span className="hidden sm:inline">Instructor Sign In</span>
                  <span className="sm:hidden">Instructor</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile math menu - vertical layout */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white/95 backdrop-blur-sm">
          <div className="px-4 py-3">

{/* Exercises shop */}
<div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-2">
  Exercises shop
</div>

<div className="flex flex-col space-y-1 mb-3">
  <Link
    href="/shop"
    className="flex items-center justify-between text-sm text-gray-700 font-medium py-2.5 px-3 no-underline hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
    onClick={() => setMobileMenuOpen(false)}
  >
    <span>Browse all subjects</span>
    <span className="text-xs text-gray-500">Shop</span>
  </Link>
  {session && (
    <Link
      href="/students/exercises"
      className="flex items-center justify-between text-sm text-gray-700 font-medium py-2.5 px-3 no-underline hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
      onClick={() => setMobileMenuOpen(false)}
    >
      <span>My exercises</span>
      <span className="text-xs text-gray-500">Purchased</span>
    </Link>
  )}
</div>

<div className="border-t border-gray-200 my-2"></div>

            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 px-2">
              Math Exercises
            </div>
            <div className="flex flex-col space-y-1">
              <Link
                href="/math/ld"
                className="flex items-center justify-between text-sm text-gray-700 font-medium py-2.5 px-3 no-underline hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Division</span>
                <span className="text-xs text-gray-500">Διαίρεση</span>
              </Link>
              <Link
                href="/math/ekp"
                className="flex items-center justify-between text-sm text-gray-700 font-medium py-2.5 px-3 no-underline hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>LCM</span>
                <span className="text-xs text-gray-500">ΕΚΠ</span>
              </Link>
              <Link
                href="/math/mkd"
                className="flex items-center justify-between text-sm text-gray-700 font-medium py-2.5 px-3 no-underline hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>GCD</span>
                <span className="text-xs text-gray-500">ΜΚΔ</span>
              </Link>
              <Link
                href="/math/mc"
                className="flex items-center justify-between text-sm text-blue-600 font-semibold py-2.5 px-3 no-underline hover:bg-blue-50 rounded-lg transition-colors bg-blue-50/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Multiple Choice</span>
                <span className="text-xs text-gray-500">Πολλαπλής Επιλογής</span>
              </Link>
            </div>

            {/* Languages Section - New */}
            <div className="border-t border-gray-200 my-2"></div>
            
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1 px-2">
              Languages
            </div>
            
            <Link
              href="/Danish"
              className="flex items-center justify-between text-sm text-gray-700 font-medium py-2.5 px-3 no-underline hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <span>🇩🇰</span>
                <span>Danish</span>
              </span>
              <span className="text-xs text-gray-500">Dansk</span>
            </Link>



{/* Danish Sub-lessons */}
<div className="ml-6 mt-1 mb-2 flex flex-col space-y-1 border-l-2 border-orange-200 pl-2">
  <Link
    href="/Danish/lesson-001"
    className="flex items-center justify-between text-sm text-gray-600 font-medium py-1.5 px-3 no-underline hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
    onClick={() => setMobileMenuOpen(false)}
  >
    <span className="flex items-center gap-2">
      <span className="text-xs">📘</span>
      <span>0001 • Præsentation</span>
    </span>
    <span className="text-xs text-gray-400">Introductions</span>
  </Link>
  <Link
    href="/Danish/lesson-002"
    className="flex items-center justify-between text-sm text-gray-600 font-medium py-1.5 px-3 no-underline hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
    onClick={() => setMobileMenuOpen(false)}
  >
    <span className="flex items-center gap-2">
      <span className="text-xs">📘</span>
      <span>0002 • Kendeord</span>
    </span>
    <span className="text-xs text-gray-400">Articles</span>
  </Link>
  <Link
    href="/Danish/ex-001"
    className="flex items-center justify-between text-sm text-gray-600 font-medium py-1.5 px-3 no-underline hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
    onClick={() => setMobileMenuOpen(false)}
  >
    <span className="flex items-center gap-2">
      <span className="text-xs">📝</span>
      <span>ex-001 • Artikler Øvelse</span>
    </span>
    <span className="text-xs text-gray-400">Articles Exercise</span>
  </Link>

  <Link
    href="/Danish/ex-002"
    className="flex items-center justify-between text-sm text-gray-600 font-medium py-1.5 px-3 no-underline hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
    onClick={() => setMobileMenuOpen(false)}
  >
    <span className="flex items-center gap-2">
      <span className="text-xs">📝</span>
      <span>ex-002 • Moods Øvelse</span>
    </span>
    <span className="text-xs text-gray-400">Mood Exercise</span>
  </Link>
</div>

            
            {/* Separator for History section */}
            <div className="border-t border-gray-200 my-2"></div>
            
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1 px-2">
              History
            </div>
            
            <Link
              href="/6th/h"
              className="flex items-center justify-between text-sm text-gray-700 font-medium py-2.5 px-3 no-underline hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <span>🇬🇷</span>
                <span>6th Grade History</span>
              </span>
              <span className="text-xs text-gray-500">Ιστορία ΣΤ' Δημοτικού</span>
            </Link>

            {/* Separator for Philosophy section */}
            <div className="border-t border-gray-200 my-2"></div>
            
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1 px-2">
              Philosophy
            </div>
            
            <Link
              href="/symposium"
              className="flex items-center justify-between text-sm text-gray-700 font-medium py-2.5 px-3 no-underline hover:bg-emerald-50 hover:text-emerald-600 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <span>🏛️</span>
                <span>Symposium</span>
              </span>
              <span className="text-xs text-gray-500">Συμπόσιο</span>
            </Link>

            {/* Separator for Grammar section */}
            <div className="border-t border-gray-200 my-2"></div>

            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1 px-2">
              Grammar
            </div>

            <Link
              href="/grammar"
              className="flex items-center justify-between text-sm text-gray-700 font-medium py-2.5 px-3 no-underline hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="flex items-center gap-2">
                <span>📚</span>
                <span>Grammar</span>
              </span>
              <span className="text-xs text-gray-500">Γραμματική</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}