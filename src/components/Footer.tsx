import { Shield, Mail, Github, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contact" className="border-t border-primary/20 bg-space-dark py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary glow-blue" />
              <span className="text-xl font-bold text-gradient">Ethical AI</span>
            </div>
            <p className="text-muted-foreground">
              Building transparent, fair, and accountable AI systems for everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </a>
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#demo" className="text-muted-foreground hover:text-primary transition-colors">
                Demo
              </a>
              <a href="#team" className="text-muted-foreground hover:text-primary transition-colors">
                Team
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex gap-4">
              <a
                href="mailto:contact@ethicalai.com"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all duration-300 hover:glow-blue"
              >
                <Mail className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all duration-300 hover:glow-blue"
              >
                <Github className="w-5 h-5 text-primary" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all duration-300 hover:glow-blue"
              >
                <Linkedin className="w-5 h-5 text-primary" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Computer Science Department
              <br />
              University of Technology
            </p>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Ethical AI Project. All rights reserved.</p>
          <p className="mt-2">
            Built with cutting-edge AI and blockchain technology for a fairer future.
          </p>
        </div>
      </div>
    </footer>
  );
};
