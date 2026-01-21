"use client";

import Link from "next/link";
import { SubscribeForm } from "@/components/ui/SubscribeForm";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { MontrealMap } from "@/components/ui/MontrealMap";
import { motion } from "framer-motion";
import { Post } from "@/lib/beehiiv";


// Removed hardcoded recentIssues


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

interface HomePageClientProps {
  recentIssues: Post[];
}

export function HomePageClient({ recentIssues }: HomePageClientProps) {

  return (
    <div className="flex flex-col gap-0 pb-0 overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        className="px-6 pt-12 md:pt-24 pb-20 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-xl">
          <motion.h1
            className="text-5xl md:text-7xl font-serif text-primary leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            A weekly look behind the scenes of Montreal.
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-muted mb-10 max-w-lg leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Not headlines. Not press releases.<br />
            Context, signals, and perspective on the forces shaping the city.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <SubscribeForm />
            <p className="text-sm text-secondary mt-4 font-medium">
              Delivered once a week. Free to read.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="hidden lg:block relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <PhoneMockup>
            <div className="p-6 bg-white min-h-full">
              <div className="h-4 w-24 bg-gray-100 mb-8 rounded-full"></div>
              <h2 className="font-serif text-2xl text-primary mb-4 leading-tight">The Shift in Old Port</h2>
              <div className="h-40 w-full bg-gray-100 mb-6 rounded-sm"></div>
              <div className="space-y-3">
                <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                <div className="h-2 w-full bg-gray-100 rounded-full"></div>
                <div className="h-2 w-3/4 bg-gray-100 rounded-full"></div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="font-serif text-lg mb-3">Key Takeaways</h3>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-blue-50 rounded-full"></div>
                  <div className="h-2 w-5/6 bg-blue-50 rounded-full"></div>
                </div>
              </div>
            </div>
          </PhoneMockup>
        </motion.div>
      </motion.section>

      {/* What We Cover Section */}
      <motion.section
        className="px-6 py-24 max-w-7xl mx-auto w-full"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-5xl font-serif text-primary mb-6">What Montreal Backstage Covers</h2>
          <p className="text-xl text-muted leading-relaxed">
            Montreal is constantly changing, but most coverage focuses on isolated updates rather than what they mean.
            We connect the dots. Each issue focuses on a small number of developments that matter.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          <div className="space-y-3">
            <div className="h-1 w-12 bg-accent mb-4"></div>
            <h3 className="text-xl font-serif text-primary">City Decisions & Policy</h3>
            <p className="text-muted leading-relaxed">
              We track municipal and provincial decisions that directly affect Montrealers. Not political theater, just clarity on who benefits and who feels the impact.
            </p>
          </div>

          <div className="space-y-3">
            <div className="h-1 w-12 bg-accent mb-4"></div>
            <h3 className="text-xl font-serif text-primary">Real Estate Signals</h3>
            <p className="text-muted leading-relaxed">
              Housing, rentals, and development through the lens of city intelligence, not sales. Expect trends, numbers, and neighborhood level shifts.
            </p>
          </div>

          <div className="space-y-3">
            <div className="h-1 w-12 bg-accent mb-4"></div>
            <h3 className="text-xl font-serif text-primary">People, Power, & Projects</h3>
            <p className="text-muted leading-relaxed">
              Behind every policy change is a group of people making decisions. We highlight the founders, operators, and builders quietly shaping the city.
            </p>
          </div>

          <div className="space-y-3">
            <div className="h-1 w-12 bg-accent mb-4"></div>
            <h3 className="text-xl font-serif text-primary">Culture, Curated</h3>
            <p className="text-muted leading-relaxed">
              One thoughtful cultural highlight per issue. No event spam. No PR copy. Just something worth knowing about.
            </p>
          </div>

          <div className="space-y-3">
            <div className="h-1 w-12 bg-accent mb-4"></div>
            <h3 className="text-xl font-serif text-primary">What We’re Watching</h3>
            <p className="text-muted leading-relaxed">
              Early signals that are not yet obvious but are worth keeping an eye on. This section is about what may matter next.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Differentiation Section */}
      <motion.section
        className="bg-fog py-24 px-6 border-y border-secondary/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif text-primary mb-12 text-center">How This Is Different</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex-shrink-0 mt-1 flex items-center justify-center">
                  <span className="text-xs font-bold text-secondary">✕</span>
                </div>
                <div>
                  <h4 className="font-bold text-secondary mb-1">Not Breaking News</h4>
                  <p className="text-muted">We don't chase headlines or press releases.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-secondary/20 flex-shrink-0 mt-1 flex items-center justify-center">
                  <span className="text-xs font-bold text-secondary">✕</span>
                </div>
                <div>
                  <h4 className="font-bold text-secondary mb-1">Not Partisan</h4>
                  <p className="text-muted">We focus on practical impact, not political theater.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex-shrink-0 mt-1 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Why News Matters</h4>
                  <p className="text-muted">We explain the context and forces shaping the event.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex-shrink-0 mt-1 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">✓</span>
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1">Impact Focused</h4>
                  <p className="text-muted">Clarity on who benefits, who loses, and what changes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Inside a Typical Issue */}
      <motion.section
        className="py-24 px-6 max-w-6xl mx-auto w-full"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-serif text-primary mb-16 text-center">Inside a Typical Issue</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Backstage Brief",
              desc: "A short overview of what actually mattered this week and why.",
              icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            },
            {
              title: "City Signals",
              desc: "One or two policy or regulatory developments explained in plain language.",
              icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            },
            {
              title: "Real Estate Snapshot",
              desc: "A small number of metrics or developments that signal change.",
              icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
            },
            {
              title: "Backstage Access",
              desc: "A look at a person, project, or organization shaping the city quietly.",
              icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
            },
            {
              title: "City Life, Curated",
              desc: "One cultural note worth your time.",
              icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            },
            {
              title: "What We’re Watching",
              desc: "A forward looking signal to keep in mind over the coming weeks.",
              icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="group relative bg-white border border-gray-100 p-8 rounded-sm overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="mb-6 text-secondary group-hover:text-accent transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-serif text-primary mb-3">{item.title}</h3>
              <p className="text-muted leading-relaxed text-sm group-hover:text-primary transition-colors duration-300">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Sample Insights */}
      <motion.section
        className="bg-primary text-white py-24 px-6 border-y border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-serif mb-12 text-center">Sample Insights From Recent Issues</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <blockquote className="space-y-4">
              <p className="font-serif text-lg leading-relaxed text-gray-200">
                “Average rents moved less than expected this quarter, but <span className="text-white border-b border-accent">permit data suggests pressure is building</span> in two specific boroughs.”
              </p>
            </blockquote>
            <blockquote className="space-y-4">
              <p className="font-serif text-lg leading-relaxed text-gray-200">
                “A <span className="text-white border-b border-accent">zoning adjustment passed quietly</span> last month may change how mixed use developments are approved going forward.”
              </p>
            </blockquote>
            <blockquote className="space-y-4">
              <p className="font-serif text-lg leading-relaxed text-gray-200">
                “A mid sized employer expanding downtown is a <span className="text-white border-b border-accent">stronger signal</span> than it looks at first glance.”
              </p>
            </blockquote>
          </div>
          <div className="mt-12 text-center">
            <Link href="/archive" className="text-white/70 hover:text-white border-b border-white/30 hover:border-white transition-all pb-1">
              Read the full archives →
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Who This Is For */}
      <motion.section
        className="py-24 px-6 max-w-3xl mx-auto text-center"
        {...fadeInUp}
      >
        <h2 className="text-3xl font-serif text-primary mb-8">Who This Is For</h2>
        <p className="text-xl text-muted leading-relaxed mb-12">
          Montreal Backstage is for people who live and work in Montreal and want a better understanding of where the city is heading.
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          {["Professionals and operators", "Renters and homeowners", "Founders and small business owners", "People who care about the long term"].map((item) => (
            <div key={item} className="flex items-center gap-4 p-4 bg-fog rounded-sm">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              <span className="text-primary font-medium">{item}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Recent Issues */}
      <motion.section
        className="px-6 pb-24 max-w-7xl mx-auto w-full"
        {...fadeInUp}
      >
        <div className="flex justify-between items-baseline mb-12 border-b border-gray-200 pb-4">
          <h2 className="text-3xl md:text-4xl font-serif text-primary">Recent Issues</h2>
          <Link href="/archive" className="text-accent hover:underline decoration-accent underline-offset-4 tracking-wide font-medium">
            View Archive →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {recentIssues.length > 0 ? (
            recentIssues.map((issue) => (
              <Link
                key={issue.slug}
                href={`/issue/${issue.slug}`}
                className="group block border border-transparent hover:bg-fog p-8 rounded-sm transition-all hover:scale-[1.01]"
              >
                <div className="text-xs text-secondary mb-4 font-bold uppercase tracking-widest">
                  {new Date(issue.publish_date * 1000).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </div>
                <h3 className="text-2xl font-serif text-primary mb-4 group-hover:text-accent transition-colors leading-snug">
                  {issue.title}
                </h3>
                <p className="text-muted text-base leading-relaxed line-clamp-3">
                  {issue.subtitle || "Read the latest issue..."}
                </p>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 bg-fog rounded-sm">
              <p className="text-primary font-serif italic text-lg mb-4">No issues published yet.</p>
              <p className="text-muted text-sm">Sign up above to get the first one.</p>
            </div>
          )}
        </div>
      </motion.section>

      {/* Why It's Worth Your Time */}
      <motion.section
        className="py-24 px-6 max-w-4xl mx-auto w-full border-t border-secondary/10"
        {...fadeInUp}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-serif text-primary mb-6">Why It’s Worth Your Time</h2>
            <p className="text-muted leading-relaxed mb-6">
              Montreal Backstage is sent once a week. It is designed to be read in a few minutes and to leave you with a clearer picture of what is changing and why it matters.
            </p>
            <ul className="space-y-3 text-primary font-medium">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                No daily alerts
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                No endless threads
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full"></span>
                Just one thoughtful read per week
              </li>
            </ul>
          </div>
          <div className="bg-fog p-8 rounded-sm">
            <h3 className="font-serif text-xl text-primary mb-4">Editorial Approach</h3>
            <p className="text-muted text-sm leading-relaxed mb-4">
              Montreal Backstage is independent and editorially driven. Coverage is guided by:
            </p>
            <ul className="space-y-2 text-sm text-primary">
              <li className="pb-2 border-b border-secondary/10">Practical impact over headlines</li>
              <li className="pb-2 border-b border-secondary/10">Context over speed</li>
              <li>Clarity over opinion</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Final CTA */}
      <motion.section
        className="px-6 py-32 bg-primary text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif mb-8 text-white">Subscribe</h2>
          <p className="text-gray-300 mb-10 text-xl font-light">
            If you want a clearer view of what is shaping Montreal, subscribe to Montreal Backstage.
          </p>
          <div className="flex justify-center max-w-md mx-auto">
            <SubscribeForm className="w-full" placeholder="Your email address" />
          </div>
          <p className="text-sm text-gray-400 mt-6">
            Free. Weekly. Unsubscribe anytime.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
