import Settings from "./Settings"

const Header = () => {
  return (
    <header className="py-6 flex justify-between">
      <h2 className="text-primary text-2xl font-bold">POMOTIMER</h2>
      <div className="flex gap-2">
        <Settings />
      </div>
    </header>
  )
}

export default Header
