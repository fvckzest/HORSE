"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ScratchMedia from "@/components/ScratchMedia";

export default function ScratchFloatReel({ entries }) {
  const copyCount = 5;
  const middleStart = entries.length * Math.floor(copyCount / 2);
  const scrollerRef = useRef(null);
  const itemRefs = useRef([]);
  const resetTimerRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedLoopIndex, setSelectedLoopIndex] = useState(middleStart);

  const loopedEntries = useMemo(
    () =>
      Array.from({ length: copyCount }, () => entries)
        .flat()
        .map((entry, index) => ({
        ...entry,
        loopIndex: index,
        originalIndex: index % entries.length
      })),
    [entries]
  );

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    const item = itemRefs.current[middleStart];
    if (!scroller || !item) return;

    scroller.scrollLeft =
      item.offsetLeft + item.offsetWidth / 2 - scroller.clientWidth / 2;
    setSelectedLoopIndex(middleStart);
    setSelectedIndex(0);
  }, [middleStart]);

  useEffect(() => {
    return () => window.clearTimeout(resetTimerRef.current);
  }, []);

  function centerEntry(index) {
    const scroller = scrollerRef.current;
    const item = itemRefs.current[index];

    if (!scroller || !item) return;

    scroller.scrollTo({
      left: item.offsetLeft + item.offsetWidth / 2 - scroller.clientWidth / 2,
      behavior: "auto",
    });
  }

  function resetToMiddleCopy(visibleIndex) {
    if (visibleIndex >= middleStart && visibleIndex < middleStart + entries.length) {
      return;
    }

    const scroller = scrollerRef.current;
    const logicalIndex = visibleIndex % entries.length;
    const middleIndex = middleStart + logicalIndex;
    const currentItem = itemRefs.current[visibleIndex];
    const middleItem = itemRefs.current[middleIndex];

    if (!scroller || !currentItem || !middleItem) return;

    const currentCenter = currentItem.offsetLeft + currentItem.offsetWidth / 2;
    const middleCenter = middleItem.offsetLeft + middleItem.offsetWidth / 2;

    scroller.classList.add("is-resetting");
    scroller.scrollTo({
      left: scroller.scrollLeft + middleCenter - currentCenter,
      behavior: "instant"
    });

    window.requestAnimationFrame(() => {
      scroller.classList.remove("is-resetting");
    });

    setSelectedLoopIndex(middleIndex);
  }

  function updateSelectedEntry() {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollerBox = scroller.getBoundingClientRect();
    const scrollerCenter = scrollerBox.left + scrollerBox.width / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      const itemBox = item.getBoundingClientRect();
      const itemCenter = itemBox.left + itemBox.width / 2;
      const distance = Math.abs(scrollerCenter - itemCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    const logicalIndex = closestIndex % entries.length;
    setSelectedIndex(logicalIndex);
    setSelectedLoopIndex(closestIndex);

    window.clearTimeout(resetTimerRef.current);
    resetTimerRef.current = window.setTimeout(() => {
      resetToMiddleCopy(closestIndex);
    }, 180);
  }

  function handleWheel(event) {
    const scroller = scrollerRef.current;
    if (!scroller || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

    event.preventDefault();
    scroller.scrollBy({
      left: event.deltaY,
      behavior: "smooth"
    });
  }

  function handleEntryClick(event, index) {
    event.preventDefault();
    centerEntry(index);
  }

  function getDistanceClass(index) {
    const distance = Math.abs(index - selectedLoopIndex);

    if (distance === 0) return "is-selected";
    if (distance === 1) return "is-neighbor";
    return "is-distant";
  }

  return (
    <>
      <div
        className="scratch-scroll"
        onScroll={updateSelectedEntry}
        onWheel={handleWheel}
        ref={scrollerRef}
      >
        {loopedEntries.map((entry, index) => {
          return (
            <section
              className={`scratch-float-entry ${getDistanceClass(index)}`}
              id={index >= middleStart && index < middleStart + entries.length ? entry.slug : undefined}
              key={`${entry.slug}-${index}`}
              aria-labelledby={`${entry.slug}-title`}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
            >
              <div className="scratch-float-meta">
                <p>{entry.medium}</p>
                <h1 id={`${entry.slug}-title`}>{entry.title}</h1>
                <time dateTime={entry.date}>{entry.date}</time>
              </div>

              <button
                type="button"
                className="scratch-float-art"
                aria-label={`center ${entry.title}`}
                onClick={(event) => handleEntryClick(event, index)}
              >
                <ScratchMedia entry={entry} priority={index === entries.length} />
              </button>

              <p className="scratch-float-caption">{entry.excerpt}</p>
              <Link className="scratch-float-open" href={`/scratch/${entry.slug}`}>
                open note
              </Link>
            </section>
          );
        })}
      </div>

      <div className="scratch-float-dots" aria-label="scratch entries">
        {entries.map((entry, index) => (
          <a
            className={index === selectedIndex ? "is-selected" : ""}
            href={`#${entry.slug}`}
            key={entry.slug}
            aria-label={entry.title}
            onClick={(event) => {
              event.preventDefault();
              centerEntry(middleStart + index);
            }}
          />
        ))}
      </div>
    </>
  );
}
