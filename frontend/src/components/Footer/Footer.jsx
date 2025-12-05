export default function Footer() {
  return (
    <footer className="bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="text-xl font-light tracking-widest text-white mb-4">
                DESIGN STUDIO
              </div>
              <p className="text-gray-400 font-light text-sm">
                Creating spaces that inspire, innovate, and transform lives.
              </p>
            </div>

            <div>
              <h4 className="text-white font-light mb-4 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white">Portfolio</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-light mb-4 text-sm uppercase tracking-wider">
                Services
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white">Residential Design</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Commercial Spaces</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Hospitality Design</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-light mb-4 text-sm uppercase tracking-wider">
                Contact
              </h4>
              <ul className="space-y-3">
                <li className="text-gray-400">hello@designstudio.com</li>
                <li className="text-gray-400">+1 (555) 123-4567</li>
                <li className="text-gray-400">123 Design Avenue, NY</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-500 text-sm font-light">
              © {new Date().getFullYear()} Design Studio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
