export function LayoutSandbox() {
  // Reusable class strings to avoid repetition without yet making new components
  const cardClasses =
    "bg-stone-950/60 border border-stone-700/50 rounded-lg p-6";
  const cardHover =
    "hover:bg-stone-900/50 hover:border-yellow-700/30 transition-all";
  const selectClasses =
    "w-full bg-stone-900/70 border border-stone-700/50 rounded px-3 py-2 text-sm text-stone-300 [&>option]:bg-stone-900 [&>option]:text-stone-300";

  return (
    <div className="min-h-screen bg-linear-to-br from-stone-950 via-neutral-900 to-stone-950 text-stone-200 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12 px-6">
        {/* Section 5: Page Title */}
        <section className="space-y-3 border-b border-stone-800/50 pb-8">
          <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-yellow-400 to-yellow-700 bg-clip-text text-transparent">
            TaskForge Pro
          </h1>
          <p className="text-sm text-stone-400">
            Professional task management for ambitious teams (But actually just
            pt. 2 of Tailwind Layout Sandbox, Week 2 – Day 1a: Practicing
            spacing, flex, grid, and responsive utilities)
          </p>
        </section>

        {/* Section 6: Feature List */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-stone-100">
            Vertical Stack (“Feature List”)
          </h2>
          <div className="bg-stone-900/40 border border-stone-800/60 rounded-lg p-8 space-y-4 shadow-2xl">
            <div className={`${cardClasses} ${cardHover}`}>
              <strong className="block sm:inline text-yellow-500 font-semibold">
                AI-Powered Task Prioritization
              </strong>
              <span className="block sm:inline sm:before:content-['_—_'] text-stone-300">
                Let machine learning analyze your workload and automatically
                surface the most critical tasks based on deadlines,
                dependencies, and team capacity.
              </span>
            </div>
            <div className={`${cardClasses} ${cardHover}`}>
              <strong className="block sm:inline text-yellow-500 font-semibold">
                Advanced Team Analytics
              </strong>
              <span className="block sm:inline sm:before:content-['_—_'] text-stone-300">
                Gain deep insights into productivity patterns, bottlenecks, and
                team velocity with comprehensive dashboards and custom reports.
              </span>
            </div>
            <div className={`${cardClasses} ${cardHover}`}>
              <strong className="block sm:inline text-yellow-500 font-semibold">
                Real-Time Collaboration
              </strong>
              <span className="block sm:inline sm:before:content-['_—_'] text-stone-300">
                Work seamlessly with your team through live updates, @mentions,
                file sharing, and integrated video calls. All without leaving
                the platform.
              </span>
            </div>
          </div>
        </section>

        {/* Section 7: Responsive flex rows */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-stone-100">
            Responsive Flex Row (“Sidebar + Content”)
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-yellow-500 mb-3">
                Filter Bar with Content
              </h3>
              <p className="text-sm text-stone-400 mb-5">
                Filters stack above content on mobile, move to left sidebar on
                desktop for better use of horizontal space.
              </p>
              <div className="bg-stone-900/40 border border-stone-800/60 rounded-lg p-8 flex flex-col md:flex-row gap-5 shadow-2xl">
                <div className={`${cardClasses} md:basis-1/4`}>
                  <h4 className="font-semibold text-yellow-500 text-lg mb-4">
                    Filter
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs uppercase tracking-wide text-stone-500 mb-2 block">
                        Status
                      </label>
                      <select className={selectClasses}>
                        <option>All Tasks</option>
                        <option>Open</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                        <option>Overdue</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wide text-stone-500 mb-2 block">
                        Priority
                      </label>
                      <select className={selectClasses}>
                        <option>All Priorities</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wide text-stone-500 mb-2 block">
                        Assignee
                      </label>
                      <select className={selectClasses}>
                        <option>All Team</option>
                        <option>Me</option>
                        <option>Unassigned</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className={`${cardClasses} flex-1 md:basis-3/4`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-yellow-500 text-lg">
                      Task List
                    </h4>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-stone-900/50 rounded-lg p-4 border-l-2 border-yellow-600">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-stone-200">
                            Complete Q4 revenue report
                          </div>
                          <div className="text-xs text-stone-500 mt-1">
                            Due tomorrow • High priority • Assigned to you
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-stone-900/50 rounded-lg p-4 border-l-2 border-stone-600">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-stone-200">
                            Review design mockups
                          </div>
                          <div className="text-xs text-stone-500 mt-1">
                            Due in 3 days • Medium priority • Jane Doe
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-stone-900/50 rounded-lg p-4 border-l-2 border-stone-600">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-stone-200">
                            Update API documentation
                          </div>
                          <div className="text-xs text-stone-500 mt-1">
                            Due next week • Low priority • John Smith
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-yellow-500 mb-3">
                Activity Sidebar
              </h3>
              <p className="text-sm text-stone-400 mb-5">
                Right sidebar shows recent activity and team updates. Hidden on
                smaller screens to maximize workspace.
              </p>
              <div className="bg-stone-900/40 border border-stone-800/60 rounded-lg p-8 flex flex-row gap-5 shadow-2xl">
                <div className={`${cardClasses} flex-1`}>
                  <h4 className="font-semibold text-yellow-500 text-lg mb-3">
                    Active Tasks
                  </h4>
                  <p className="text-sm text-stone-400 leading-relaxed mb-4">
                    Your current focus area with today's priorities and
                    in-progress work.
                  </p>
                  <div className="space-y-2">
                    <div className="bg-stone-900/50 rounded-lg p-2 text-xs">
                      <div className="text-stone-300">Draft marketing copy</div>
                      <div className="text-stone-500">In progress</div>
                    </div>
                    <div className="bg-stone-900/50 rounded-lg p-2 text-xs">
                      <div className="text-stone-300">
                        Code review for PR #247
                      </div>
                      <div className="text-stone-500">Waiting on feedback</div>
                    </div>
                  </div>
                </div>
                <div className={`${cardClasses} hidden md:block md:basis-1/3`}>
                  <h4 className="font-semibold text-yellow-500 text-lg mb-3">
                    Recent Activity
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="pb-3 border-b border-stone-800/50">
                      <div className="text-stone-300 font-semibold">
                        Jane Doe
                      </div>
                      <div className="text-stone-500 mt-1">
                        Completed "User research synthesis"
                      </div>
                      <div className="text-stone-600 mt-1">2 minutes ago</div>
                    </div>
                    <div className="pb-3 border-b border-stone-800/50">
                      <div className="text-stone-300 font-semibold">
                        John Smith
                      </div>
                      <div className="text-stone-500 mt-1">
                        Added comment on "API integration"
                      </div>
                      <div className="text-stone-600 mt-1">15 minutes ago</div>
                    </div>
                    <div className="pb-3">
                      <div className="text-stone-300 font-semibold">
                        Team Update
                      </div>
                      <div className="text-stone-500 mt-1">
                        3 new tasks assigned to Engineering
                      </div>
                      <div className="text-stone-600 mt-1">1 hour ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Dashboard Stats */}
        <section className="space-y-5">
          <h2 className="text-3xl font-semibold text-stone-100">
            Your Overview (Responsive Grid)
          </h2>
          <p className="text-sm text-stone-400">
            Real-time insights into your workload and team performance.
          </p>
          <div className="bg-stone-900/40 border border-stone-800/60 rounded-lg p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 shadow-2xl">
            {/* Primary Featured Card */}
            <div className="bg-linear-to-br from-yellow-900/40 to-amber-900/40 border-2 border-yellow-600/50 rounded-lg p-6 hover:border-yellow-500/70 transition-all shadow-lg shadow-yellow-900/20">
              <div className="text-xs uppercase tracking-widest text-yellow-400/80 mb-2 font-semibold">
                Open Tasks
              </div>
              <div className="text-5xl font-bold bg-linear-to-br from-yellow-400 to-yellow-600 bg-clip-text text-transparent leading-none mb-3">
                12
              </div>
              <p className="text-xs text-yellow-400/60 leading-relaxed">
                Tasks waiting to be started or assigned to team members
              </p>
            </div>

            <div className={`${cardClasses} ${cardHover}`}>
              <div className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-semibold">
                In Progress
              </div>
              <div className="text-5xl font-bold text-yellow-500/80 leading-none mb-3">
                7
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Currently active tasks being worked on by your team
              </p>
            </div>

            <div className={`${cardClasses} ${cardHover}`}>
              <div className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-semibold">
                Completed This Week
              </div>
              <div className="text-5xl font-bold text-stone-400 leading-none mb-3">
                34
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Tasks successfully finished in the last 7 days
              </p>
            </div>

            {/* Error State Card - Overdue */}
            <div className="bg-linear-to-br from-orange-950/40 to-orange-900/40 border border-orange-800/60 rounded-lg p-6 hover:border-orange-700/60 transition-all shadow-lg shadow-orange-950/30">
              <div className="text-xs uppercase tracking-widest text-orange-400/80 mb-2 font-semibold">
                Overdue
              </div>
              <div className="text-5xl font-bold text-orange-500 leading-none mb-3">
                3
              </div>
              <p className="text-xs text-orange-400/60 leading-relaxed">
                Tasks that have passed their deadline and need attention
              </p>
            </div>

            <div
              className={`${cardClasses} ${cardHover} sm:col-span-2 lg:col-span-4`}
            >
              <div className="text-xs uppercase tracking-widest text-stone-500 mb-2 font-semibold">
                Team Members Active
              </div>
              <div className="text-5xl font-bold text-yellow-500/80 leading-none mb-3">
                8
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Team members currently online or active in the last hour
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
