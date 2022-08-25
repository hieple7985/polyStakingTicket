import { createContext, useContext } from "react"
export type GlobalExit = {
  isExit: boolean
  setExit: React.Dispatch<React.SetStateAction<boolean>>
}

export const Exit = createContext<GlobalExit>({
  isExit: false, // set a default value
  setExit: () => {return false},
})
export const useGlobalExit = () => useContext(Exit)