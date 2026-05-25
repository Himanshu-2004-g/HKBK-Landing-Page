import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  ChevronRight, 
  Award, 
  MapPin, 
  Users, 
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Globe,
  Quote,
  ArrowRight,
  Menu,
  X,
  Mail,
  Clock,
  Code,
  Smartphone,
  Network,
  ShieldCheck,
  PenTool,
  Megaphone,
  TrendingUp,
  PieChart,
  Settings,
  Calculator,
  FileText,
  Search,
  Landmark,
  Check
} from 'lucide-react';

// --- Data Models ---

const CAREER_OPPORTUNITIES = {
  bca: [
    { title: 'Software Developer / Programmer', icon: Code, count: 'High Demand' },
    { title: 'Web / Mobile App Developer', icon: Smartphone, count: 'Top Role' },
    { title: 'Network Engineer', icon: Network, count: 'IT Operations' },
    { title: 'Cybersecurity Analyst', icon: ShieldCheck, count: 'Security' },
    { title: 'UI/UX Designer', icon: PenTool, count: 'Design' },
  ],
  bba: [
    { title: 'Marketing / Brand Manager', icon: Megaphone, count: 'Marketing' },
    { title: 'Sales / Business Development', icon: TrendingUp, count: 'Growth' },
    { title: 'Human Resources (HR) Exec.', icon: Users, count: 'People' },
    { title: 'Financial / Investment Analyst', icon: PieChart, count: 'Finance' },
    { title: 'Operations Manager', icon: Settings, count: 'Management' },
  ],
  bcom: [
    { title: 'Accountant / Senior Accountant', icon: Calculator, count: 'Core Finance' },
    { title: 'Tax Consultant / GST Practitioner', icon: FileText, count: 'Taxation' },
    { title: 'Auditor (Internal / External)', icon: Search, count: 'Auditing' },
    { title: 'CA / CMA / CS (Certification Body)', icon: Award, count: 'Professional' },
    { title: 'Finance Exec. / Financial Controller', icon: Landmark, count: 'Corporate' },
  ]
};

const STATS = [
  { id: 1, value: '#10', label: 'Private University in India', icon: Award },
  { id: 2, value: '55+', label: 'Acres of Lush Campus', icon: MapPin },
  { id: 3, value: '200+', label: 'Highly Skilled Faculty', icon: Users },
  { id: 4, value: '20K+', label: 'Alumni Across Globe', icon: Globe },
];

const PROGRAMS = [
  {
    id: 'bca',
    title: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    image: 'https://i.postimg.cc/zB941Vg4/DBP05835.jpg',
    imagePosition: 'object-[center_30%]',
    duration: '3 Years',
    description: [
      'BCA + Cybersecurity, Ethical Hacking & Digital Forensics',
      'BCA + AI & ML + Cloud Computing + DevOps',
      'BCA + Data Science & Big Data Analytics',
      'BCA + AI Robotics + IoT'
    ],
    features: [
      'Full Stack Web Development (MEAN / MERN Stack)',
      'Python, Java, C++, Data Structures & Algorithms',
      'Cloud Computing — AWS, Azure & Google Cloud basics',
      'Database Management: MySQL, MongoDB, PostgreSQL',
      'AI/ML fundamentals & Data Analytics',
      '6-month Industry Internship Program'
    ]
  },
  {
    id: 'bba',
    title: 'BBA',
    fullName: 'Bachelor of Business Administration',
    image: 'https://i.postimg.cc/G2Z61HDn/DBP05877.jpg',
    imagePosition: 'object-[center_35%]',
    duration: '3 Years',
    description: [
      'BBA Aviation',
      'BBA + Logistics and Supply Chain Management',
      'BBA + Business Analytics and Digital Marketing'
    ],
    features: [
      'Marketing, Finance, HR & Operations Management',
      'Business Analytics & Data-Driven Decision Making',
      'Entrepreneurship & Startup Ecosystem Exposure',
      'Digital Marketing & E-Commerce Strategy',
      'Industry Guest Lectures & Live Case Studies',
      'MBA Pathway Preparation & GMAT/CAT Coaching'
    ]
  },
  {
    id: 'bcom',
    title: 'BCom',
    fullName: 'Bachelor of Commerce',
    image: 'https://i.postimg.cc/Bv7dMhQQ/DBP05896.jpg',
    imagePosition: 'object-[center_15%]',
    duration: '3 Years',
    description: [
      'B.Com + Addons',
      'B.Com + CA Foundation',
      'B.Com + ACCA (UK)'
    ],
    features: [
      'Financial Accounting, Auditing & Taxation',
      'GST, Income Tax & Corporate Law',
      'Tally ERP, SAP Finance & Accounting Software',
      'CA / CMA / CS Foundation Coaching Support',
      'Banking, Insurance & Financial Markets',
      'Business Communication & Soft Skills Training'
    ]
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    initials: 'AS',
    image: 'https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?q=80&w=1206&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Aditya Shetty',
    course: "BCA '23",
    role: 'Software Engineer, TCS',
    salary: '₹7 LPA',
    quote: "I searched for the best BCA colleges near me in Bangalore and visited several. HKBK stood out for the lab quality, faculty experience, and most importantly — the honest fee structure."
  },
  {
    id: 2,
    initials: 'NK',
    image: 'https://images.unsplash.com/photo-1591980896142-4e36328411ec?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Nisha Kumari',
    course: "BBA '22",
    role: 'Marketing Executive, Flipkart',
    salary: '₹5.2 LPA',
    quote: "HKBK had the best mix of academics and practical exposure. The live projects and guest lectures from real industry leaders made all the difference when I was interviewing."
  },
  {
    id: 3,
    initials: 'RV',
    image: 'https://images.unsplash.com/photo-1607081692251-d689f1b9af84?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    name: 'Rohan Verma',
    course: "BCom '24",
    role: 'Deloitte Trainee',
    badge: 'CA Foundation Cleared',
    quote: "As a commerce student looking for top colleges, I needed one that supports CA foundation. My professor's individual attention helped me clear it in the first attempt."
  }
];

const FAQS = [
  {
    question: "Is HKBK among the best BCA colleges in Bangalore?",
    answer: "Yes. HKBK is consistently ranked among the top BCA, BBA, and BCom colleges in Bangalore. We are NAAC accredited, Bangalore University affiliated, and have over 25 years of placement track record."
  },
  {
    question: "What is the fee structure for BCA, BBA, BCom?",
    answer: "HKBK offers one of the most competitive and transparent fee structures among colleges in Bangalore. Contact our admissions team for the exact 2025–26 fee structure and scholarship details."
  },
  {
    question: "How do I apply for BCA / BBA / BCom at HKBK?",
    answer: "Fill the enquiry form on this page and our counsellors will call you within 24 hours to walk you through the admission process — eligibility, documents, fees, and scholarship options."
  },
  {
    question: "Is there hostel facility available near HKBK?",
    answer: "Yes, HKBK provides separate hostel facilities for boys and girls with modern amenities — Wi-Fi, mess, 24×7 security — making it ideal for students from outside Bangalore."
  },
  {
    question: "Does BCom at HKBK support CA / CMA preparation?",
    answer: "Absolutely. Our BCom program includes CA/CMA Foundation coaching support, with faculty who are practising CAs themselves. The curriculum complements professional certification prep."
  }
];

// --- Components ---

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="https://i.postimg.cc/dV4p4qqP/HKBKS.png" 
            alt="HKBK Logo" 
            className={`h-12 md:h-16 object-contain transition-all ${isScrolled ? '' : 'brightness-0 invert'}`}
          />
        </div>
        <div className={`hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider ${isScrolled ? 'text-slate-600' : 'text-white/90'}`}>
          <a href="#programs" className="hover:text-hkbk-red transition-colors">Courses</a>
          <a href="#careers" className="hover:text-hkbk-red transition-colors">Careers</a>
          <a href="#placements" className="hover:text-hkbk-red transition-colors">Placements</a>
          <a href="#faq" className="hover:text-hkbk-red transition-colors">FAQs</a>
          <a href="#apply" className="bg-hkbk-red text-white px-5 py-2.5 rounded-md hover:bg-hkbk-blue hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex items-center gap-2 group">
            Apply Now
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        <button 
          className={`md:hidden p-2 ${isScrolled ? 'text-slate-900' : 'text-white'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden absolute top-full left-0 w-full shadow-lg"
          >
            <div className="px-6 py-4 flex flex-col gap-4 text-sm font-bold uppercase tracking-widest text-hkbk-blue">
              <a href="#programs" onClick={() => setMobileMenuOpen(false)}>Courses</a>
              <a href="#careers" onClick={() => setMobileMenuOpen(false)}>Careers</a>
              <a href="#placements" onClick={() => setMobileMenuOpen(false)}>Placements</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQs</a>
              <a href="#apply" onClick={() => setMobileMenuOpen(false)} className="bg-hkbk-red text-white px-5 py-3 rounded-md hover:bg-hkbk-blue transition-colors flex items-center justify-center gap-2 mt-2">
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[105vh] flex items-center justify-start bg-slate-900 py-24 md:py-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.postimg.cc/TYLgw0s3/bgggggg.png" 
          alt="University Campus" 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback if image isn't uploaded yet
            e.currentTarget.src = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=2866";
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-[85rem] mx-auto px-6 md:px-8 lg:px-12 w-full mt-12 md:mt-16">
        <div className="flex items-center">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-3 py-1 rounded bg-white/5 text-white/70 text-[0.7rem] font-medium uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-sm"
            >
              <span>NAAC Accredited · Bangalore's Top Degree College</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-[4rem] font-bold text-white tracking-tight leading-[1.1] mb-6"
            >
              Build Your Future At <span className="font-serif italic font-normal text-hkbk-red">The Best</span> College in Bangalore.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mb-10"
            >
              Consistently ranked among the top BCA, BBA, and BCom colleges. Affordable structure, guaranteed placement support, and real-world curriculum.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 mt-8 sm:mt-0"
            >
              <button className="w-full sm:w-auto px-8 py-4 bg-hkbk-red text-white rounded-md font-bold text-lg hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg">
                Start Your Journey <ChevronRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-hkbk-blue rounded-md font-bold text-lg hover:bg-slate-100 transition-all shadow-lg">
                Download Brochure
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 inline-block w-full max-w-full"
            >
              <div className="bg-white p-4 rounded-xl shadow-2xl border border-white/20 inline-block w-full sm:w-auto">
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-6">
                  <img src="https://i0.wp.com/sjbit.edu.in/wp-content/uploads/2021/07/NAAC-Logo-250x250-1.png?fit=250%2C250&ssl=1" alt="NAAC Accredited" className="w-16 h-16 sm:w-20 sm:h-20 object-contain mix-blend-multiply" />
                  <div className="hidden sm:block w-px h-12 bg-slate-200"></div>
                  <img src="https://upload.wikimedia.org/wikipedia/en/4/4e/UGC_India_Logo.png" alt="UGC Approved" className="w-16 h-16 sm:w-20 sm:h-20 object-contain mix-blend-multiply" />
                  <div className="hidden sm:block w-px h-12 bg-slate-200"></div>
                  <img src="https://www.uxdt.nic.in/wp-content/uploads/2024/05/all-india-council-of-technical-education-feature-all-india-council-of-technical-education-01.jpg" alt="AICTE Approved" className="w-24 h-16 sm:w-28 sm:h-20 object-contain scale-110 mix-blend-multiply brightness-110 contrast-125" />
                  <div className="hidden sm:block w-px h-12 bg-slate-200"></div>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKgNVvPevQCS8Mbv9gB6mORLU41CmNMNjNew&s" alt="VTU Affiliated" className="w-16 h-16 sm:w-20 sm:h-20 object-contain mix-blend-multiply brightness-110 contrast-125" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CareerOpportunitiesSection = () => {
  const [activeTab, setActiveTab] = useState<'bca' | 'bba' | 'bcom'>('bca');
  
  return (
    <section id="careers" className="py-24 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-4 leading-tight">
            Explore Limitless <br/>
            <span className="font-serif italic font-normal text-hkbk-blue">Career Opportunities</span>
          </h2>
          <p className="text-slate-500 text-lg">
            Find the path that's perfect for you. Our programs open doors to rewarding career opportunities in top industries.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          {[
            { id: 'bca', label: 'BCA / Tech Roles' },
            { id: 'bba', label: 'BBA / Management' },
            { id: 'bcom', label: 'BCom / Finance' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'bca' | 'bba' | 'bcom')}
              className={`px-8 py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-hkbk-blue text-white shadow-lg shadow-hkbk-blue/20 ring-2 ring-hkbk-blue ring-offset-2' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {CAREER_OPPORTUNITIES[activeTab].map((item, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-hkbk-blue hover:shadow-xl hover:shadow-hkbk-blue/5 transition-all duration-300 group flex items-center gap-5 cursor-pointer"
              >
                <div className="bg-slate-50 text-hkbk-blue w-14 h-14 rounded-xl flex shrink-0 items-center justify-center group-hover:bg-hkbk-blue group-hover:text-white transition-colors duration-300 shadow-sm border border-slate-100 group-hover:border-hkbk-blue">
                  <item.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1 leading-snug group-hover:text-hkbk-blue transition-colors">{item.title}</h4>
                  <p className="text-slate-400 text-xs font-medium">{item.count}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

const PLACEMENT_STATS = [
  { 
    id: 1, 
    value: '#10', 
    label: 'Private University\nin India', 
    theme: 'border border-slate-200 bg-white text-hkbk-blue',
    labelTheme: 'text-slate-800'
  },
  { 
    id: 2, 
    value: '55+', 
    label: 'Acres of Lush\nGreen Campus', 
    theme: 'bg-slate-100 text-slate-900',
    labelTheme: 'text-slate-600'
  },
  { 
    id: 3, 
    value: '200+', 
    label: 'Highly Skilled\nFaculty', 
    theme: 'bg-hkbk-blue text-white',
    labelTheme: 'text-white/90'
  },
  { 
    id: 4, 
    value: '20K+', 
    label: 'Alumini across\nthe Globe', 
    theme: 'bg-slate-100 text-slate-900',
    labelTheme: 'text-slate-600'
  },
];

const StatsBand = () => (
  <section id="placements" className="py-20 lg:py-28 bg-white relative z-20 border-y border-slate-100">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-8">
        
        {/* Left Content */}
        <div className="w-full lg:w-[35%] flex flex-col justify-start items-start text-left shrink-0">
          <div>
            <p className="text-lg font-medium text-slate-600 mb-2">Career Success</p>
            <h2 className="text-4xl lg:text-6xl font-serif italic text-slate-900 mb-6 tracking-tight leading-[1.1]">
              Placements
            </h2>
          </div>
          <button type="button" className="bg-hkbk-blue text-white font-bold py-4 px-8 rounded-md flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-md">
            APPLY NOW <ArrowRight className="w-5 h-5 ml-1" />
          </button>
        </div>
        
        {/* Right Stats Grid */}
        <div className="w-full lg:w-[65%] flex flex-col justify-between self-stretch">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5 mb-10 md:mb-12 lg:mb-6 flex-grow">
             {PLACEMENT_STATS.map((stat, i) => (
               <motion.div
                 key={stat.id}
                 initial={{ opacity: 0, y: 15 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className={`rounded-xl p-6 lg:p-8 flex flex-col justify-center items-start shadow-sm border border-slate-100 hover:shadow-md transition-shadow ${stat.theme}`}
               >
                 <h4 className="text-4xl lg:text-5xl font-bold mb-3 tracking-tighter shrink-0">
                   {stat.value}
                 </h4>
                 <p className={`text-sm md:text-base font-medium leading-snug whitespace-pre-line ${stat.labelTheme}`}>
                   {stat.label}
                 </p>
               </motion.div>
             ))}
          </div>
          <p className="text-slate-600 text-lg leading-relaxed max-w-3xl mt-auto">
            HKBK's dedicated placement cell works year-round to ensure students walk into outstanding careers — from aptitude training and mock interviews to live industry exposure.
          </p>
        </div>
        
      </div>
    </div>
  </section>
);

const RECRUITER_LOGOS = [
  { name: 'TCS', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Tata_Consultancy_Services_old_logo.svg/960px-Tata_Consultancy_Services_old_logo.svg.png' },
  { name: 'Accenture', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Accenture_logo.svg/960px-Accenture_logo.svg.png' },
  { name: 'Northern Trust', url: 'https://www.globalcustodian.com/wp-content/uploads/2025/02/png-clipart-northern-trust-bank-logo-nasdaq-investment-northern-company-text.png' },
  { name: 'Panacea Medical', url: 'https://www.panaceamedical.in/wp-content/uploads/2023/07/3.-PMT-Logo-01-768x868.jpg' },
  { name: 'Whyflex', url: 'https://i.postimg.cc/3RxDrKPC/new-logo33.png' },
  { name: 'Intellipaat', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Intellipaat-logo.png/960px-Intellipaat-logo.png' }
];

const Recruiters = () => (
  <section className="py-16 bg-white overflow-hidden border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
        Our Top Recruiters
      </h3>
    </div>
    <div className="flex overflow-hidden relative w-full pt-4 pb-8">
      <div className="flex min-w-full shrink-0 items-center justify-around gap-12 md:gap-32 animate-[marquee_30s_linear_infinite] px-12">
        {RECRUITER_LOGOS.map((company, i) => (
          <div key={i} className="w-32 md:w-48 h-16 md:h-20 flex items-center justify-center">
            <img src={company.url} alt={company.name} className={`max-h-full max-w-full object-contain transition-transform hover:scale-105 ${company.name === 'Northern Trust' ? 'mix-blend-multiply brightness-110 contrast-125' : 'mix-blend-multiply'}`} />
          </div>
        ))}
      </div>
      <div className="flex min-w-full shrink-0 items-center justify-around gap-12 md:gap-32 animate-[marquee_30s_linear_infinite] px-12" aria-hidden="true">
         {RECRUITER_LOGOS.map((company, i) => (
          <div key={`${i}-dup`} className="w-32 md:w-48 h-16 md:h-20 flex items-center justify-center">
            <img src={company.url} alt={company.name} className={`max-h-full max-w-full object-contain transition-transform hover:scale-105 ${company.name === 'Northern Trust' ? 'mix-blend-multiply brightness-110 contrast-125' : 'mix-blend-multiply'}`} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ProgramCard = ({ index, program }: { index: number, program: typeof PROGRAMS[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-full relative z-10 group hover:shadow-2xl transition-all duration-300"
  >
    {/* Card Image Header */}
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
      <img src={program.image} alt={program.title} className={`w-full h-full object-cover ${program.imagePosition || 'object-center'} group-hover:scale-105 transition-transform duration-700 ease-out`} />
      <div className="absolute top-4 left-4 bg-hkbk-blue text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
        <Clock className="w-3.5 h-3.5" />
        {program.duration}
      </div>
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-hkbk-red px-2 py-2 rounded-full shadow-md">
        <CheckCircle2 className="w-4 h-4" />
      </div>
    </div>
    
    <div className="p-6 flex flex-col flex-1">
      <div className="mb-4">
        <h4 className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-2">{program.title}</h4>
        <h3 className="text-xl font-bold text-slate-900 leading-tight mb-3 group-hover:text-hkbk-blue transition-colors line-clamp-2 min-h-[3.5rem]">
          {program.fullName}
        </h3>
        {/* We can hide descriptions to match a more compact info view, or just show list, let's keep description short */}
        {Array.isArray(program.description) ? (
          <ul className="space-y-2 mb-4">
            {program.description.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-slate-700 text-[0.85rem] font-semibold leading-snug">
                <Check className="w-4 h-4 text-hkbk-blue shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {program.description}
          </p>
        )}
      </div>
      
      <div className="pt-4 border-t border-slate-100 flex-1">
        <h4 className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-widest mb-3">Core features</h4>
        <ul className="space-y-3 mb-6">
          {program.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-hkbk-blue shrink-0" />
              <span className="leading-tight">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-auto pt-5 border-t border-slate-100">
        <button className="w-full py-3 bg-white border border-hkbk-blue text-hkbk-blue font-bold rounded-lg hover:bg-hkbk-blue hover:text-white transition-colors flex justify-center items-center gap-2 text-sm">
          Explore Details <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

const ProgramsSection = () => (
  <section id="programs" className="relative py-20 overflow-hidden bg-hkbk-blue">
    {/* Background Pattern / Img */}
    <div className="absolute inset-0 z-0">
      <img 
        src="https://i.postimg.cc/SsNcNrW3/DBP06299.jpg" 
        alt="Students Learning" 
        className="w-full h-full object-cover opacity-15 grayscale"
      />
      <div className="absolute inset-0 bg-hkbk-blue/80 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-t from-hkbk-blue via-transparent to-transparent opacity-80" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-6">
      <div className="text-center max-w-4xl mx-auto mb-20 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-white text-[0.7rem] font-bold uppercase tracking-widest mb-6 border border-white/20 backdrop-blur-sm">
          <GraduationCap className="w-4 h-4 text-hkbk-red" />
          <span>Undergraduate Degrees</span>
        </div>
        <h2 className="text-4xl md:text-6xl lg:text-[4rem] font-bold text-white tracking-tight leading-[1.1] mb-6">
          Choose Your <span className="font-serif italic text-white font-normal">Career Path</span>
        </h2>
        <p className="text-slate-200 md:text-lg max-w-3xl mx-auto">
          Top BCA, BBA, and BCom courses in Bangalore with transparent fee structure, expert faculty, and hands-on industry exposure from Day 1.
        </p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8 items-start relative z-20">
        {PROGRAMS.map((program, i) => (
          <ProgramCard key={program.id} index={i} program={program} />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 flex items-start gap-4 md:gap-6 relative z-20 max-w-4xl mx-auto"
      >
        <div className="bg-white/20 p-3 rounded-xl shrink-0">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-2">Eligibility FOR BCA/BBA/B.Com</h4>
          <p className="text-slate-200 text-sm md:text-base leading-relaxed">
            Pass in 10+2, A Level, IB, American 12th grade or equivalent. Candidates can apply both under General and Foreign/NRI categories.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

const AlumniSection = () => (
  <section id="alumni" className="py-24 bg-white relative">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
          Student <span className="font-serif italic font-normal text-hkbk-blue">Spotlights</span>
        </h2>
        <p className="text-slate-600 md:text-lg">
          Trusted by thousands of families. See where our degree programs have taken our recent graduates.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {TESTIMONIALS.map((testimonial, i) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-50 p-8 md:p-10 flex flex-col rounded-2xl border border-slate-200 hover:shadow-md transition-shadow"
          >
            <Quote className="w-8 h-8 text-slate-300 mb-6" />
            <p className="text-slate-700 text-sm leading-relaxed flex-1 mb-8 font-medium">
              "{testimonial.quote}"
            </p>
            <div className="flex items-center gap-4">
              {testimonial.image ? (
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-hkbk-blue/10 flex items-center justify-center text-hkbk-blue font-bold text-sm">
                  {testimonial.initials}
                </div>
              )}
              <div>
                <h4 className="text-slate-900 font-bold text-sm">{testimonial.name}</h4>
                <div className="flex flex-wrap items-center gap-1.5 text-[0.7rem] font-bold text-slate-500 uppercase tracking-wide mt-0.5">
                  <span>{testimonial.course}</span>
                  {testimonial.role && (
                    <>
                      <span>·</span>
                      <span className="text-hkbk-blue/80">{testimonial.role}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button
        className="w-full py-6 flex items-center justify-between gap-4 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-bold text-slate-900 group-hover:text-hkbk-blue transition-colors">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed pr-8 font-medium">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => (
  <section id="faq" className="py-24 bg-slate-50 border-t border-slate-200">
    <div className="max-w-3xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-12 text-center">
        Frequently Asked <span className="font-serif italic font-normal text-hkbk-blue">Questions</span>
      </h2>
      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <FAQItem key={i} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <img 
              src="https://i.postimg.cc/dV4p4qqP/HKBKS.png" 
              alt="HKBK Logo" 
              className="h-12 md:h-16 object-contain brightness-0 invert"
            />
          </div>
          <p className="text-white/70 text-sm leading-relaxed max-w-sm mb-6">
            Empowering students with industry-ready skills, robust placements, and holistic education in Bangalore since 1997.
          </p>
          <div className="flex items-center gap-2 text-white text-sm font-semibold">
             <Globe className="w-4 h-4"/> www.hkbk.edu.in
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 tracking-wide">Quick Links</h4>
          <ul className="space-y-3 text-sm text-white/80 font-medium">
            <li><a href="#programs" className="hover:text-white transition-colors">BCA Program</a></li>
            <li><a href="#programs" className="hover:text-white transition-colors">BBA Program</a></li>
            <li><a href="#programs" className="hover:text-white transition-colors">BCom Program</a></li>
            <li><a href="#placements" className="hover:text-white transition-colors">Placements</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 tracking-wide">Contact</h4>
          <ul className="space-y-4 text-sm text-white/80 font-medium">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-hkbk-red shrink-0" />
              <span>No 22/1, Nagawara, Bangalore<br/> Karnataka 560045, India</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-hkbk-red shrink-0" />
              <span>admissions@hkbk.edu.in</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50 font-medium tracking-wide">
        <p>© {new Date().getFullYear()} HKBK Group of Institutions. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate-600 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main>
        <Hero />
        <ProgramsSection />
        <CareerOpportunitiesSection />
        <StatsBand />
        <Recruiters />
        <AlumniSection />
        <FAQSection />
      </main>
      <Footer />
      
      {/* Global CSS for Tailwind Marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
      `}} />
    </div>
  );
}
