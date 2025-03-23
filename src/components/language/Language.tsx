import { FC } from "react"

const Language: FC = () => {
  return (<select
    title="lang"
    className="bg-white py-2 px-4 text-[#808080] rounded-lg border border-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#808080] focus:border-transparent"
  >
    <option>ES</option>
    <option>EN</option>
  </select>)
}
export default Language

