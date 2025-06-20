import { useState, useEffect } from "react";

//Data
import testimonials from "../../../data/testimonial.json";

//Components
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

//Icons
import { Star, MapPin, ThumbsUp, Share, Flag, CheckCircle } from "lucide-react";

export default function TestimonialCarousel() {

  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 14000)

    return () => clearInterval(interval)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`size-4 ${i < rating ? "text-green-500 fill-current" : "text-neutral-300"}`} />
    ))
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length
      visible.push(testimonials[index])
    }
    return visible
  }

  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden">
        <div className="gap-6 grid md:grid-cols-2 lg:grid-cols-3">
          {getVisibleTestimonials().map((testimonial, index) => (
            <Card key={`${testimonial.id}-${currentIndex}-${index}`}
              className={`border-neutral-200 shadow-lg hover:shadow-xl transition-all duration-500 transform ${index === 1 ? "lg:scale-105 lg:z-10" : "lg:scale-95"
                }`}>
              <CardContent className="space-y-4 p-4 md:p-6 xl:p-8">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="border-2 border-neutral-200 size-12">
                        <AvatarImage src={testimonial.avatar || "/logo.svg"} alt={testimonial.name} />
                        <AvatarFallback className="bg-primary/20 font-semibold text-primary">
                          {testimonial.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      {testimonial.verified && (
                        <div className="-top-1 -right-1 absolute flex justify-center items-center bg-green-500 rounded-full size-5">
                          <CheckCircle className="size-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lightBlack">{testimonial.name}</h3>
                      <div className="flex items-center gap-2 text-neutral-500 text-sm">
                        <span>{testimonial.reviewCount} reviews</span>
                        <div className="flex items-center gap-1">
                          <MapPin className="size-3" />
                          <span>{testimonial.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-1">{renderStars(testimonial.rating)}</div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-lightBlack leading-tight">{testimonial.title}</h4>
                  <p className="text-neutral-600 leading-relaxed">{testimonial.content}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-neutral-200 border-t">
                  <button className="flex items-center gap-2 text-neutral-600 hover:text-primary transition-colors">
                    <ThumbsUp className="size-4" />
                    <span className="text-sm">Useful ({testimonial.helpful})</span>
                  </button>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1 text-neutral-600 hover:text-primary transition-colors">
                      <Share className="size-4" />
                      <span className="text-sm">Share</span>
                    </button>
                    <button className="text-neutral-600 hover:text-red-500 transition-colors">
                      <Flag className="size-4" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button key={index} onClick={() => setCurrentIndex(index)}
            className={`size-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-primary scale-125" : "bg-neutral-300 hover:bg-neutral-400"
              }`} />
        ))}
      </div>

      <div className="relative bg-neutral-100 p-4 md:p-6 xl:p-8 rounded-xl overflow-hidden">
        <div className="flex gap-6 animate-scroll">
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <div key={`scroll-${index}`} className="flex-shrink-0 bg-white shadow-sm p-4 border border-neutral-200 rounded-lg w-80">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="size-8">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback className="bg-primary/20 text-primary text-xs">
                    {testimonial.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-lightBlack text-sm">{testimonial.name}</div>
                  <div className="flex gap-1">{renderStars(testimonial.rating)}</div>
                </div>
              </div>
              <p className="text-neutral-600 text-sm line-clamp-3">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
