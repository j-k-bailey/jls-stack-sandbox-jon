import { SimpleHeader } from "@/components/ui/simpleHeader";

export function AestheticPage() {
  return (
    <div className="space-y-4">
      <SimpleHeader pageTitle="Aesthetic Fun" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8 bg-white/10 p-8">
        {/* Neobrutalism */}
        <div className="border-8 border-black bg-cyan-400 p-0 transform shadow-[12px_12px_0px_rgba(0,0,0,1)]">
          <h2
            className="text-4xl bg-white pt-8 pl-8 border-b-4 border-black font-black tracking-wider mb-3 text-black font-mono"
            style={{ fontFamily: "Courier New, monospace" }}
          >
            NEO<span className="text-cyan-400">█</span>BRUT
          </h2>
          <p className="text-xs font-black leading-tight pl-8  text-black font-mono mb-3">
            RAW. UNREFINED. NEON CHAOS.
          </p>
          <div className="flex gap-2 pl-8 pb-8">
            <div className="border-3 border-black bg-yellow-300 px-2 py-1 text-xs font-black">
              █
            </div>
            <div className="border-3 border-black bg-cyan-300 px-2 py-1 text-xs font-black">
              █
            </div>
            <div className="border-3 border-black bg-pink-400 px-2 py-1 text-xs font-black">
              █
            </div>
          </div>
        </div>

        {/* Vaporwave */}
        <div className="bg-linear-to-br from-pink-400 via-purple-400 to-blue-400 p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 text-9xl font-black text-purple-900 mix-blend-multiply">
            ✦
          </div>
          <h2 className="text-2xl font-light italic mb-3 text-white drop-shadow-lg relative z-10">
            V A P O R W A V E
          </h2>
          <p className="text-xs font-thin text-white/80 relative z-10">
            Lost in digital dreams. Neon-soaked nostalgia. Aesthetic
            transcendence through the digital void.
          </p>
        </div>

        {/* Dark Academia */}
        <div className="bg-gray-950 border-4 border-amber-900 p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 text-9xl font-black text-amber-700 mix-blend-screen">
            🐦
          </div>
          <div className="absolute top-3 right-3 text-5xl opacity-40">🖤</div>
          <h2 className="text-3xl font-serif text-amber-100 mb-2 italic tracking-wider relative z-10">
            Dark Academia
          </h2>
          <div className="border-b-2 border-amber-900 mb-3"></div>
          <p className="text-xs text-amber-200 font-serif leading-relaxed relative z-10">
            Blackened tomes. Raven-haunted libraries. Candlelit secrets
            whispered in mahogany halls. Where old money meets older curses, and
            knowledge demands a price written in shadow and blood.
          </p>
          <div className="mt-4 flex gap-2 relative z-10">
            <span className="text-lg opacity-50">🕯️</span>
            <span className="text-lg opacity-50">📖</span>
            <span className="text-lg opacity-50">🖋️</span>
          </div>
        </div>

        {/* Dadaist */}
        <div className="bg-red-200 border-8 border-dashed border-blue-600 p-6 transform rotate-3 skew-y-2 relative overflow-hidden">
          <div className="absolute inset-0 opacity-40 text-9xl font-black text-blue-900 mix-blend-multiply">
            🚽
          </div>
          <h2 className="text-3xl font-black text-blue-900 mb-8 transform -rotate-12 relative z-10">
            dAdA
          </h2>
          <p className="text-sm font-bold text-black leading-none mb-4 relative z-10">
            NONSENSE IS TRUTH. TRUTH IS NONSENSE.
          </p>
          <div className="text-6xl float-right relative z-10">🎪</div>
          <p className="text-xs text-purple-900 font-mono relative z-10">
            randomness &gt; logic // absurdity &gt; meaning
          </p>
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
          <div className="absolute top-[50%] right-[30%] text-9xl opacity-20 rotate-25">
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
        <div className="bg-black border-4 border-purple-900 p-8 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-purple-900 via-pink-600 to-purple-900"></div>
          <h2 className="text-2xl font-black text-purple-400 mb-3 tracking-wider">
            ✦ GOTHIC ✦
          </h2>
          <p className="text-sm text-purple-200 leading-relaxed">
            Darkness whispers elegance. Ornate suffering. The beauty found in
            shadows and sorrow.
          </p>
          <div className="mt-4 text-center text-purple-600 text-lg">❖ ❖ ❖</div>
        </div>

        {/* Grunge */}
        <div className="bg-gray-700 border-4 border-gray-900 p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_2px,rgba(0,0,0,.5)_2px,rgba(0,0,0,.5)_4px)]"></div>
          <h2 className="text-3xl font-black text-yellow-300 mb-3 relative z-10 transform -skew-x-6">
            GRUNGE
          </h2>
          <p className="text-sm text-white relative z-10 font-bold">
            Distorted. Distressed. Devastatingly authentic. No filters, no
            apologies, just raw teenage angst crystallized.
          </p>
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
          <div className="absolute bottom-2 right-2 text-2xl transform rotate-45 opacity-30">
            █
          </div>
          <div className="absolute top-8 right-4 text-xl opacity-20">◆◆◆</div>
        </div>

        {/* Cottagecore */}
        <div className="bg-green-100 border-4 border-green-300 p-8 relative">
          <div className="absolute top-2 right-2 text-4xl">🌿</div>
          <div className="absolute bottom-2 left-2 text-3xl">🌾</div>
          <h2 className="text-2xl font-serif text-green-800 mb-3 italic">
            Cottagecore
          </h2>
          <p className="text-sm text-green-900 font-serif">
            Escape into pastoral dreams. Wildflowers bloom eternally. The soft
            hum of nature's gentle embrace.
          </p>
        </div>

        {/* Cyberpunk */}
        <div className="bg-black border-2 border-cyan-400 p-8 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
          <h2 className="text-2xl font-mono font-black text-cyan-300 mb-3 tracking-wider">
            ⚡ CYBERPUNK ⚡
          </h2>
          <p className="text-xs text-cyan-200 font-mono leading-relaxed">
            Neural pathways collide with synthetic dreams. High-tech rebellion.
            Low-life existence. Maximum chaos.
          </p>
          <p className="text-xs text-magenta-400 font-mono mt-3">
            {" "}
            SYSTEM.OVERRIDE()
          </p>
        </div>

        {/* Vampire Glamour */}
        <div className="bg-linear-to-br from-red-950 via-black to-red-950 border-4 border-red-700 p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 text-9xl font-black text-red-600 mix-blend-screen">
            ✦
          </div>
          <h2 className="text-3xl font-black text-red-300 mb-3 tracking-wider relative z-10">
            BLOOD ELEGANCE
          </h2>
          <p className="text-sm text-red-100 relative z-10 italic">
            Immortal. Seductive. Cursed with eternal refinement and crimson
            desire.
          </p>
        </div>

        {/* Fairy Enchantment */}
        <div className="bg-linear-to-br from-purple-200 via-pink-200 to-blue-200 border-4 border-dashed border-purple-400 p-8 relative">
          <div className="absolute inset-0 opacity-20 animate-pulse">
            <div className="absolute top-2 left-2 text-2xl">✨</div>
            <div className="absolute bottom-3 right-3 text-2xl">🧚</div>
            <div className="absolute top-1/2 right-4 text-xl">⭐</div>
          </div>
          <h2 className="text-2xl font-serif text-purple-700 mb-3 italic relative z-10">
            Fairy Realm
          </h2>
          <p className="text-sm text-purple-900 font-light relative z-10">
            Whimsical wings and enchanted forests. Magic sparkles in every
            corner.
          </p>
        </div>

        {/* Pride */}
        <div className="bg-white border-8 border-black p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-[linear-gradient(to_right,red_0%_16.66%,orange_16.66%_33.33%,yellow_33.33%_50%,green_50%_66.66%,blue_66.66%_83.33%,violet_83.33%_100%)]"></div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-red-500  via-yellow-500 mb-3 tracking-tight">
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
        <div className="bg-gray-400 border-2 border-t-gray-100 border-l-gray-100 border-r-gray-700 border-b-gray-700 p-1">
          <div className="bg-blue-600 text-white text-xs font-bold px-1 py-0.5 flex justify-between items-center">
            <span>My Computer</span>
            <span>_▢✕</span>
          </div>
          <div className="bg-gray-400 p-3 text-black text-xs font-mono">
            <p className="mb-2">📁 Files</p>
            <p className="mb-2">💾 Disk C:</p>
            <p>⚙️ System32</p>
          </div>
        </div>

        {/* Y2K Millennial */}
        <div className="bg-linear-to-br from-hot-pink via-lime-300 to-cyan-300 border-8 border-purple-500 p-8 transform -rotate-2">
          <h2 className="text-4xl font-black text-purple-900 mb-2 font-mono italic drop-shadow-lg">
            Y2K
          </h2>
          <p className="text-xs font-black text-purple-900 mb-3">
            BRITNEY. PARIS. PARIS HILTON'S DOG. FLIP PHONES. LET'S GO!
          </p>
          <div className="flex gap-1">
            <span className="text-2xl">✌️</span>
            <span className="text-2xl">💅</span>
            <span className="text-2xl">📱</span>
          </div>
        </div>

        {/* Art Deco */}
        <div className="bg-amber-50 border-8 border-amber-900 p-8 relative">
          <div className="absolute top-2 left-2 text-3xl text-amber-800 opacity-30">
            ◆
          </div>
          <div className="absolute bottom-2 right-2 text-3xl text-amber-800 opacity-30">
            ◆
          </div>
          <h2
            className="text-3xl font-black text-amber-900 mb-2 tracking-widest"
            style={{ fontFamily: "Georgia, serif" }}
          >
            ART DECO
          </h2>
          <div className="border-2 border-amber-900 my-3"></div>
          <p className="text-sm text-amber-900 italic">
            Geometric opulence. Jazz-age glamour. Symmetrical sophistication.
          </p>
        </div>

        {/* Retro 70s */}
        <div className="bg-linear-to-br from-orange-400 via-yellow-300 to-red-400 border-8 border-orange-700 p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,.1)_10px,rgba(0,0,0,.1)_20px)]"></div>
          <h2 className="text-4xl font-black text-orange-900 mb-2 relative z-10 italic tracking-wider">
            GROOVY
          </h2>
          <p className="text-sm text-orange-900 font-bold relative z-10">
            Far out, man. Lava lamps. Wood grain. Pure nostalgic vibes.
          </p>
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
        <div className="bg-amber-900 border-8 border-yellow-700 p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 text-9xl font-black text-yellow-700">
            ⚙
          </div>
          <h2 className="text-3xl font-black text-yellow-300 mb-3 relative z-10 font-mono">
            STEAM⚙PUNK
          </h2>
          <p className="text-sm text-yellow-100 relative z-10 font-bold">
            Gears grinding. Brass and iron. Victorian innovation powered by
            steam and ambition.
          </p>
        </div>
      </div>
    </div>
  );
}
