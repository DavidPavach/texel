import { useState } from "react";
import { Link } from "react-router-dom";

//Components
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

//Icons
import { ArrowRight, ChevronRight } from "lucide-react";
import { Home2 } from "iconsax-react";



export function ReusableHero({ badge, title, subtitle, description, primaryCTA, secondaryCTA, backgroundImage,
    backgroundGradient = "", variant = "default", size = "lg", breadcrumbs, stats, features }: HeroProps) {

    const [imageLoaded, setImageLoaded] = useState<boolean>(false);

    const titleSizes = {
        sm: "font-bold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl grotesk",
        md: "font-bold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl grotesk",
        lg: "font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl grotesk",
        xl: "font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl grotesk",
    }

    const renderBreadcrumbs = () => {

        if (!breadcrumbs || breadcrumbs.length === 0) return null;

        return (
            <nav className="flex items-center gap-2 mb-6 text-neutral-400">
                <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Home2 variant="Bold" className="size-4" />
                    <span>Home</span>
                </Link>
                {breadcrumbs.map((crumb, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <ChevronRight className="size-5" />
                        {crumb.href ? (
                            <Link to={crumb.href} className="hover:text-primary transition-colors">
                                {crumb.label}
                            </Link>
                        ) : (
                            <span className="font-medium text-neutral-100">{crumb.label}</span>
                        )}
                    </div>
                ))}
            </nav>
        )
    }

    const renderContent = () => (
        <div className={`space-y-6 ${variant === "centered" ? "text-center" : ""}`}>
            {breadcrumbs && renderBreadcrumbs()}

            {badge && (
                <Badge className="bg-primary/20 hover:bg-primary/20 px-4 py-2 w-fit text-primary">
                    {badge.icon && <span className="mr-2">{badge.icon}</span>}
                    {badge.text}
                </Badge>
            )}

            <div className="space-y-4">
                <h1 className={`font-bold ${titleSizes[size]} leading-tight`}>{title}</h1>

                {subtitle && <h2 className="font-semibold text-primary text-base sm:text-lg md:text-xl xl::text-2xl">{subtitle}</h2>}
                <p className="mx-auto max-w-[60ch] text-neutral-300 text-sm md:text-base xl:text-lg leading-relaxed">{description}</p>
            </div>

            {features && features.length > 0 && (
                <div className="flex flex-wrap gap-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-neutral-700">
                            {feature.icon && <span className="text-green-500">{feature.icon}</span>}
                            <span>{feature.text}</span>
                        </div>
                    ))}
                </div>
            )}

            {(primaryCTA || secondaryCTA) && (
                <div className="flex sm:flex-row flex-col sm:justify-center gap-4">
                    {primaryCTA && (
                        <Button className="group bg-primary hover:bg-primary/90 py-5 font-semibold text-black" onClick={primaryCTA.onClick} asChild={!!primaryCTA.href}>
                            {primaryCTA.href ? (
                                <Link to={primaryCTA.href}>
                                    {primaryCTA.icon && <span className="mr-2">{primaryCTA.icon}</span>}
                                    {primaryCTA.text}
                                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            ) : (
                                <>
                                    {primaryCTA.icon && <span className="mr-2">{primaryCTA.icon}</span>}
                                    {primaryCTA.text}
                                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </Button>
                    )}

                    {secondaryCTA && (
                        <Button variant="outline" className="hover:bg-neutral-50 px-8 py-3 border-neutral-300" onClick={secondaryCTA.onClick} asChild={!!secondaryCTA.href}>
                            {secondaryCTA.href ? (
                                <Link to={secondaryCTA.href}>
                                    {secondaryCTA.icon && <span className="mr-2">{secondaryCTA.icon}</span>}
                                    {secondaryCTA.text}
                                </Link>
                            ) : (
                                <>
                                    {secondaryCTA.icon && <span className="mr-2">{secondaryCTA.icon}</span>}
                                    {secondaryCTA.text}
                                </>
                            )}
                        </Button>
                    )}
                </div>
            )}

            {stats && stats.length > 0 && (
                <div className="gap-6 grid grid-cols-2 md:grid-cols-4 pt-8 border-neutral-200 border-t">
                    {stats.map((stat, index) => (
                        <div key={index} className="space-y-2 text-center">
                            {stat.icon && (
                                <div className="flex justify-center items-center bg-primary/20 mx-auto rounded-xl size-12 text-primary">
                                    {stat.icon}
                                </div>
                            )}
                            <div className="font-bold text-lightBlack text-lg md:text-xl xl:text-2xl">{stat.value}</div>
                            <div className="text-neutral-600 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

    if (variant === "split") {
        return (
            <section className={`relative overflow-hidden py-8 md:py-10`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient}`} />

                <div className="relative mx-auto px-4 max-w-7xl">
                    <div className="items-center gap-12 grid lg:grid-cols-2">
                        <div>{renderContent()}</div>

                        {backgroundImage && (
                            <div className="relative">
                                <Card className="shadow-2xl overflow-hidden">
                                    {!imageLoaded && <div className="bg-neutral-200 w-full h-96 animate-pulse" />}
                                    <img src={backgroundImage || "/logo.svg"} alt="Hero illustration"
                                        className={`w-full h-96 object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"
                                            }`}
                                        onLoad={() => setImageLoaded(true)}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement
                                            target.src = "/logo.svg?height=400&width=600"
                                            setImageLoaded(true)
                                        }}
                                    />
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        )
    }

    if (variant === "minimal") {
        return (
            <section className={`relative py-8 md:py-10`}>
                <div className="mx-auto px-4 max-w-4xl">{renderContent()}</div>
            </section>
        )
    }

    return (
        <section className={`relative overflow-hidden py-8 md:py-10`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${backgroundGradient}`} />
            {backgroundImage && (
                <div className="absolute inset-0 opacity-10">
                    <img src={backgroundImage || "/logo.svg"} alt="Background" className="w-full h-full object-cover"
                        onError={(e) => { const target = e.target as HTMLImageElement; target.style.display = "none" }} />
                </div>
            )}

            <div className="relative">{renderContent()}</div>
        </section>
    )
}
