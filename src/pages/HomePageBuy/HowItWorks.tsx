//Icons
import { UserPlus, CreditCard, Coins } from "lucide-react"
import { Link } from "react-router-dom"

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign up",
      description: "Create your account on desktop or mobile app with secure verification",
      step: "01",
    },
    {
      icon: CreditCard,
      title: "Payment method",
      description: "Choose from multiple secure payment options including bank transfer and cards",
      step: "02",
    },
    {
      icon: Coins,
      title: "Buy coins instantly",
      description: "Purchase cryptocurrency instantly and start building your investment portfolio",
      step: "03",
    },
  ]

  return (
    <section className="bg-lightBlack px-4 py-20">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl grotesk">How it works</h2>
          <div className="bg-gradient-to-r from-primary to-accent mx-auto rounded-full w-24 h-1"></div>
          <p className="mx-auto max-w-[60ch] text-sm md:text-base xl:text-lg">
            Get started with cryptocurrency investment in three simple steps
          </p>
        </div>

        <div className="gap-8 lg:gap-12 grid md:grid-cols-3">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={index} className="group relative">
                {index < steps.length - 1 && (
                  <div className="hidden md:block top-16 left-full z-0 absolute bg-gradient-to-r from-neutral-600 to-transparent w-full h-0.5 translate-x-6 transform"></div>
                )}

                <div className="z-10 relative bg-gradient-to-br from-neutral-600/10 to-neutral-600/5 backdrop-blur-sm p-8 border border-neutral-600/20 hover:border-primary/30 rounded-2xl group-hover:scale-105 transition-all duration-300 group-hover:transform">
                  <div className="-top-4 -right-4 absolute flex justify-center items-center bg-gradient-to-br from-primary to-accent shadow-lg rounded-full w-12 h-12 font-bold text-black text-sm md:text-base xl:text-lg">
                    {step.step}
                  </div>

                  <div className="flex justify-center items-center bg-gradient-to-br from-primary/20 group-hover:from-primary/30 to-accent/20 group-hover:to-accent/30 mb-6 rounded-xl size-16 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="mb-4 font-bold text-white group-hover:text-primary text-lg md:text-xl xl:text-2xl transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-neutral-200 leading-relaxed">{step.description}</p>

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            )
          })}
        </div>

        <Link to="/create" className="block mt-16 text-center">
          <button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 px-8 py-4 rounded-xl font-semibold text-black hover:scale-105 transition-all duration-300 transform">
            Get Started Today
          </button>
        </Link>
    </section>
  )
}
