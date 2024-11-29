function CustomTick({x, y, payload}:{x?:number, y?:number, payload?: { value:never }}) {
    return (
        <g transform={`translate(${x},${y})`}>
            <text
                x={0}
                y={0}
                dy={16}
                textAnchor="end"
                fill="hsl(var(--custom-tick-color))"
                transform="rotate(-35)"
            >
                {payload?.value}
            </text>
        </g>
    );
}

export default CustomTick;