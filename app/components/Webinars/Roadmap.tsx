import React from "react"

const RoadmapCaards = () => {
  const cards = [
    {
      id: "01",
      title: "AI ON APIs TODAY",
      gradient: "bg-[linear-gradient(270deg,#3CDB8300_0%,#3CDB83_100%)]",
      description:
        "Where is AI adoption on top of APIs actually happening in banking and financial services today?",
    },
    {
      id: "02",
      title: "FOUNDATIONS",
      gradient: "bg-[linear-gradient(270deg,#0376FC00_0%,#0376FC_100%)]",
      description:
        "What foundational capabilities do providers need before AI can deliver real value?",
    },
    {
      id: "03",
      title: "OUTLOOK 2027",
      gradient: "bg-[linear-gradient(270deg,#D330E000_0%,#D330E0_100%)]",
      description: "What should you expect to change by 2027?",
    },
  ]

  return (
    <div className=" bg-[#0F2E58] py-20 px-6  flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
          Three questions. One roadmap.
        </h1>
        <h3 className="text-white  font-light tracking-wide">
          From where AI on APIs is working today to what changes by 2027.
        </h3>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-screen-xl">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col border border-white rounded-2xl overflow-hidden bg-[#0F2E58]"
          >
            <div className="p-4">
              <div
                className={`h-24 rounded-lg flex items-center px-6 gap-x-14 ${card.gradient}`}
              >
                <span className="text-white text-3xl md:text-4xl font-light mr-4">
                  {card.id}
                </span>
                <span className="text-white text-sm md:text-base font-bold tracking-wider uppercase">
                  {card.title}
                </span>
              </div>
            </div>

            <div className="bg-white flex-grow p-8 text-[#0F2E58] font-bold text-xl">
              {card.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoadmapCaards
