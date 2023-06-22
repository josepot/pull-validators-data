import { getSessionValidators } from "./chain"
import { getComissions } from "./getCommissions"
import { getClusterSizes } from "./getClusterSizes"
import { getEraPoints } from "./getPoints"
import { getSelfStake } from "./getSelfStake"
import { getVotes } from "./getVotes"
import { writeFile } from "fs/promises"
import { fileURLToPath } from "url"
import path from "path"

const validators = (await getSessionValidators())!

const [comissions, clusterSizes, points, votes, selfStake] = await Promise.all([
  getComissions(validators),
  getClusterSizes(validators),
  getEraPoints(validators),
  getVotes(validators),
  getSelfStake(validators),
])

const result = Object.fromEntries(
  validators.map((v, idx) => {
    return [
      v,
      {
        votes: votes[idx],
        clusterSize: clusterSizes[idx],
        commission: comissions[idx]!,
        avgEraPoints: points[idx],
        selfStake: selfStake[idx]!,
      },
    ]
  }),
)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log(result)
console.log(__dirname)

await writeFile(path.join(__dirname, "result.json"), JSON.stringify(result), {
  encoding: "utf8",
})

process.exit(0)
