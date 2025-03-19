import Image from "next/image"
import { Github, Linkedin, Mail, ExternalLink, Download, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <header className="fixed w-full bg-black/80 backdrop-blur-sm z-50 border-b border-navy-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-white">Rutwij Patil</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-gray-300 hover:text-white transition">
              About
            </a>
            <a href="#experience" className="text-gray-300 hover:text-white transition">
              Experience
            </a>
            <a href="#projects" className="text-gray-300 hover:text-white transition">
              Projects
            </a>
            <a href="#skills" className="text-gray-300 hover:text-white transition">
              Skills
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition">
              Contact
            </a>
          </nav>
          <a href="#" download>
            <Button variant="outline" className="border-navy-500 text-white hover:bg-navy-800">
              Resume <Download className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-black to-navy-950">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="text-white">Hello, I'm</span>
                <span className="block text-navy-400">Rutwij Patil</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-gray-300 mb-6">Engineering Management Graduate Student</h2>
              <p className="text-gray-400 mb-8 text-lg">
                Former Associate Consultant at Oracle with expertise in Java, Spring Boot, and backend development.
              </p>
              <div className="flex gap-4">
                <Button className="bg-navy-700 hover:bg-navy-600">Contact Me</Button>
                <Button variant="outline" className="border-navy-700 text-white hover:bg-navy-800">
                  View Projects
                </Button>
              </div>
            </div>
            <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-full overflow-hidden border-4 border-navy-700">
              <Image
                src="/placeholder.svg?height=320&width=320"
                alt="Rutwij Patil"
                width={320}
                height={320}
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-navy-950">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="border-b-2 border-navy-400 pb-2">About Me</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-gray-300 mb-4">
                I'm a graduate student in Engineering Management at Northeastern University with a background in
                Information Technology and experience as an Associate Consultant at Oracle.
              </p>
              <p className="text-gray-300 mb-4">
                My expertise lies in backend development using Java and Spring Boot, with a focus on optimizing services
                and improving efficiency. I'm passionate about solving complex problems and delivering high-quality
                solutions.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="text-navy-400 h-5 w-5" />
                  <span className="text-gray-300">Boston, MA</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-navy-400 h-5 w-5" />
                  <span className="text-gray-300">+1 (857) 340 3442</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-navy-400 h-5 w-5" />
                  <span className="text-gray-300">rutwijpatil25@gmail.com</span>
                </div>
              </div>
            </div>
            <div className="bg-navy-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-navy-400">Education</h3>
              <div className="mb-6">
                <h4 className="font-medium">MS in Engineering Management</h4>
                <p className="text-gray-400">Northeastern University | Sept 2024 – Present</p>
                <p className="text-gray-500 text-sm mt-1">
                  Coursework: Deterministic Operations Research, Digital Product Development, Supply Chain Engineering,
                  Engineering Probability & Statistics
                </p>
              </div>
              <div>
                <h4 className="font-medium">BE in Information Technology (Hons. in Cybersecurity)</h4>
                <p className="text-gray-400">Pune Institute of Computer Technology | Jun 2018 – Jun 2022</p>
                <p className="text-gray-500 text-sm mt-1">
                  Relevant Courses: Data Structures & Algorithms, Computer Networks, Computer Organization &
                  Architecture, Advanced Data Structures
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="border-b-2 border-navy-400 pb-2">Work Experience</span>
          </h2>

          <div className="space-y-8">
            {/* Experience Item 1 */}
            <div className="bg-navy-900 p-6 rounded-lg border-l-4 border-navy-400">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <h3 className="text-xl font-semibold">Associate Consultant</h3>
                <Badge className="bg-navy-700 text-white mt-2 md:mt-0">July 2022 – June 2024</Badge>
              </div>
              <h4 className="text-navy-400 mb-4">Oracle, Pune, India</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  Developed and optimized backend services using Java 17, Spring Boot, Maven, and REST APIs, improving
                  data processing efficiency by 15%.
                </li>
                <li>
                  Partnered with leading banks to resolve backend service issues, reducing system downtime by 20% and
                  enhancing customer experience.
                </li>
                <li>
                  Spearheaded backend workflow enhancements, cutting processing time by 30%, leading to a "Pat on the
                  Back Award" for outstanding contributions.
                </li>
              </ul>
            </div>

            {/* Experience Item 2 */}
            <div className="bg-navy-900 p-6 rounded-lg border-l-4 border-navy-400">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <h3 className="text-xl font-semibold">Business Analyst Intern</h3>
                <Badge className="bg-navy-700 text-white mt-2 md:mt-0">Dec 2021 – Mar 2022</Badge>
              </div>
              <h4 className="text-navy-400 mb-4">Dentsu Merkle Sokrati, Pune, India</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  Optimized data reporting processes using MS Excel and pivot tables, improving data visualization
                  efficiency by 25%.
                </li>
                <li>
                  Analyzed digital advertising campaign data, delivering insights that increased ROI by 15% and enhanced
                  ad targeting strategies.
                </li>
              </ul>
            </div>

            {/* Experience Item 3 */}
            <div className="bg-navy-900 p-6 rounded-lg border-l-4 border-navy-400">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <h3 className="text-xl font-semibold">Project Intern</h3>
                <Badge className="bg-navy-700 text-white mt-2 md:mt-0">Aug 2021 – Feb 2022</Badge>
              </div>
              <h4 className="text-navy-400 mb-4">Veritas Technologies, Pune, India</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  Designed a Clause Identification Model using Python and NLP techniques, achieving 85% accuracy in
                  identifying legal clause quality.
                </li>
                <li>
                  Conducted comprehensive research to enhance contract compliance monitoring, improving legal risk
                  assessments.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-navy-950">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="border-b-2 border-navy-400 pb-2">Projects</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <Card className="bg-navy-900 border-navy-700 overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="iNetflix Project"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">
                    iNetflix – Enhancing Accessibility for ASD Individuals
                  </h3>
                  <div className="flex gap-2">
                    <a href="#" className="text-navy-400 hover:text-navy-300">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  Developed a Netflix UI prototype using Figma, designed for users on the autism spectrum, winning 2nd
                  Place at Northeastern's Product Hackathon (Protothon).
                </p>
                <p className="text-gray-300 mb-4">
                  Implemented a monochromatic UI and sensory-friendly features to improve accessibility and engagement.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    Figma
                  </Badge>
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    UI/UX
                  </Badge>
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    Accessibility
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Project 2 */}
            <Card className="bg-navy-900 border-navy-700 overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Statistical Analysis Project"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">Statistical Analysis of US Flight Delays</h3>
                  <div className="flex gap-2">
                    <a href="#" className="text-navy-400 hover:text-navy-300">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  Conducted a data-driven analysis of flight delays across 10 major US airports, identifying key
                  patterns affecting air travel efficiency.
                </p>
                <p className="text-gray-300 mb-4">
                  Utilized boxplots and scatter plots to visualize trends and provide actionable insights for optimizing
                  flight scheduling.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    R
                  </Badge>
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    Minitab
                  </Badge>
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    MS Excel
                  </Badge>
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    Data Analysis
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Project 3 */}
            <Card className="bg-navy-900 border-navy-700 overflow-hidden">
              <div className="h-48 relative">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="MovieHolics Project"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">MovieHolics – Interactive Movie Database</h3>
                  <div className="flex gap-2">
                    <a href="#" className="text-navy-400 hover:text-navy-300">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-navy-400 hover:text-navy-300">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  Developed a movie review platform with login functionalities, allowing users to submit and rate films.
                </p>
                <p className="text-gray-300 mb-4">
                  Integrated database triggers to automatically filter out inappropriate language in reviews.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    MySQL
                  </Badge>
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    PHP
                  </Badge>
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    HTML
                  </Badge>
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    CSS
                  </Badge>
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    JavaScript
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Publication as a card */}
            <Card className="bg-navy-900 border-navy-700 overflow-hidden">
              <div className="h-48 relative">
                <Image src="/placeholder.svg?height=200&width=400" alt="Publication" fill className="object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-white">Clause Identification Model</h3>
                  <div className="flex gap-2">
                    <a href="#" className="text-navy-400 hover:text-navy-300">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">
                  Published research paper in the International Journal of Emerging Technologies & Innovative Research.
                </p>
                <p className="text-gray-300 mb-4">
                  Detailed the development and implementation of a Clause Identification Model for legal document
                  analysis.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    Research
                  </Badge>
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    NLP
                  </Badge>
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    Python
                  </Badge>
                  <Badge variant="outline" className="border-navy-500 text-navy-300">
                    Publication
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-black">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="border-b-2 border-navy-400 pb-2">Skills & Technologies</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-navy-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-6 text-navy-400">Programming</h3>
              <div className="space-y-4">
                <SkillCard title="Java 17" level={90} />
                <SkillCard title="C++" level={75} />
                <SkillCard title="R" level={70} />
                <SkillCard title="MySQL" level={85} />
                <SkillCard title="TypeScript" level={75} />
                <SkillCard title="JavaScript ES6" level={80} />
                <SkillCard title="HTML/CSS" level={85} />
              </div>
            </div>

            <div className="bg-navy-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-6 text-navy-400">Frameworks & Tools</h3>
              <div className="space-y-4">
                <SkillCard title="Spring Boot" level={90} />
                <SkillCard title="Angular 14" level={75} />
                <SkillCard title="Bootstrap 4" level={85} />
                <SkillCard title="REST APIs" level={90} />
                <SkillCard title="WordPress" level={70} />
                <SkillCard title="Minitab" level={75} />
                <SkillCard title="Maven" level={85} />
              </div>
            </div>

            <div className="bg-navy-900 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-6 text-navy-400">Developer Tools</h3>
              <div className="space-y-4">
                <SkillCard title="Git" level={90} />
                <SkillCard title="VS Code" level={85} />
                <SkillCard title="Visual Studio" level={80} />
                <SkillCard title="PyCharm" level={75} />
                <SkillCard title="Eclipse" level={85} />
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">
              <span className="border-b-2 border-navy-400 pb-2">Certifications</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-navy-900 p-6 rounded-lg border-l-4 border-navy-400">
                <h4 className="text-lg font-semibold">Oracle Cloud Infrastructure Foundations Associate</h4>
                <p className="text-gray-400 mt-2">August 2022</p>
              </div>
              <div className="bg-navy-900 p-6 rounded-lg border-l-4 border-navy-400">
                <h4 className="text-lg font-semibold">Google Technical Support Fundamentals</h4>
                <p className="text-gray-400 mt-2">May 2020 – July 2020</p>
              </div>
            </div>
          </div>

          {/* Leadership Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-center">
              <span className="border-b-2 border-navy-400 pb-2">Leadership & Organizations</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-navy-900 p-6 rounded-lg">
                <h4 className="text-lg font-semibold">PICT ACM Student Chapter</h4>
                <p className="text-gray-300 mt-2">Marketing Volunteer</p>
                <p className="text-gray-400 mt-1">Recognized by Capgemini for contributions in Marketing & Outreach</p>
              </div>
              <div className="bg-navy-900 p-6 rounded-lg">
                <h4 className="text-lg font-semibold">TEDxPICT</h4>
                <p className="text-gray-300 mt-2">Content Writer & Marketing Volunteer</p>
                <p className="text-gray-400 mt-1">Authored an article on digital privacy: Peeling the Onion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-navy-950">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="border-b-2 border-navy-400 pb-2">Get In Touch</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-gray-300 mb-6">
                I'm currently looking for new opportunities in software engineering and backend development. Whether you
                have a question or just want to say hi, I'll do my best to get back to you!
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="text-navy-400 h-5 w-5" />
                  <a href="mailto:rutwijpatil25@gmail.com" className="text-gray-300 hover:text-white">
                    rutwijpatil25@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="text-navy-400 h-5 w-5" />
                  <a href="tel:+18573403442" className="text-gray-300 hover:text-white">
                    +1 (857) 340 3442
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Linkedin className="text-navy-400 h-5 w-5" />
                  <a
                    href="https://linkedin.com/in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-white"
                  >
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <ExternalLink className="text-navy-400 h-5 w-5" />
                  <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
                    Portfolio
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-navy-900 p-6 rounded-lg">
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 bg-navy-800 border border-navy-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-navy-400"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 bg-navy-800 border border-navy-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-navy-400"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full p-3 bg-navy-800 border border-navy-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-navy-400"
                  ></textarea>
                </div>
                <Button className="w-full bg-navy-700 hover:bg-navy-600">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-black border-t border-navy-800">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} Rutwij Patil. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:rutwijpatil25@gmail.com" className="text-gray-400 hover:text-white">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function SkillCard({ title, level }: { title: string; level: number }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span>{title}</span>
        <span className="text-navy-400">{level}%</span>
      </div>
      <div className="w-full bg-navy-800 rounded-full h-2.5">
        <div className="bg-navy-400 h-2.5 rounded-full" style={{ width: `${level}%` }}></div>
      </div>
    </div>
  )
}

