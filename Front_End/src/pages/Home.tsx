import React from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Zap, BarChart3 } from "lucide-react";

export function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fbff]">
      {/* Navbar */}
      <nav className="w-full bg-white border-b border-blue-100/60 py-3 px-4 md:px-12 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600 font-bold text-lg">VulnGuard</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
          <a href="/" className="hover:text-blue-600 transition">Home</a>
          <a href="/about" className="hover:text-blue-600 transition">About</a>
          <a href="/features" className="hover:text-blue-600 transition">Features</a>
          <a href="/contact" className="hover:text-blue-600 transition">Contact</a>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md text-sm shadow"
          onClick={() => navigate("/login")}
        >
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-[#eaf3fb] to-[#f8fbff]">
        <h1 className="text-3xl md:text-5xl font-bold mb-2 text-gray-900">
          Protect Your Network with Real-Time
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-blue-500">
          Vulnerability Assessments
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Dynamic scanning, user-friendly dashboards, and actionable insights tailored for SMEs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>
          <button
            className="bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 font-semibold px-6 py-2 rounded-md shadow"
            onClick={() => navigate("/about")}
          >
            Learn More
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 px-4 bg-white">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900">
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 rounded-full p-4 mb-3">
              <Lock className="text-blue-500 w-8 h-8" />
            </div>
            <h4 className="font-semibold text-lg mb-1">1. Sign Up & Log In</h4>
            <p className="text-gray-500 text-sm">Create your free account to get started.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 rounded-full p-4 mb-3">
              <Zap className="text-blue-500 w-8 h-8" />
            </div>
            <h4 className="font-semibold text-lg mb-1">2. Scan Your Network</h4>
            <p className="text-gray-500 text-sm">Start a scan with one click. No technical skills needed.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 rounded-full p-4 mb-3">
              <BarChart3 className="text-blue-500 w-8 h-8" />
            </div>
            <h4 className="font-semibold text-lg mb-1">3. View Results & Get Advice</h4>
            <p className="text-gray-500 text-sm">See easy-to-understand results and follow our tips to improve your security.</p>
          </div>
        </div>
        <div className="text-center mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-md shadow"
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900">
          Comprehensive Security Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-[#f8fbff] border border-blue-100 rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
            <div className="bg-blue-50 rounded-full p-3 mb-3">
              <Zap className="text-blue-500 w-7 h-7" />
            </div>
            <h4 className="font-semibold text-lg mb-1">Real-Time Scanning</h4>
            <p className="text-gray-500 text-sm">Continuous monitoring and instant vulnerability detection</p>
          </div>
          <div className="bg-[#f8fbff] border border-blue-100 rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
            <div className="bg-blue-50 rounded-full p-3 mb-3">
              <BarChart3 className="text-blue-500 w-7 h-7" />
            </div>
            <h4 className="font-semibold text-lg mb-1">User-Friendly Dashboards</h4>
            <p className="text-gray-500 text-sm">Clear visualizations and actionable insights at a glance</p>
          </div>
          <div className="bg-[#f8fbff] border border-blue-100 rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
            <div className="bg-blue-50 rounded-full p-3 mb-3">
              <Zap className="text-blue-500 w-7 h-7" />
            </div>
            <h4 className="font-semibold text-lg mb-1">Plug-and-Play Setup</h4>
            <p className="text-gray-500 text-sm">Get started in minutes with our simple integration process</p>
          </div>
          <div className="bg-[#f8fbff] border border-blue-100 rounded-xl p-6 flex flex-col items-center text-center shadow-sm">
            <div className="bg-blue-50 rounded-full p-3 mb-3">
              <Lock className="text-blue-500 w-7 h-7" />
            </div>
            <h4 className="font-semibold text-lg mb-1">Actionable Reports</h4>
            <p className="text-gray-500 text-sm">Detailed analysis and step-by-step remediation guidance</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 bg-[#f8fbff] text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">
          Ready to Secure Your Network?
        </h3>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-md shadow"
          onClick={() => navigate("/login")}
        >
          Get Started Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-blue-100/60 py-10 px-4 md:px-12 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          <div className="flex-1 mb-6 md:mb-0">
            <span className="text-blue-600 font-bold text-lg">VulnGuard</span>
            <p className="text-gray-500 text-sm mt-2 max-w-xs">
              Protecting your network with real-time vulnerability assessments and actionable insights.
            </p>
          </div>
          <div className="flex-1 flex flex-col md:flex-row gap-8 justify-center">
            <div>
              <h5 className="font-semibold text-gray-700 mb-2">Legal</h5>
              <ul className="text-gray-500 text-sm space-y-1">
                <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700 mb-2">Connect</h5>
              <div className="flex space-x-4 mt-1">
                <a href="#" className="text-gray-400 hover:text-blue-600" aria-label="Twitter"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z"/></svg></a>
                <a href="#" className="text-gray-400 hover:text-blue-600" aria-label="GitHub"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.304-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.649.242 2.872.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/></svg></a>
                <a href="#" className="text-gray-400 hover:text-blue-600" aria-label="LinkedIn"><svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.785-1.75-1.75s.784-1.75 1.75-1.75 1.75.785 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/></svg></a>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 text-xs mt-8">© 2025 VulnGuard. All rights reserved.</div>
      </footer>
    </div>
  );
} 