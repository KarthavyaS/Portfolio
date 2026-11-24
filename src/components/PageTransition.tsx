"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Time for the curtain to fully cover the viewport. */
const COVER_MS = 220;
/** Short beat where the page is hidden before the curtain lifts. */
const HOLD_MS = 40;
/** Time for the curtain to lift and reveal the destination. */
const REVEAL_MS = 260;
/** Height of the fixed navbar so headings are not hidden underneath it. */
const SCROLL_OFFSET = 80;

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * Intercepts same-page navigation (navbar links, the brand logo, in-page CTAs),
 * sweeps a dark curtain over the viewport, jumps to the destination while it is
 * hidden, then lifts the curtain and eases the section into view.
 */
export default function PageTransition() {
  const [isCovering, setIsCovering] = useState(false);
  const isBusy = useRef(false);
  const timers = useRef<number[]>([]);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timers.current.push(id);
  }, []);

  useEffect(() => {
    return () => {
      timers.current.forEach((id) => window.clearTimeout(id));
      timers.current = [];
    };
  }, []);

  const jumpTo = useCallback((target: Element | null) => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    // Bypass the global smooth scrolling: the curtain hides the jump itself.
    root.style.scrollBehavior = "auto";

    if (target) {
      const top =
        window.scrollY + target.getBoundingClientRect().top - SCROLL_OFFSET;
      window.scrollTo(0, Math.max(0, top));
    } else {
      window.scrollTo(0, 0);
    }

    root.style.scrollBehavior = previousBehavior;

    if (target) {
      target.classList.remove("section-reveal");
      // Restart the animation if this section was just revealed.
      void (target as HTMLElement).offsetWidth;
      target.classList.add("section-reveal");
      window.setTimeout(() => target.classList.remove("section-reveal"), 720);
    }
  }, []);

  const navigate = useCallback(
    (hash: string) => {
      if (isBusy.current) return;

      const target = hash ? document.querySelector(hash) : null;
      if (hash && !target) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        jumpTo(target);
        return;
      }

      isBusy.current = true;
      setIsCovering(true);

      schedule(() => {
        jumpTo(target);

        try {
          const url = window.location.pathname + window.location.search + hash;
          window.history.pushState(null, "", url || window.location.pathname);
        } catch {
          // History can be unavailable in some embedded contexts.
        }

        schedule(() => {
          setIsCovering(false);
        }, HOLD_MS);
      }, COVER_MS);
    },
    [jumpTo, schedule]
  );

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      if (href.startsWith("#")) {
        if (href.length < 2) return;
        event.preventDefault();
        navigate(href);
        return;
      }

      // The brand logo links to "/": on the home page, treat it as "go to top".
      const url = new URL(anchor.href, window.location.href);
      if (
        url.origin === window.location.origin &&
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        event.preventDefault();
        navigate(url.hash);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [navigate]);

  return (
    <AnimatePresence onExitComplete={() => {
      isBusy.current = false;
    }}>
      {isCovering && (
        <motion.div
          key="page-curtain"
          className="page-curtain"
          initial={{ y: "100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%", transition: { duration: REVEAL_MS / 1000, ease: EASE } }}
          transition={{ duration: COVER_MS / 1000, ease: EASE }}
          aria-hidden="true"
        >
          <div className="page-curtain-grid" />
          <div className="page-curtain-edge" />
          <div className="page-curtain-mark font-display">
            <span className="page-curtain-caret" />
            NOW LOADING
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
