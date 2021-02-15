import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import tea_1 from '../assets/tea-1.jpg'
import green from '../assets/zeleni.webp'
import black from '../assets/crni.jpg'
import white from '../assets/beli.jpg'

const AboutPage = () => {
  return <main>
          <PageHero title='uvod' />
          <Wrapper className='section section-center'>
            <img src={tea_1} alt='tea-1' />
            <article>
              <div className='title'>
                <h3>priča o čaju</h3>
                <div className='underline'></div>
              </div>
              <p>Kinezi i Indijci se vekovima prepiru oko porekla čaja. Prema Kinezima, „pronalazač” čaja je imperator Šen Nung, kome je nekoliko listića ove biljke, donešeno vetrom, upalo u posudu sa ključalom vodom. Voda je, naravno, dobila izuzetan ukus, a imperator je svoje otkriće čaja velikodušno poklonio narodu. Indijci tvrde da se u Bengalu znalo za čaj vekovima ranije i da su listovi ove biljke stigli u Kinu zajedno sa budističkim monasima.</p>
              <p>Običaj pijenja čaja se proširio na Japan, širom zemalja južne Azije, u Rusiju, Evropu... danas se čaj pije svuda u svetu.</p>
              <p>Kod nas, kada vas neko pozove na čaj ili vas ponudi čajem, vi ne znate da li će pred vas biti iznesen zeleni čaj, crni čaj odnosno „čaj od čaja” ili će to biti čaj od kamilice, majčine dušice, nane ili možda „šumadijski čaj”. Svejedno, radi se o napicima lekovitim kako za telo tako i za dušu.</p>
            </article>
          </Wrapper>
          <Wrapper className='section section-center page'>
            <img src={green} alt='zeleni' />
            <article>
              <div className='title'>
                <h4>zeleni čaj</h4>
                <div className='underline'></div>
              </div>
        
              <p>Sprema se od potpuno razvijenih vršnih listića biljke čaj, obično prva četiri na vrhu grane, koji se beru ručno. Da bi se dobio kvalitetan zeleni čaj, mora da se spreči fermentacija listova. Iz tog razloga, listovi se svega nekoliko sati nakon branja izlažu dejstvu vodene pare da bi zadržali elastičnost i karakterističnu zelenu boju; zatim se gnječe teškim valjcima da bi se razbile ćelijske membrane i oslobodio biljni sok, a potom se suše vrelim vazduhom, ili se peku u specijalnim posudama. Ovim postupkom ne narušava se osnovna struktura aktivnih materija u listovima čaja, i dobija se napitak čaj koji ima jako antioksidantno dejstvo. Zeleni čaj je zelene boje, oporog ukusa, bez mirisa.</p>
            </article>
          </Wrapper>
          <Wrapper className='section section-center page'>
            <img src={black} alt='crni' />
            <article>
              <div className='title'>
                <h4>crni čaj</h4>
                <div className='underline'></div>
              </div>

              <p>Posle branja i selekcije, listovi se ostave da svenu, uvijaju se, gnječe i fermentiraju tokom nekoliko sati. Zatim se suše u struji toplog vazduha, kada se formira konačna, crna boja čaja. Tokom procesa fermentacije deluju različiti enzimi i dolazi do promene boje, ukusa, mirisa, arome i sastojaka čaja. Formira se mala količina smolastog etarskog ulja koje daje izuzetnu aromu čaju. Iako sve vrste crnih čajeva na tržištu vode poreklo od iste vrste, varijetet, sorta, geografsko poreklo i tehnologija fermentacije čaja, utiču na razlike u aromi kineskog, cejlonskog ili gruzijskog crnog čaja.</p>
            </article>
          </Wrapper>
          <Wrapper className='section section-center page'>
            <img src={white} alt='beli' />
            <article>
              <div className='title'>
                <h4>beli čaj</h4>
                <div className='underline'></div>
              </div>

              <p>Ovaj čaj, od koga se dobija delikatni napitak svetlosmeđe boje koji je gotovo bez ukusa i mirisa, van granica Kine nije dovoljno poznat i retko se koristi. To su sasvim mladi listovi čaja koji su nežni i prekriveni gustim belim, gotovo srebrnkastim svilastim dlačicama. Usled toga, listići imaju beličastu ili srebrnkastu nijansu, pa se zato ovaj čaj i zove beli čaj. Ima najjače antibakterijsko dejstvo među čajevima, jer su listići koji su tek u razvoju bogati različitim enzimima i drugim aktivnim hemijskim jedinjenjima.</p>
            </article>
          </Wrapper>
        </main>
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
