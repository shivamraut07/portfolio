/**
 * Minimal desk / surface element for the cinematic studio scene.
 * Provides the horizontal surface that grounds the avatar and content.
 */
export function Desk() {
  return (
    <div className="relative w-full" aria-hidden="true">
      {/* Main desk surface */}
      <div className="h-[3px] bg-gradient-to-r from-transparent via-graphite-600 to-transparent" />

      {/* Desk body */}
      <div className="h-8 bg-gradient-to-b from-graphite-700/60 to-transparent" />

      {/* Subtle reflection line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
    </div>
  );
}
