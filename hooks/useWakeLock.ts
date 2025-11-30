"use client";

import { useEffect, useRef } from "react";

export function useWakeLock() {
    const wakeLock = useRef<WakeLockSentinel | null>(null);

    useEffect(() => {
        const requestWakeLock = async () => {
            try {
                if ("wakeLock" in navigator) {
                    wakeLock.current = await navigator.wakeLock.request("screen");
                }
            } catch (err) {
                console.error(`${err} - Wake Lock not supported or rejected`);
            }
        };

        requestWakeLock();

        const handleVisibilityChange = () => {
            if (document.visibilityState === "visible") {
                requestWakeLock();
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            if (wakeLock.current) {
                wakeLock.current.release();
                wakeLock.current = null;
            }
        };
    }, []);
}
