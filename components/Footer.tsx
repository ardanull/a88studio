'use client'

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="container-custom py-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="text-xl font-semibold">a88digital. ®</div>
            <p className="mt-4 text-sm text-muted-foreground">
              A design and development studio creating exceptional digital products.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="text-sm font-medium mb-4">Company</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/#work" className="hover:text-foreground transition-colors">Work</a></li>
              <li><a href="/services" className="hover:text-foreground transition-colors">Services</a></li>
              <li><a href="/#about" className="hover:text-foreground transition-colors">About</a></li>
              <li><a href="/#contact" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-medium mb-4">Services</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/services#brand-strategy" className="hover:text-foreground transition-colors">Brand & Strategy</a></li>
              <li><a href="/services#product-design" className="hover:text-foreground transition-colors">Product Design</a></li>
              <li><a href="/services#development" className="hover:text-foreground transition-colors">Development</a></li>
              <li><a href="/services#growth-marketing" className="hover:text-foreground transition-colors">Growth & Marketing</a></li>
            </ul>
          </div>

          <div>
            <div className="text-sm font-medium mb-4">Legal</div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              <li><a href="/cookie" className="hover:text-foreground transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} a88digital. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="https://twitter.com/a88digital" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="https://instagram.com/a88digital" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Instagram</a>
            <a href="https://linkedin.com/company/a88digital" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href="https://dribbble.com/a88digital" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Dribbble</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
