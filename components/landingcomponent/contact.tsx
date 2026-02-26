"use client";

import { Mail, Phone, MapPin, MailIcon, MailsIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaLinkedin } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({ fullName: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastType, setToastType] = useState('')

  const handleSubmit = async (e:any) => {
    if (isSubmitting) return
    
    setIsSubmitting(true)

    try {
      // Simulate API call
       const response = await fetch('/api/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      // Simulate successful response
      if (response.ok) {
      setToastType('success')
      setShowToast(true)
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        message: ''
      })}else{
        setToastType('error')
        setShowToast(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setToastType('error')
      setShowToast(true)
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Auto-hide toast after 4 seconds
    useEffect(() => {
      if (showToast) {
        const timer = setTimeout(() => {
          setShowToast(false)
        }, 4000)
        return () => clearTimeout(timer)
      }
    }, [showToast])
  

  return (
    <section id="contact" className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block py-1 px-3 rounded-full bg-[#2cc2a5]/10 text-[#2cc2a5] text-sm font-semibold mb-4">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Let&apos;s start a conversation
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Have questions about our service or want to become a checker? Reach out to us.
          </p>
        </div>
         {/* Toast Notification */}
      <div className={`fixed top-6 right-6 z-50 transform transition-all duration-500 ease-in-out ${
        showToast ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className={`rounded-xl shadow-2xl p-4 flex items-center space-x-3 ${
          toastType === 'success' 
            ? 'bg-emerald-500 text-white' 
            : 'bg-red-500 text-white'
        }`}>
          {toastType === 'success' ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          )}
          <span className="font-medium">
            {toastType === 'success' 
              ? 'Message sent successfully! We\'ll be in touch soon.' 
              : 'Failed to send message. Please try again.'}
          </span>
          <button 
            onClick={() => setShowToast(false)}
            className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col md:flex-row">
          {/* Left info panel */}
          <div className="p-10 md:p-14 md:w-5/12 bg-gradient-to-br from-[#2cc2a5] to-[#1f8a75] text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4">Get in touch</h3>
              <p className="text-white/80 text-base mb-10">
                Have questions about our service or want to become a checker ? Reach out to us.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Mail, text: "contact@checkerist.com" , href:"#" },
                  { icon: FaLinkedin, text: "checkerist" , href:"#" },
                  
                ].map(({ icon: Icon, text, href }) => (
                  <div key={text} className="flex items-center gap-4">
                    <Link href={href} className="w-10 h-10 bg-white/20 rounded-full cursor-pointer flex items-center justify-center flex-shrink-0">
                      <Icon  className="w-5 h-5"  />
                    </Link>
                    <span className="font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className=" flex items-center justify-center p-6">
              <MailsIcon className=" size-36  text-white"/>
            </div>            
          </div>

          {/* Right form */}
          <div className="p-10 md:p-14 md:w-7/12">
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                    disabled={isSubmitting}
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2cc2a5]/40 focus:border-[#2cc2a5] transition text-sm"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2cc2a5]/40 focus:border-[#2cc2a5] transition text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2cc2a5]/40 focus:border-[#2cc2a5] transition text-sm"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2cc2a5]/40 focus:border-[#2cc2a5] transition text-sm resize-none"
                />
              </div>
              <button
                onClick={handleSubmit}
                className={`w-full py-4 px-6 font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 text-sm ${
                  sent
                    ? "bg-green-500 text-white"
                    : "bg-[#2cc2a5] hover:bg-[#1f8a75] text-white shadow-[#2cc2a5]/30"
                }`}
              >
                {isSubmitting ? "Sending..." : sent ? "Message Sent!" : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}