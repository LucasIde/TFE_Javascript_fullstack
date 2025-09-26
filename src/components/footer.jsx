export default function FooterComponent() {
    return (
        <>
            <footer className="py-8 footerComp">
              <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Logo ou Nom */}
                <div className="text-lg footerComp_logo">
                  🎮 EventPlanner
                </div>

                {/* Navigation secondaire */}
                <div className="flex gap-6 text-sm footerComp_creator">
                    Made by Lucas Ide
                </div>

                {/* Mentions */}
                <div className="text-xs text-center md:text-right footerComp_location">
                  Projet réalisé dans le cadre d’une formation Javascript Fullstack à DigitalCity• © 2025
                </div>
              </div>
            </footer>
        </>
    );
}
