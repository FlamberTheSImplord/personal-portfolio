import {KilnHero} from '../../web-designs/landings/heroes'
import {LandingHero} from '../scene-kit/LandingHero'

export default function Kiln({accent}: {accent: boolean}) {
  return <LandingHero><KilnHero accent={accent}/></LandingHero>
}
