/* eslint-disable react/prop-types */
import Wavify from "react-wavify";

export default function Wave({ position }) {
    return (
        <div className={position}>
            <Wavify
                fill="rgba(255, 255, 255, 0.3)"
                options={{ height: 50, amplitude: 30, speed: 0.3, points: 4 }}
                className="absolute bottom-0 w-full"
            />
            <Wavify
                fill="rgba(255, 255, 255, 0.5)"
                options={{ height: 60, amplitude: 32.5, speed: 0.25, points: 4 }}
                className="absolute bottom-0 w-full"
            />
            <Wavify
                fill="#fff"
                options={{ height: 70, amplitude: 35, speed: 0.2, points: 4 }}
                className="absolute bottom-0 w-full"
            />
        </div>
    )
}