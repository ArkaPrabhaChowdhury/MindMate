import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="bg-gray-900 min-h-screen flex justify-center items-center">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <div className="text-4xl md:text-6xl font-bold text-white mb-4">
              <h1 className="text-5xl">Find Solace,</h1>
              <h1 className="text-custom-pink text-6xl">Heal Your Mind</h1>
            </div>
            <p className="text-gray-400 font-semibold mb-8 text-xl">
              Introducing our compassionate mental health chatbot, designed to
              provide a safe and judgment-free space for you to explore your
              thoughts and emotions. Share your struggles, and our AI will offer
              guidance and support on your journey towards healing.
            </p>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <button className="font-semibold px-6 py-3 rounded-full bg-custom-pink text-black hover:bg-white transition-colors duration-300">
                <Link href="/chat">Get Started</Link>
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative h-80 md:h-[26rem] rounded-2xl shadow-2xl overflow-hidden">
              <Image src="/assets/landing.jpg" alt="Hero Image" fill />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
