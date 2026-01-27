import { PageHeader } from "@/components/common/PageHeader";
import { InlineAlert } from "@/components/ui/InlineAlert";

export function AestheticPage() {
  return (
    <div className="space-y-section container px-standard pb-section">
      <PageHeader pageTitle="Aesthetic Playground" level="h2" />

      <InlineAlert variant="primary">
        <div className="flex-1">
          <p className="font-bold">Creative Experimentation Zone</p>
          <p className="text-sm mt-1">
            This page showcases various aesthetic styles using pure CSS and
            Tailwind utilities. These are explorations in visual design, not
            production components.
          </p>
        </div>
      </InlineAlert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-standard">
        {/* Neobrutalism */}
        <div className="border-8 border-black bg-cyan-400 p-0 transform shadow-[12px_12px_0px_rgba(0,0,0,1)]">
          <h2
            className="text-4xl bg-white pt-8 pl-8 border-b-4 border-black font-black tracking-wider mb-3 text-black font-mono"
            style={{ fontFamily: "Courier New, monospace" }}
          >
            NEO<span className="text-cyan-400">█</span>BRUT
          </h2>
          <p className="text-xs font-black leading-tight pl-8 text-black font-mono mb-3">
            RAW. UNREFINED. NEON CHAOS.
          </p>
          <div className="flex gap-2 pl-8 pb-8">
            <div className="border-3 border-black bg-yellow-300 px-2 py-1 text-xs font-black text-black">
              █
            </div>
            <div className="border-3 border-black bg-cyan-300 px-2 py-1 text-xs font-black text-black">
              █
            </div>
            <div className="border-3 border-black bg-pink-400 px-2 py-1 text-xs font-black text-black">
              █
            </div>
          </div>
        </div>

        {/* Vaporwave */}
        <div className="bg-linear-to-br from-pink-400 via-purple-400 to-blue-400 p-8 relative overflow-hidden">
          {/* Grid background */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
           linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
         `,
              backgroundSize: "20px 20px",
            }}
          ></div>

          {/* Floating geometric shapes */}
          <div className="absolute top-4 right-8 w-24 h-24 border-4 border-white/30 rotate-45"></div>
          <div className="absolute bottom-8 left-4 w-16 h-16 bg-cyan-300/20 rounded-full"></div>

          {/* Glowing star */}
          <div className="absolute inset-0 opacity-30 text-9xl font-black text-purple-900 mix-blend-multiply animate-pulse">
            ✦
          </div>

          {/* Retro scan lines */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
            }}
          ></div>

          {/* Japanese text aesthetic */}
          <div className="absolute top-2 left-2 text-white/40 text-sm font-light">
            永遠
          </div>

          <h2
            className="text-3xl font-light italic mb-3 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] relative z-10"
            style={{ letterSpacing: "0.5em" }}
          >
            Ｖ Ａ Ｐ Ｏ Ｒ Ｗ Ａ Ｖ Ｅ
          </h2>

          <div className="border-t border-white/30 my-3 relative z-10"></div>

          <p className="text-sm font-thin text-white/90 relative z-10 leading-relaxed">
            Lost in digital dreams. Neon-soaked nostalgia. Aesthetic
            transcendence through the digital void.
          </p>

          {/* Retro computer icons */}
          <div className="mt-4 flex gap-3 text-2xl relative z-10 opacity-60">
            <span>💾</span>
            <span>📼</span>
            <span>🌴</span>
          </div>

          {/* Glitch effect text */}
          <div className="bottom-2 right-2 text-xs text-cyan-200/60 font-mono relative z-10">
            [ A E S T H E T I C ]
          </div>
        </div>

        {/* Dark Academia*/}
        <div className="bg-linear-to-br from-stone-950 via-neutral-950 to-stone-950 border-4 border-stone-800 p-8 relative overflow-hidden">
          {/* Aged paper texture */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]"></div>

          {/* Large raven silhouette */}
          <div className="absolute -top-8 -left-8 text-[14rem] opacity-5 text-stone-700 leading-none">
            🐦‍⬛
          </div>

          {/* Gothic arch corners */}
          <div className="absolute top-0 left-0 text-stone-700/30 text-6xl leading-none">
            ╱
          </div>
          <div className="absolute top-0 right-0 text-stone-700/30 text-6xl leading-none">
            ╲
          </div>

          {/* Ornate top border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-stone-600 to-transparent"></div>

          <h2
            className="text-3xl font-serif text-stone-300 mb-3 relative z-10 tracking-wide"
            style={{
              fontFamily: "'Crimson Text', 'Playfair Display', serif",
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            <span className="text-stone-500">𝔇</span>ark
            <span className="text-stone-500"> 𝔄</span>cademia
          </h2>

          {/* Gothic divider with skull */}
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-stone-700 to-stone-700"></div>
            <span className="text-stone-600 text-sm">☠</span>
            <div className="h-px flex-1 bg-linear-to-l from-transparent via-stone-700 to-stone-700"></div>
          </div>

          <p className="text-sm text-stone-400 font-serif leading-relaxed relative z-10 mb-4">
            Dust-choked manuscripts and forbidden knowledge. Cobwebbed
            chandeliers cast shadows on marble busts. The dead whisper from
            between leather-bound pages, and every corner hides a secret best
            left buried.
          </p>

          {/* Latin quote - memento mori style */}
          <p className="text-xs text-stone-600 font-serif italic relative z-10 text-center mb-4 border-t border-b border-stone-800 py-2">
            "Memento Mori"
          </p>
          {/* Bottom gothic ornament */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-stone-600 to-transparent"></div>

          {/* Mourning crescent moon */}
          <div className="absolute bottom-3 right-3 text-stone-700/40 text-2xl">
            ☽
          </div>
        </div>

        {/* Pure Nonsense Collage */}
        <div className="bg-linear-to-br from-yellow-200 via-green-200 to-pink-200 border-8 border-black p-8 relative overflow-hidden">
          <div className="absolute -top-5 left-[10%] text-7xl rotate-45 opacity-70">
            🦆
          </div>
          <div className="absolute top-[15%] right-[5%] text-6xl rotate-[-30deg] opacity-60">
            🥒
          </div>
          <div className="absolute top-[40%] -left-2.5 text-8xl rotate-12 opacity-50">
            👁️
          </div>
          <div className="absolute bottom-[20%] right-[15%] text-7xl rotate-[-60deg] opacity-75">
            🧲
          </div>
          <div className="absolute bottom-[5%] left-[20%] text-6xl rotate-90 opacity-40">
            🎺
          </div>
          <div className="absolute top-[50%] right-[30%] text-9xl opacity-20 rotate-25 text-black">
            ?
          </div>
          <div className="absolute bottom-[30%] right-[5%] text-5xl -rotate-45 opacity-80">
            🥩
          </div>
          <div className="absolute top-[10%] right-[40%] text-7xl rotate-60 opacity-60">
            🧅
          </div>
          <div className="absolute bottom-[10%] -right-1.25 text-8xl rotate-[-15deg] opacity-35">
            ⚡
          </div>

          <h2 className="text-5xl font-black text-purple-900 mb-4 transform rotate-[-8deg] relative z-10">
            ???VOID???
          </h2>
          <p className="text-xs font-mono text-black relative z-10 mb-2">
            WHY IS THE PICKLE HERE. WHY NOT.
          </p>
          <p className="text-lg font-black text-red-600 transform rotate-6 relative z-10">
            DUCK SAYS HELLO
          </p>
          <p className="text-xs italic text-green-900 transform -rotate-12 relative z-10">
            meaning has left the building
          </p>
          <div className="mt-4 relative z-10 text-4xl">🌀 🪐 🎪 🍝</div>
        </div>

        {/* Gothic */}
        <div className="bg-black border-4 border-purple-900 p-8 relative overflow-hidden">
          {/* Subtle gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-900 via-pink-600 to-purple-900"></div>

          {/* Delicate filigree corner */}
          <div className="absolute top-4 right-4 text-purple-900/30 text-4xl leading-none">
            ✦
          </div>

          <h2 className="text-2xl font-black text-purple-400 mb-3 tracking-[0.2em]">
            GOTHIC
          </h2>

          {/* Elegant divider */}
          <div className="w-16 h-px bg-linear-to-r from-purple-600 to-transparent mb-4"></div>

          <p className="text-sm text-purple-200 leading-relaxed font-light">
            Darkness whispers elegance. Ornate suffering. The beauty found in
            shadows and sorrow.
          </p>

          {/* Minimal ornamental footer */}
          <div className="mt-6 flex justify-center gap-4 text-purple-700/60 text-xs">
            <span>✦</span>
            <span>◆</span>
            <span>✦</span>
          </div>
        </div>

        {/* Grunge */}
        <div className="bg-linear-to-br from-gray-700 to-gray-800 border-4 border-gray-900 p-8 relative overflow-hidden">
          {/* Texture overlay - more subtle */}
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,.5)_2px,rgba(0,0,0,.5)_4px)]"></div>

          {/* Distressed edge effect */}
          <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-b from-black/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-linear-to-t from-black/40 to-transparent"></div>

          <h2
            className="text-4xl font-black text-yellow-300 mb-4 relative z-10 transform -skew-x-3"
            style={{
              textShadow: "3px 3px 0px rgba(0,0,0,0.5)",
            }}
          >
            GRUNGE
          </h2>

          <p className="text-sm text-gray-100 relative z-10 font-semibold leading-relaxed">
            Distorted. Distressed. Devastatingly authentic. No filters, no
            apologies, just raw teenage angst crystallized.
          </p>

          {/* Subtle worn edge */}
          <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-yellow-300/20 rotate-12"></div>
        </div>

        {/* Wedding Minimal */}
        <div className="bg-white border border-gray-300 p-12 text-center">
          <div className="mb-6 text-6xl text-amber-950/10">◇</div>
          <h2 className="text-xl font-light tracking-widest text-gray-800 mb-4">
            ELEGANCE
          </h2>
          <p className="text-xs text-gray-600 font-light leading-relaxed max-w-sm mx-auto">
            Whispered luxury. Understated grace. Where less is impossibly more.
          </p>
          <div className="mt-6 h-px bg-gray-300"></div>
        </div>

        {/* Postmodern Chaos */}
        <div className="relative p-8 overflow-hidden bg-white border-4 border-black">
          {/* Deconstructed geometric layers */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-red-500 opacity-60 mix-blend-screen"></div>
          <div className="absolute bottom-4 right-8 w-40 h-40 bg-blue-500 opacity-40 mix-blend-multiply transform rotate-45"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 border-4 border-yellow-400 transform -rotate-12"></div>

          {/* Fragmented/overlapping text */}
          <h2 className="text-4xl font-black text-black mb-2 transform -rotate-6 skew-x-12 relative z-20">
            POST
          </h2>
          <h2 className="text-4xl font-black text-red-600 -mt-6 ml-12 transform rotate-12 opacity-70 relative z-20">
            MODERN
          </h2>

          {/* Contradictory typography */}
          <p className="text-xs font-thin italic text-blue-900 mt-6 relative z-20">
            meaning collapses here
          </p>
          <p className="text-lg font-black text-yellow-600 -mt-2 transform rotate-3 relative z-20">
            TRUTH ≠ TRUTH
          </p>
          <p className="text-xs text-black/40 font-mono mt-4 relative z-20 transform -skew-y-3">
            {"[context undefined] // Math.random() = art"}
          </p>

          {/* Grid/system breaking */}
          <div className="absolute bottom-2 right-2 text-2xl transform rotate-45 opacity-30 text-black">
            █
          </div>
          <div className="absolute top-8 right-4 text-xl opacity-20 text-black">
            ◆◆◆
          </div>
        </div>

        {/* Cottagecore */}
        <div className="bg-linear-to-br from-green-50 via-amber-50 to-green-100 border-4 border-green-400 p-8 relative overflow-hidden">
          {/* Watercolor-style background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-green-300 blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-amber-200 blur-3xl"></div>
          </div>

          {/* Floral corner decorations */}
          <div className="absolute top-2 left-2 text-3xl opacity-70">🌸</div>
          <div className="absolute top-2 right-2 text-3xl opacity-70">🌼</div>
          <div className="absolute bottom-2 left-2 text-3xl opacity-70">🌿</div>
          <div className="absolute bottom-2 right-2 text-3xl opacity-70">
            🌾
          </div>

          {/* Vine border */}
          <div className="absolute top-0 left-0 right-0 h-px bg-green-400"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-green-400"></div>

          {/* Hand-drawn style frame */}
          <div className="relative z-10 border-2 border-dashed border-green-300 p-4 bg-white/40 backdrop-blur-sm rounded-lg">
            <h2
              className="text-3xl font-serif text-green-800 mb-3 italic text-center"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              Cottagecore
            </h2>

            {/* Pressed flower divider */}
            <div className="flex justify-center gap-2 my-3 opacity-60">
              <span className="text-xl">🌻</span>
              <span className="text-xl">🌿</span>
              <span className="text-xl">🌻</span>
            </div>

            <p className="text-sm text-green-900 font-serif text-center leading-relaxed">
              Escape into pastoral dreams.
              <br />
              Wildflowers bloom eternally.
              <br />
              The soft hum of nature's
              <br />
              gentle embrace.
            </p>
          </div>

          {/* Scattered elements */}
          <div className="absolute top-1/3 right-4 text-2xl opacity-40 rotate-12">
            🍃
          </div>
          <div className="absolute bottom-1/4 left-6 text-xl opacity-50 -rotate-12">
            🦋
          </div>

          {/* Ribbon accent */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-green-700 font-serif italic">
            ~ gather ye rosebuds ~
          </div>
        </div>

        {/* Dadaist - MAXIMUM CHAOS */}
        <div className="bg-red-200 border-8 border-dashed border-blue-600 p-6 transform rotate-3 skew-y-2 relative overflow-hidden">
          {/* Chaotic background elements */}
          <div className="absolute inset-0 opacity-40 text-9xl font-black text-blue-900 mix-blend-multiply rotate-45">
            🚽
          </div>
          <div className="absolute top-0 right-0 text-6xl opacity-30 -rotate-90 text-green-600">
            🥄
          </div>
          <div className="absolute bottom-4 left-8 text-7xl opacity-50 rotate-12">
            👁️
          </div>

          {/* Deconstructed title */}
          <div className="relative z-10 mb-8">
            <span className="text-5xl font-black text-blue-900 inline-block transform -rotate-12">
              d
            </span>
            <span className="text-3xl font-black text-red-600 inline-block transform rotate-45 translate-y-2">
              A
            </span>
            <span className="text-6xl font-black text-green-700 inline-block transform -rotate-6 -translate-y-1">
              d
            </span>
            <span className="text-4xl font-black text-purple-800 inline-block transform rotate-90 translate-x-1">
              A
            </span>
          </div>

          {/* Contradictory statements in random positions */}
          <p className="text-sm font-bold text-black leading-none mb-2 relative z-10 transform rotate-2">
            NONSENSE IS TRUTH.
          </p>
          <p className="text-sm font-bold text-black leading-none mb-4 relative z-10 transform -rotate-3 ml-8">
            TRUTH IS NONSENSE.
          </p>

          {/* Random floating elements */}
          <div className="absolute top-1/3 right-12 text-4xl rotate-180 opacity-60">
            🎪
          </div>
          <div className="absolute bottom-8 right-4 text-3xl -rotate-45 opacity-70">
            🎭
          </div>

          {/* Glitched code-like text */}
          <div className="relative z-10 space-y-1">
            <p className="text-xs text-purple-900 font-mono transform skew-x-12">
              randomness &gt; logic
            </p>
            <p className="text-xs text-red-700 font-mono transform -skew-x-6">
              absurdity &gt; meaning
            </p>
            <p className="text-xs text-green-800 font-mono transform rotate-1">
              ERROR: SENSE NOT FOUND
            </p>
          </div>

          {/* Upside down question mark because why not */}
          <div className="absolute top-2 left-2 text-4xl text-yellow-600 rotate-180">
            ?
          </div>

          {/* Random geometric shape */}
          <div className="absolute bottom-2 left-1/2 w-8 h-8 bg-yellow-400 opacity-60 rotate-45 border-4 border-purple-700"></div>

          {/* Nonsense "buttons" */}
          <div className="flex gap-2 mt-4 relative z-10">
            <div className="bg-green-500 text-white text-xs px-2 py-1 rotate-6 font-black">
              YES
            </div>
            <div className="bg-red-500 text-white text-xs px-2 py-1 -rotate-12 font-black">
              NO
            </div>
            <div className="bg-purple-500 text-white text-xs px-2 py-1 rotate-3 font-black">
              MAYBE
            </div>
            <div className="bg-yellow-500 text-black text-xs px-2 py-1 -rotate-6 font-black">
              ALL
            </div>
          </div>
        </div>

        {/* Cyberpunk */}
        <div className="bg-black border-2 border-cyan-400 p-8 relative overflow-hidden">
          {/* Animated scan line - top */}
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>

          {/* Much more subtle grid background */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
           linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px),
           linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)
         `,
              backgroundSize: "40px 40px",
            }}
          ></div>

          {/* Glitch corner accent - much more subtle */}
          <div className="absolute top-2 right-2 text-cyan-400/10 text-5xl font-mono leading-none">
            ▓
          </div>

          <h2
            className="text-3xl font-mono font-black text-cyan-300 mb-4 tracking-wider relative z-10"
            style={{
              textShadow: "0 0 15px rgba(0,255,255,0.6)",
            }}
          >
            CYBERPUNK
          </h2>

          <p className="text-sm text-cyan-100 font-mono leading-relaxed relative z-10">
            Neural pathways collide with synthetic dreams. High-tech rebellion.
            Low-life existence. Maximum chaos.
          </p>

          {/* Terminal-style command */}
          <div className="mt-4 relative z-10 flex items-center gap-2">
            <span className="text-cyan-300 text-xs font-mono">{">"}</span>
            <span className="text-cyan-300 text-xs font-mono">
              SYSTEM.OVERRIDE()
            </span>
            <span className="text-cyan-400/50 text-xs font-mono animate-pulse">
              _
            </span>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-magenta-500/30 to-transparent"></div>

          <div className="h-6 overflow-hidden relative z-10">
            <div className="font-mono text-[10px] text-cyan-400/30 whitespace-nowrap">
              <span className="inline-block">
                0x4A2F&nbsp;
                <span className="text-magenta-400/40">ERR_</span>
                0xB83C&nbsp;
                <span className="text-green-400/30">LOAD_</span>
                0x91D7&nbsp;
                <span className="text-cyan-400/50">SYS_</span>
                0x3E5A&nbsp;
              </span>
            </div>
          </div>
        </div>

        {/* Vampire Glamour*/}
        <div className="bg-linear-to-br from-red-950 via-black to-red-950 border-4 border-red-900/60 p-8 relative overflow-hidden">
          {/* Subtle blood drip effect at top */}
          <div className="absolute top-0 left-1/4 w-1 h-8 bg-linear-to-b from-red-700/60 to-transparent"></div>
          <div className="absolute top-0 right-1/3 w-1 h-6 bg-linear-to-b from-red-700/40 to-transparent"></div>

          {/* Large decorative element */}
          <div className="absolute -bottom-8 -right-8 text-[10rem] opacity-5 text-red-600 leading-none">
            ✦
          </div>

          {/* Gothic arch silhouette */}
          <div className="absolute top-4 right-4 text-red-900/30 text-3xl">
            ♱
          </div>

          <h2
            className="text-3xl font-serif text-red-300 mb-4 tracking-wide relative z-10 italic"
            style={{
              fontFamily: "'Playfair Display', 'Georgia', serif",
              textShadow: "0 0 15px rgba(153,27,27,0.5)",
            }}
          >
            Blood Elegance
          </h2>

          {/* Ornate divider */}
          <div className="w-20 h-px bg-linear-to-r from-red-700 to-transparent mb-4 relative z-10"></div>

          <p className="text-sm text-red-100/90 relative z-10 font-light leading-relaxed">
            Immortal. Seductive. Cursed with eternal refinement and crimson
            desire.
          </p>

          {/* Subtle rose accent */}
          <div className="absolute bottom-4 left-4 text-red-800/40 text-2xl">
            🥀
          </div>
        </div>

        {/* Fairy Enchantment*/}
        <div className="bg-linear-to-br from-purple-200 via-pink-200 to-blue-200 border-4 border-dashed border-purple-400 p-8 relative overflow-hidden">
          {/* Soft glow overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-white/30 via-transparent to-transparent"></div>

          {/* Floating sparkles with varied animation */}
          <div className="absolute inset-0 opacity-40">
            <div
              className="absolute top-4 left-6 text-2xl animate-pulse"
              style={{ animationDuration: "2s" }}
            >
              ✨
            </div>
            <div
              className="absolute bottom-8 right-8 text-xl animate-pulse"
              style={{ animationDuration: "3s", animationDelay: "0.5s" }}
            >
              🧚
            </div>
            <div
              className="absolute top-1/2 right-6 text-lg animate-pulse"
              style={{ animationDuration: "2.5s", animationDelay: "1s" }}
            >
              ⭐
            </div>
            <div
              className="absolute top-1/3 left-1/4 text-sm animate-pulse"
              style={{ animationDuration: "3.5s" }}
            >
              ✦
            </div>
          </div>

          {/* Decorative flourish */}
          <div className="absolute top-2 right-2 text-purple-400/30 text-4xl">
            ❀
          </div>

          <h2
            className="text-3xl font-serif text-purple-700 mb-4 relative z-10"
            style={{
              fontFamily: "'Dancing Script', cursive",
              textShadow: "0 0 10px rgba(255,255,255,0.8)",
            }}
          >
            Fairy Realm
          </h2>

          {/* Delicate divider */}
          <div className="flex items-center gap-2 mb-3 relative z-10">
            <div className="h-px flex-1 bg-linear-to-r from-transparent to-purple-400"></div>
            <span className="text-purple-400 text-xs">✦</span>
            <div className="h-px flex-1 bg-linear-to-l from-transparent to-purple-400"></div>
          </div>

          <p className="text-sm text-purple-900/90 font-light relative z-10 leading-relaxed">
            Whimsical wings and enchanted forests. Magic sparkles in every
            corner.
          </p>

          {/* Soft scattered stars */}
          <div className="absolute bottom-3 left-3 text-pink-400/40 text-xs">
            ✧ ✦ ✧
          </div>
        </div>

        {/* Pride */}
        <div className="bg-white border-8 border-black p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-[linear-gradient(to_right,red_0%_16.66%,orange_16.66%_33.33%,yellow_33.33%_50%,green_50%_66.66%,blue_66.66%_83.33%,violet_83.33%_100%)]"></div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-red-500 via-yellow-500 mb-3 tracking-tight">
            HERE FOREVER
          </h2>
          <p className="text-sm text-black font-bold">
            Love is love. Colors that celebrate, inspire, and transform the
            world.
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-[linear-gradient(to_right,violet_0%_16.66%,blue_16.66%_33.33%,green_33.33%_50%,yellow_50%_66.66%,orange_66.66%_83.33%,red_83.33%_100%)]"></div>
        </div>

        {/* Corporate Minimalism */}
        <div className="bg-gray-50 border border-gray-200 p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-sm"></div>
            <h2 className="text-lg font-semibold text-gray-900 tracking-tight">
              SYNERGY SOLUTIONS
            </h2>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Leveraging strategic paradigms to optimize stakeholder value through
            innovative methodologies and dynamic synergistic engagement.
          </p>
          <div className="mt-4 flex gap-2">
            <div className="px-2 py-1 bg-blue-100 text-blue-900 text-xs font-semibold rounded">
              Strategic
            </div>
            <div className="px-2 py-1 bg-gray-200 text-gray-900 text-xs font-semibold rounded">
              Innovative
            </div>
            <div className="px-2 py-1 bg-gray-200 text-gray-900 text-xs font-semibold rounded">
              Circling back ✅
            </div>
          </div>
        </div>

        {/* Windows 95 */}
        <div className="bg-[#008080] p-8 flex items-center justify-center">
          <div className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#000000] border-b-[#000000] w-80">
            {/* Title bar */}
            <div className="bg-[#000080] px-2 py-1 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4"></div>
                <span className="text-white text-sm font-bold">Error</span>
              </div>
              <button className="w-4 h-4 bg-[#c0c0c0] border border-t-white border-l-white border-r-black border-b-black flex items-center justify-center text-black text-xs font-bold">
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-4 flex gap-4 items-start">
              <div className="text-5xl">⚠️</div>
              <div className="flex-1">
                <p className="text-sm text-black mb-4">
                  A problem has been detected!
                </p>
                <p className="text-xs text-black font-mono">CHECK_FAILED</p>
              </div>
            </div>

            {/* Button */}
            <div className="px-4 pb-4 flex justify-center">
              <button className="bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-black border-b-black px-8 py-1 text-sm text-black font-bold">
                OK
              </button>
            </div>
          </div>
        </div>

        {/* Y2K Millennial */}
        <div className="bg-linear-to-br from-fuchsia-500 via-cyan-400 to-lime-300 border-4 border-white p-8 transform -rotate-1 relative overflow-hidden shadow-[8px_8px_0px_rgba(147,51,234,0.5)]">
          {/* Metallic shine overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-white/40 via-transparent to-transparent pointer-events-none"></div>

          {/* Starbursts */}
          <div className="absolute top-2 right-2 text-4xl opacity-70 animate-pulse">
            ✨
          </div>
          <div
            className="absolute bottom-4 left-4 text-3xl opacity-60 animate-pulse"
            style={{ animationDelay: "0.5s" }}
          >
            💫
          </div>

          {/* Butterfly clips aesthetic */}
          <div className="absolute top-4 left-4 text-2xl rotate-12">🦋</div>
          <div className="absolute bottom-2 right-8 text-2xl -rotate-12">
            🦋
          </div>

          <div className="relative z-10">
            {/* Chrome/metallic text effect */}
            <h2
              className="text-6xl font-black mb-3 text-center"
              style={{
                fontFamily: "'Arial Black', sans-serif",
                background:
                  "linear-gradient(180deg, #FF1493 0%, #00CED1 50%, #7FFF00 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter:
                  "drop-shadow(2px 2px 0px rgba(255,255,255,0.8)) drop-shadow(4px 4px 0px rgba(147,51,234,0.4))",
                letterSpacing: "0.05em",
              }}
            >
              Y★2★K
            </h2>

            {/* Glossy pill container */}
            <div
              className="bg-white/70 backdrop-blur-sm border-2 border-purple-400 rounded-full px-4 py-2 mb-3"
              style={{
                boxShadow:
                  "inset 0 2px 8px rgba(255,255,255,0.8), 0 4px 12px rgba(147,51,234,0.3)",
              }}
            >
              <p className="text-xs font-black text-purple-900 text-center tracking-wide">
                BRITNEY ★ PARIS ★ FLIP PHONES ★ JUICY COUTURE
              </p>
            </div>

            {/* Icon row with glossy effect */}
            <div className="flex justify-center gap-3 text-3xl">
              <span className="filter drop-shadow-lg">💎</span>
              <span className="filter drop-shadow-lg">💅</span>
              <span className="filter drop-shadow-lg">📱</span>
              <span className="filter drop-shadow-lg">💕</span>
            </div>

            {/* "That's hot" sticker effect */}
            <div
              className="mt-3 inline-block bg-linear-to-r from-pink-400 to-pink-500 text-white text-xs font-black px-3 py-1 rounded-full border-2 border-white rotate-3"
              style={{ boxShadow: "0 4px 8px rgba(236,72,153,0.5)" }}
            >
              ★ THAT'S HOT ★
            </div>
          </div>

          {/* Digital/pixel corner accent */}
          <div
            className="absolute top-0 right-0 w-16 h-16 bg-white/20"
            style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
          ></div>
        </div>

        {/* Art Deco */}
        <div className="bg-black border-8 border-amber-600 p-8 relative overflow-hidden">
          {/* Geometric sunburst pattern */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 -translate-y-24">
            <div
              className="absolute inset-0 bg-linear-to-b from-amber-400 via-amber-600 to-transparent opacity-30"
              style={{
                clipPath: "polygon(50% 0%, 55% 100%, 50% 95%, 45% 100%)",
              }}
            ></div>
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute top-0 left-1/2 w-0.5 h-24 bg-amber-500/40 origin-top"
                style={{ transform: `rotate(${i * 30}deg)` }}
              ></div>
            ))}
          </div>

          {/* Corner ornaments */}
          <div className="absolute top-2 left-2 text-2xl text-amber-500">◆</div>
          <div className="absolute top-2 right-2 text-2xl text-amber-500">
            ◆
          </div>
          <div className="absolute bottom-2 left-2 text-2xl text-amber-500">
            ◆
          </div>
          <div className="absolute bottom-2 right-2 text-2xl text-amber-500">
            ◆
          </div>

          {/* Stepped border decoration */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-linear-to-r from-transparent via-amber-500 to-transparent"></div>

          <h2
            className="text-4xl font-black text-amber-400 mb-2 tracking-[0.3em] text-center relative z-10"
            style={{
              fontFamily: "Georgia, serif",
              textShadow: "2px 2px 0px rgba(217, 119, 6, 0.5)",
            }}
          >
            ART DECO
          </h2>

          {/* Triple-line divider */}
          <div className="flex justify-center gap-1 mb-3">
            <div className="w-20 h-0.5 bg-amber-600"></div>
            <div className="w-20 h-0.5 bg-amber-400"></div>
            <div className="w-20 h-0.5 bg-amber-600"></div>
          </div>

          <p className="text-sm text-amber-200 italic text-center relative z-10">
            Geometric opulence. Jazz-age glamour.
            <br />
            Symmetrical sophistication.
          </p>

          {/* Bottom stepped pattern */}
          <div className="mt-4 flex justify-center gap-1 relative z-10">
            <div className="w-2 h-2 bg-amber-600"></div>
            <div className="w-2 h-4 bg-amber-500"></div>
            <div className="w-2 h-6 bg-amber-400"></div>
            <div className="w-2 h-6 bg-amber-400"></div>
            <div className="w-2 h-4 bg-amber-500"></div>
            <div className="w-2 h-2 bg-amber-600"></div>
          </div>
        </div>

        {/* Retro 70s */}
        <div className="bg-[#FF6B35] border-12 border-[#8B4513] p-8 relative overflow-hidden">
          {/* Concentric rainbow circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-8 border-yellow-300/30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-8 border-red-400/30"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-8 border-orange-300/30"></div>

          {/* Bubble shapes */}
          <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-yellow-400/40"></div>
          <div className="absolute bottom-8 left-4 w-20 h-20 rounded-full bg-red-500/30"></div>
          <div className="absolute top-20 left-12 w-12 h-12 rounded-full bg-yellow-300/50"></div>

          <div className="relative z-10">
            <h2
              className="text-6xl font-black text-[#8B4513] mb-4 text-center"
              style={{
                fontFamily: "'Cooper Black', serif",
                textShadow: "4px 4px 0px #FFA500, 6px 6px 0px #FFD700",
                transform: "scale(1.1, 0.9)",
              }}
            >
              GROOVY
            </h2>

            <p className="text-base text-yellow-100 font-bold text-center leading-relaxed bg-[#8B4513]/60 py-3 px-4 rounded-full">
              Far out! Lava lamps, shag carpet,
              <br />
              and pure psychedelic vibes ✌️
            </p>
          </div>
        </div>

        {/* Maximalist Eclectic */}
        <div className="bg-linear-to-br from-purple-500 via-pink-400 to-yellow-300 border-8 border-dotted border-purple-900 p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 text-6xl font-black mix-blend-overlay text-purple-900">
            ◆◆◆◆◆
          </div>
          <h2 className="text-3xl font-black text-white drop-shadow-lg relative z-10 transform rotate-1">
            MORE IS MORE
          </h2>
          <p className="text-xs font-bold text-white relative z-10 mt-2">
            Chaos. Clashing colors. Unapologetic abundance. EVERYTHING AT ONCE.
          </p>
          <div className="flex gap-1 mt-3 relative z-10">
            <span className="text-2xl">⚡</span>
            <span className="text-2xl">🌈</span>
            <span className="text-2xl">💎</span>
            <span className="text-2xl">✨</span>
          </div>
        </div>

        {/* Steampunk */}
        <div className="bg-linear-to-br from-amber-900 via-yellow-900 to-amber-950 border-8 border-yellow-700 p-8 relative overflow-hidden">
          {/* Riveted metal plate texture */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 10% 10%, rgba(0,0,0,0.3) 1px, transparent 1px),
                          radial-gradient(circle at 90% 10%, rgba(0,0,0,0.3) 1px, transparent 1px),
                          radial-gradient(circle at 10% 90%, rgba(0,0,0,0.3) 1px, transparent 1px),
                          radial-gradient(circle at 90% 90%, rgba(0,0,0,0.3) 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          ></div>

          {/* Large background gear */}
          <div className="absolute -bottom-12 -right-12 text-[12rem] text-yellow-700/10 leading-none rotate-12">
            ⚙
          </div>

          {/* Small accent gears */}
          <div
            className="absolute top-4 right-4 text-4xl text-yellow-600/40 animate-spin"
            style={{ animationDuration: "20s" }}
          >
            ⚙
          </div>
          <div
            className="absolute bottom-8 left-6 text-3xl text-yellow-600/30 animate-spin"
            style={{ animationDuration: "15s", animationDirection: "reverse" }}
          >
            ⚙
          </div>

          {/* Brass nameplate effect */}
          <div
            className="relative z-10 bg-linear-to-br from-yellow-600 to-amber-700 border-4 border-yellow-800 p-4 mb-4"
            style={{
              boxShadow:
                "inset 0 2px 4px rgba(0,0,0,0.3), 0 4px 8px rgba(0,0,0,0.5)",
            }}
          >
            <h2
              className="text-3xl font-black text-yellow-950 font-mono tracking-wider text-center"
              style={{
                textShadow: "1px 1px 0px rgba(255,255,255,0.3)",
              }}
            >
              STEAM⚙PUNK
            </h2>
          </div>

          <p className="text-sm text-yellow-100 relative z-10 font-bold text-center leading-relaxed">
            Gears grinding. Brass and iron.
            <br />
            Victorian innovation powered by
            <br />
            steam and ambition.
          </p>

          {/* Rivets on corners */}
          <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-yellow-800 border-2 border-yellow-950"></div>
          <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-yellow-800 border-2 border-yellow-950"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 rounded-full bg-yellow-800 border-2 border-yellow-950"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 rounded-full bg-yellow-800 border-2 border-yellow-950"></div>

          {/* Pressure gauge indicator */}
          <div className="bottom-4 right-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-yellow-950 border-4 border-yellow-700 flex items-center justify-center">
              <div className="text-xs text-yellow-400 font-mono">PSI</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
