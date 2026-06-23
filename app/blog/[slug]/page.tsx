import BackToBlogBtn from "@/app/components/BackToBlogBtn"
import BackToBlogFooter from "@/app/components/BackToBlogFooter"
import LatestArticles from "@/app/components/LatestArticles"
import Tag from "@/app/components/Tag"
import Image from "next/image"
import Link from "next/link"

export default async function page({ params }: { params: { slug: string } }) {
  const { slug } = await params

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-10">
      <Tag text={slug} />
      <h1 className="text-white text-base leading-10 my-5">
        FOST launches a New Era for Conference Intelligence and Knowledge
        Discovery
      </h1>
      <div className="relative h-64 w-full overflow-hidden rounded-2xl md:h-80 mt-10 mb-3">
        <Image
          src={"https://dummyimage.com/1920x1080/fff"}
          alt={slug}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <p className=" text-[#BCBCBC]">Mark Boyd - 8 min read</p>

      <section className="grid grid-cols-1 md:grid-cols-[8fr_4fr] gap-8 mt-5">
        <div className="text-white border-r border-[#30323B] p-4">
          <BackToBlogBtn />

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni ea
            fugiat aut, voluptatibus cupiditate minus exercitationem earum
            mollitia similique, ex inventore non corrupti officia quo repellat
            repudiandae rem laborum incidunt. Reiciendis incidunt explicabo
            laboriosam ratione saepe perferendis facere magnam! Reiciendis
            exercitationem ea nulla non sapiente enim fugiat dignissimos
            voluptatem laborum reprehenderit, quia, ipsum animi. Nisi recusandae
            est odio? Rerum quidem veritatis architecto aliquam, voluptatum
            molestias quae corrupti id libero numquam enim repellat minima, vero
            laborum atque dicta aliquid ab quas accusantium quaerat labore
            reprehenderit quod iure voluptatem. Deserunt facilis ad assumenda, a
            beatae, magnam id voluptatibus aut nobis sequi esse dolor cum
            consectetur voluptate culpa consequatur totam necessitatibus harum
            voluptas quos fugiat quaerat dicta ab et? Reprehenderit esse omnis
            pariatur.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni ea
            fugiat aut, voluptatibus cupiditate minus exercitationem earum
            mollitia similique, ex inventore non corrupti officia quo repellat
            repudiandae rem laborum incidunt. Reiciendis incidunt explicabo
            laboriosam ratione saepe perferendis facere magnam! Reiciendis
            exercitationem ea nulla non sapiente enim fugiat dignissimos
            voluptatem laborum reprehenderit, quia, ipsum animi. Nisi recusandae
            est odio? Rerum quidem veritatis architecto aliquam, voluptatum
            molestias quae corrupti id libero numquam enim repellat minima, vero
            laborum atque dicta aliquid ab quas accusantium quaerat labore
            reprehenderit quod iure voluptatem. Deserunt facilis ad assumenda, a
            beatae, magnam id voluptatibus aut nobis sequi esse dolor cum
            consectetur voluptate culpa consequatur totam necessitatibus harum
            voluptas quos fugiat quaerat dicta ab et? Reprehenderit esse omnis
            pariatur.
          </p>

          <BackToBlogFooter />
        </div>
        <aside>
          <div className="flex items-center gap-2">
            <img src="/file.svg" width={20} height={20} alt="File Icon" />
            <h6 className="main-color uppercase">On this page</h6>
          </div>
          <LatestArticles description={false} textSize="LARGE" />
        </aside>
      </section>
    </div>
  )
}
