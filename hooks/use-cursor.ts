"use client";
import { useEffect } from "react";
export function useCursor(){useEffect(()=>{const cursor=document.querySelector<HTMLElement>(".cursor");if(!cursor)return;const move=(e:PointerEvent)=>{cursor.style.transform=`translate3d(${e.clientX}px,${e.clientY}px,0)`};window.addEventListener("pointermove",move,{passive:true});return()=>window.removeEventListener("pointermove",move)},[])}
