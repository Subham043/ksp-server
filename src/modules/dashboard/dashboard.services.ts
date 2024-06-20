import { count as countCriminal } from "../criminal/criminal.repository";
import { count as countCourt } from "../court/court.repository";
import { count as countJail } from "../jail/jail.repository";
import { count as countCrime } from "../crime/crime.repository";

export async function crimeCount(): Promise<number> {
  return await countCrime();
}
export async function criminalCount(): Promise<number> {
  return await countCriminal();
}
export async function courtCount(): Promise<number> {
  return await countCourt();
}
export async function jailCount(): Promise<number> {
  return await countJail();
}
