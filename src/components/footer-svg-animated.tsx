export function FooterSVGAnimated() {
    return (
        <svg
            className="absolute bottom-0 left-0 z-0"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="100%"
            height="100%"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMax slice"
        >
            <defs>
                <linearGradient id="bg">
                    <stop
                        offset="0%"
                        style={{
                            stopColor: "hsl(262.1, 83.3%, 57.8%, 0.06)",
                        }}
                    ></stop>
                    <stop
                        offset="50%"
                        style={{ stopColor: "hsl(220, 14.3%, 95.9%, 0.6)" }}
                    ></stop>
                    <stop
                        offset="100%"
                        style={{ stopColor: "hsl(12, 76%, 61%, 0.2)" }}
                    ></stop>
                </linearGradient>

                <path
                    id="wave"
                    fill="url(#bg)"
                    d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
                />
            </defs>
            <g>
                <use xlinkHref="#wave" opacity=".3">
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="translate"
                        dur="10s"
                        calcMode="spline"
                        values="270 230; -334 180; 270 230"
                        keyTimes="0; .5; 1"
                        keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                        repeatCount="indefinite"
                    />
                </use>
                <use xlinkHref="#wave" opacity=".6">
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="translate"
                        dur="8s"
                        calcMode="spline"
                        values="-270 230;243 220;-270 230"
                        keyTimes="0; .6; 1"
                        keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                        repeatCount="indefinite"
                    />
                </use>
                <use xlinkHref="#wave" opacity=".9">
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="translate"
                        dur="6s"
                        calcMode="spline"
                        values="0 230;-140 200;0 230"
                        keyTimes="0; .4; 1"
                        keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                        repeatCount="indefinite"
                    />
                </use>
            </g>
        </svg>
    );
}
