import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Icons
import { Home, ArrowLeft, RefreshCw, HelpCircle } from "lucide-react";

export default function NotFound() {

  const navigate = useNavigate()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }


  return (
    <div className="flex flex-col justify-center items-center bg-gradient-to-br from-lightBlack via-slate-800 to-black p-4 min-h-screen">
      <div className="w-full">
        <motion.div className="text-center" initial="hidden" animate="visible" variants={containerVariants}>

          <motion.div className="relative mb-8" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, type: "spring" }}>
            <div className="opacity-20 font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl select-none">404</div>
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="flex justify-center items-center bg-gradient-to-br from-primary to-yellow-800 shadow-2xl rounded-full w-24 h-24 animate-pulse">
                <HelpCircle size={48} className="text-white" />
              </div>
            </div>
          </motion.div>

          <motion.h1 className="mb-4 font-bold text-white text-2xl md:text-3xl xl:text-4xl" variants={itemVariants}>
            Page Not Found
          </motion.h1>

          <motion.p className="mx-auto mb-8 max-w-md text-gray-400" variants={itemVariants}>
            The page you're looking for doesn't exist or has been moved. Please check the URL or navigate back to the
            homepage.
          </motion.p>

          <motion.div className="flex sm:flex-row flex-col justify-center items-center gap-4 mb-8" variants={itemVariants}>
            <Link to="/" className="flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg w-full sm:w-auto text-white transition-colors">
              <Home size={18} />
              <span>Back to Home</span>
            </Link>

            <button onClick={() => navigate(-1)} className="flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-lg w-full sm:w-auto text-white transition-colors">
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </button>

            <button onClick={() => window.location.reload()} className="flex justify-center items-center gap-2 bg-white/5 hover:bg-white/10 px-6 py-3 rounded-lg w-full sm:w-auto text-white transition-colors">
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
          </motion.div>

          <motion.div className="bg-white/5 backdrop-blur-sm mx-auto p-6 border border-white/10 rounded-2xl w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]" variants={itemVariants}>
            <h2 className="mb-4 font-semibold text-white text-sm md:text-base xl:text-lg">You might be looking for</h2>
            <div className="gap-3 grid grid-cols-1 sm:grid-cols-2">
              <Link to="/user/dashboard" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-colors">
                <div className="flex justify-center items-center bg-blue-500/20 rounded-full w-8 h-8">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-400">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" x2="6" y1="1" y2="4" />
                    <line x1="10" x2="10" y1="1" y2="4" />
                    <line x1="14" x2="14" y1="1" y2="4" />
                  </svg>
                </div>
                <span className="text-white">Wallet Dashboard</span>
              </Link>

              <Link to="/user/buy" className="flex items-center gap-3 bg-white/5 hover:bg-white/10 p-3 rounded-xl transition-colors">
                <div className="flex justify-center items-center bg-green-500/20 rounded-full w-8 h-8">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-green-400">
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <span className="text-white">Buy Crypto</span>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
