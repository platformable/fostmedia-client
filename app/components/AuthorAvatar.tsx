type AuthorAvatarProps = {
  url?: string | null
  name?: string | null
  lastname?: string | null
}

export default function AuthorAvatar({
  url,
  name,
  lastname,
}: AuthorAvatarProps) {
  if (url) {
    return (
      <img
        src={url}
        alt=""
        className="rounded-full border border-[#40D2FF] h-14 w-14 object-cover"
      />
    )
  }
  const initials = `${name?.trim()?.[0] ?? ""}${lastname?.trim()?.[0] ?? ""}`
  return (
    <div
      aria-hidden="true"
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-(--main-orange) text-xl font-semibold uppercase text-white"
    >
      {initials || "A"}
    </div>
  )
}
