import { capitalize } from "lodash"

export const statusFormatter = (status: string):string => {
    return capitalize(status.replace("_"," "))
}