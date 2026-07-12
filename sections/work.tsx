"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import workGallery from "@/assets/work-gallery.png";

const projects = [
  ["DAIM X IDENTITY", "Branding", "18%"],
  ["DAIM X ASSISTANT", "AI Product", "50%"],
  ["VELOCITY ONE", "Product Design", "83%"],
] as const;

export function Work() {
  return <section id="work" className="work section">
    <div className="section-top"><p className="label">SELECTED WORK</p><a href="#footer">VIEW ALL WORK <ArrowUpRight/></a></div>
    <div className="projects">
      {projects.map(([title, tag, position], index) => <motion.article key={title} className={`card card-${index}`} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .12, duration: .75 }}>
        <div className="art group">
          <Image src={workGallery} alt={`${title} project visual`} fill sizes="(max-width: 800px) 100vw, 33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" style={{ objectPosition: `${position} 49%` }}/>
          <span className="sr-only">{title}</span>
        </div>
        <div><p>{title}</p><small>{tag}</small><button aria-label={`View ${title}`}><ArrowUpRight/></button></div>
      </motion.article>)}
    </div>
  </section>;
}
