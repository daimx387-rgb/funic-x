"use client";
import { motion } from "framer-motion";
const skills=[['01','Web Development','Fast, expressive websites with a considered technical core.'],['02','AI Solutions','Useful AI products built around real human behavior.'],['03','UI/UX','Interfaces that make complexity feel inevitable.'],['04','Branding','Distinct identities with room to grow.']];
export function Skills(){return <section id="skills" className="skills section"><span className="number">02</span><div><p className="label">WHAT I DO</p><div className="skill-list">{skills.map(([n,title,copy],i)=><motion.div key={title} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.1}}><b>{n}</b><h3>{title}</h3><p>{copy}</p></motion.div>)}</div></div></section>}
