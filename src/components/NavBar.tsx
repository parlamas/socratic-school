// src/components/NavBar.tsx

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  const isStudentRoute = pathname.startsWith("/students");
  const isInstructorRoute = pathname.startsWith("/instructor");

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Socratic School
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {session ? (
              // User is logged in
              <>
                <div className="flex items-center space-x-6">
                  {session.user?.role === "student" && (
                    <Link
                      href="/students"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive("/students") 
                          ? "bg-blue-50 text-blue-600" 
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}
                  
                  {session.user?.role === "instructor" && (
                    <Link
                      href="/instructor"
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive("/instructor") 
                          ? "bg-blue-50 text-blue-600" 
                          : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                      }`}
                    >
                      Dashboard
                    </Link>
                  )}
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">
                        {session.user?.username || session.user?.firstName || session.user?.email}
                      </span>
                      <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                        {session.user?.role}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // User is not logged in
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <Link
                    href="/students/sign-in"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isStudentRoute 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    Student Sign In
                  </Link>
                  
                  <Link
                    href="/instructor/sign-in"
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isInstructorRoute 
                        ? "bg-blue-600 text-white" 
                        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    }`}
                  >
                    Instructor Sign In
                  </Link>
                </div>
                
                <div className="hidden lg:flex items-center space-x-4 border-l border-gray-200 pl-6">
                  <Link
                    href="/students/sign-up"
                    className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    Student Sign Up
                  </Link>
                  
                  <Link
                    href="/instructor/sign-up"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Instructor Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className="md:hidden hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {session ? (
            <>
              {session.user?.role === "student" && (
                <Link
                  href="/students"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/students") 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  Student Dashboard
                </Link>
              )}
              
              {session.user?.role === "instructor" && (
                <Link
                  href="/instructor"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive("/instructor") 
                      ? "bg-blue-50 text-blue-600" 
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  Instructor Dashboard
                </Link>
              )}
              
              <div className="px-3 py-2 text-sm text-gray-500">
                Signed in as: {session.user?.username || session.user?.email}
              </div>
              
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/students/sign-in"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isStudentRoute 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                Student Sign In
              </Link>
              
              <Link
                href="/students/sign-up"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Student Sign Up
              </Link>
              
              <Link
                href="/instructor/sign-in"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isInstructorRoute 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                Instructor Sign In
              </Link>
              
              <Link
                href="/instructor/sign-up"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Instructor Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}