export default function Footer() {
  return (
    <footer className="border-t border-border-c bg-[var(--footer-bg)] mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-light to-primary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary/30">
                E
              </div>
              <span className="font-poppins font-bold text-xl tracking-tight">EcoMate</span>
            </div>
            <p className="text-text-muted text-sm max-w-sm">
              The premier all-in-one SaaS & Agency platform for Algerian E-Commerce merchants. Built to scale your business.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-text-main mb-4">Product</h4>
            <ul className="flex flex-col gap-2 text-sm text-text-muted">
              <li><a href="#features" className="hover:text-primary-light transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-primary-light transition-colors">Pricing</a></li>
              <li><a href="#how" className="hover:text-primary-light transition-colors">How it Works</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-text-main mb-4">Legal</h4>
            <ul className="flex flex-col gap-2 text-sm text-text-muted">
              <li><a href="#" className="hover:text-primary-light transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-light transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border-c text-text-muted text-xs">
          <p>© {new Date().getFullYear()} EcoMate. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center gap-1">
            Built at Incubateur de l&apos;Université de Bouira <span className="text-base">🇩🇿</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
