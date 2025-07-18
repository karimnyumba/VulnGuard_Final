import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

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
          <a href="/contact" className="hover:text-blue-600 transition text-blue-600">Contact</a>
        </div>
        <a href="/login" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md text-sm shadow">Get Started</a>
      </nav>

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Contact Us</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Have a question or need support? Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-xl font-semibold mb-4 text-blue-600 flex items-center"><Mail className="w-5 h-5 mr-2" /> Send a Message</h2>
            {submitted ? (
              <div className="text-green-600 font-medium text-center py-8">Thank you for contacting us! We'll be in touch soon.</div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1">Name</label>
                  <input name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-base" />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1">Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-base" />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-1">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required rows={4} className="w-full px-4 py-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-base" />
                </div>
                <button type="submit" className="w-full bg-[#42a5ea] hover:bg-[#2196f3] text-white font-semibold py-3 rounded-md transition text-base">Send Message</button>
              </form>
            )}
          </div>
          <div className="bg-white rounded-xl shadow p-8 flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-4 text-blue-600 flex items-center"><Phone className="w-5 h-5 mr-2" /> Contact Info</h2>
            <ul className="text-gray-500 text-sm space-y-4">
              <li className="flex items-center"><Mail className="w-5 h-5 mr-2 text-blue-500" /> support@vulnguard.com</li>
              <li className="flex items-center"><Phone className="w-5 h-5 mr-2 text-blue-500" /> +1 (555) 123-4567</li>
              <li className="flex items-center"><MapPin className="w-5 h-5 mr-2 text-blue-500" /> 123 Security Ave, Suite 100, Cyber City</li>
            </ul>
          </div>
        </div>
      </main>
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