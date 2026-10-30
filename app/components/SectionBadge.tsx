export type SectionBadgeProps = {
  icon: string
  label: string
}

export const sectionBadge = ({ icon, label }: SectionBadgeProps) => (
  <div className="flex w-fit items-center gap-3 mb-4 default-tag-bg ">
    <div>
      <img src={icon} alt="big-stories-icon" width="18" />
    </div>
    <span className="text-sm uppercase text-white tracking-wider">{label}</span>
  </div>
)

export default sectionBadge
