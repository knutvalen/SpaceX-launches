import { useState, useEffect, useRef } from "react";

function useCountdown(seconds) {
    const [count, setCount] = useState(seconds);

    function useInterval(callback, delay) {
        const callbackRef = useRef();

        useEffect(() => {
            console.log(`useEffect callback`)
            callbackRef.current = callback;
        }, [callback]);

        useEffect(() => {
            console.log(`useEffect delay`)
            function tick() {
                callbackRef.current();
            }

            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    useInterval(() => {
        setCount(count - 1);
    }, 1000);

    return { count };
};

export default useCountdown;