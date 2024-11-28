export default function AttentionDotWrapper({visible, animate = false}: { visible: boolean, animate?: boolean }) {
    if (!visible) {
        return null;
    }
    return (
        <div
            className={`absolute -top-1 -right-1 bg-red-500 w-3 h-3 rounded-full z-[99999] ${animate ? "animate-ping" : ""}`}/>
    )
}