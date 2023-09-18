import Link from "next/link"

const Header = () => {
  return (
    <div className="py-6 flex justify-between">
      <h2 className="text-primary text-2xl font-bold">POMOTIMER</h2>
      <div className="flex gap-2">
        <Link href={"https://github.com/Cha-Shao/target"}>
          <button className="w-8 h-8 border border-border rounded-md flex justify-center items-center hover:bg-primary hover:border-primary hover:text-light duration-100">
            <span className="icon-[ph--github-logo-bold] text-lg" />
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Header
