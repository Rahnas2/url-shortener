
import { nanoid } from "nanoid"
export async function generateShortCode() {
    return nanoid(6)
}