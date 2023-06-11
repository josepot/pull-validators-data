import { getSessionValidators } from "@/api"

import { getComissions } from "./getCommissions"
import { getClusterSizes } from "./getClusterSizes"
import { getEraPoints } from "./getPoints"
import { getSelfStake } from "./getSelfStake"
import { getVotes } from "./getVotes"

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
        commission: comissions[idx],
        avgEraPoints: points[idx],
        selfStake: selfStake[idx],
      },
    ]
  }),
)

console.log(result)
process.exit(0)
