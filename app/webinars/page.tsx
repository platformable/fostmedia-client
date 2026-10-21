import FostWebinarBanner from "../components/Webinars/FostWebinarsHero"
import FostWebinarBannerBottom from "../components/Webinars/FostWebinarsHeroBottom"
import RoadmapCards from "../components/Webinars/Roadmap"
import ProofInTheMarket from "../components/Webinars/Proofinthemarket"
import SevenSystems from "../components/Webinars/sevenSystems"
import RegulationsMap from "../components/Webinars/RegulationsMap"
export default function page() {
  return (
    <div>
      <section className="webinars-hero-bg rounded-b-4xl py-10 ">
        <FostWebinarBanner />
      </section>
      <section>
        <RoadmapCards />
      </section>
      <section>
        <ProofInTheMarket />
      </section>
      <section>
        <SevenSystems />
      </section>
      <section>
        <RegulationsMap />
      </section>
      <section className="bg-[#0F2E58] rounded-b-4xl py-10 ">
        <FostWebinarBannerBottom />
      </section>
    </div>
  )
}
