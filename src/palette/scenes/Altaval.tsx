import {AltavalHero} from '../../web-designs/landings/heroes'
import {LandingHero} from '../scene-kit/LandingHero'

export default function Altaval({accent}: {accent: boolean}) {
  return <LandingHero><AltavalHero accent={accent}/></LandingHero>
}
