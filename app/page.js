import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="bg-gray-900 h-screen">
      <div className="flex mx-auto px-40 h-full justify-center items-center">
        <div className="flex w-full">
          <div className="flex flex-col justify-center w-1/2 pr-8">
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
              <button className="font-semibold px-6 py-3 rounded-full bg-custom-pink text-black hover:bg-purple-600 transition-colors duration-300">
                Start Chatting
              </button>
              <button className="px-6 py-3 rounded-full bg-transparent border border-gray-600 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <div className="w-full h-full md:h-auto">
              <div className="md:w-1/2 relative">
                <Blob className="absolute inset-0 -z-10" />
                <div className="relative h-80 md:h-96 rounded-2xl shadow-2xl overflow-hidden">
                    <Image
                      src="/assets/landing.jpg"
                      alt="Hero Image"
                      fill
                      className="object-cover"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Blob = ({ className }) => (
  <svg
    className={`${className} w-full h-full`}
    viewBox="0 0 578 440"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
      fill="currentColor"
    />
  </svg>
);
