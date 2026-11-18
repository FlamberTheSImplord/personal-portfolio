import {MerrowHero} from '../../web-designs/landings/heroes'
import {LandingHero} from '../scene-kit/LandingHero'

export default function Merrow({accent}: {accent: boolean}) {
  return <LandingHero><MerrowHero accent={accent}/></LandingHero>
}
