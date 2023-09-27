import Link from "next/link"

const Footer = () => {
  return (
    <footer className="py-6 flex justify-center items-center gap-4">
      <Link href={"https://space.bilibili.com/23265721"} className="opacity-50 hover:opacity-100 duration-200">
        @ 2023 Cha_Shao
      </Link>
      <Link href={"https://github.com/Cha-Shao/target"} className="inline-flex items-center opacity-50 hover:opacity-100 duration-200">
        <i className="icon-[ph--github-logo-bold]" />
        Source Code
      </Link>
    </footer>
  )
}

export default Footer
