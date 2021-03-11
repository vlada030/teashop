import React from 'react'
import { GiBarbedSun, GiBodyBalance, GiBallHeart, GiAlgae } from 'react-icons/gi'
import tea_1 from '../assets/tea-3.jpg'
import green from '../assets/zeleni.webp'
import black from '../assets/crni.jpg'
import white from '../assets/beli.jpg'

export const links = [
  {
    id: 1,
    text: 'početna',
    url: '/',
  },
  {
    id: 2,
    text: 'uvod',
    url: '/about',
  },
  {
    id: 3,
    text: 'proizvodi',
    url: '/products',
  },
]

export const benefits = [
  {
    id: 1,
    icon: <GiBallHeart />,
    title: 'zdravlje',
    text:
      'Čajevi značajno utiču na poboljšanje vašeg zdravlja. Oni nisu zamena za klasične lekove, ali imaju značajna lekovita svojstva. Pomažu srčanim bolesnicima, sportistima...',
  },
  {
    id: 2,
    icon: <GiBarbedSun />,
    title: 'lepota',
    text:
      'Prepuni su vitamina i aminokiselina. Koriste se u izradi kozmetičkih preparata, smanjuju upale i hidriraju kosu i kožu.Takođe smanjuju crvenilo na koži pa je čest sastojak krema.',
  },
  {
    id: 3,
    icon: <GiAlgae />,
    title: 'duh',
    text:
      'Sve vrste čajeva doprinose boljim i lepšim mislima. Deluju umirujuće na naše telo, smanjuju stres, ublažavaju umor i omogućavaju miran san.',
  },
  {
    id: 4,
    icon: <GiBodyBalance />,
    title: 'telo',
    text:
      'Tajni sastojak zelenog čaja pomoći će vam u mršavljenju. Nutricionisti preporučuju nekoliko šolja zelenog čaja dnevno.',
  },
]

export const about = [
  {
    id: 0,
    title: 'priča o čaju',
    img: tea_1,
    text: `Kinezi i Indijci se vekovima prepiru oko porekla čaja. Prema Kinezima, „pronalazač” čaja je imperator Šen Nung, kome je nekoliko listića ove biljke, donešeno vetrom, upalo u posudu sa ključalom vodom. Voda je, naravno, dobila izuzetan ukus, a imperator je svoje otkriće čaja velikodušno poklonio narodu. Indijci tvrde da se u Bengalu znalo za čaj vekovima ranije i da su listovi ove biljke stigli u Kinu zajedno sa budističkim monasima.

    Običaj pijenja čaja se proširio na Japan, širom zemalja južne Azije, u Rusiju, Evropu... danas se čaj pije svuda u svetu.

    Kod nas, kada vas neko pozove na čaj ili vas ponudi čajem, vi ne znate da li će pred vas biti iznesen zeleni čaj, crni čaj odnosno „čaj od čaja” ili će to biti čaj od kamilice, majčine dušice, nane ili možda „šumadijski čaj”. Svejedno, radi se o napicima lekovitim kako za telo tako i za dušu.`
  },
  {
    id: 1,
    title: 'zeleni čaj',
    img: green,
    text: `Sprema se od potpuno razvijenih vršnih listića biljke čaj, obično prva četiri na vrhu grane, koji se beru ručno. Da bi se dobio kvalitetan zeleni čaj, mora da se spreči fermentacija listova. Iz tog razloga, listovi se svega nekoliko sati nakon branja izlažu dejstvu vodene pare da bi zadržali elastičnost i karakterističnu zelenu boju; zatim se gnječe teškim valjcima da bi se razbile ćelijske membrane i oslobodio biljni sok, a potom se suše vrelim vazduhom, ili se peku u specijalnim posudama. 
    Ovim postupkom ne narušava se osnovna struktura aktivnih materija u listovima čaja, i dobija se napitak čaj koji ima jako antioksidantno dejstvo. Zeleni čaj je zelene boje, oporog ukusa, bez mirisa.`
  },
  {
    id: 2,
    title: 'crni čaj',
    img: black,
    text: `Posle branja i selekcije, listovi se ostave da svenu, uvijaju se, gnječe i fermentiraju tokom nekoliko sati. Zatim se suše u struji toplog vazduha, kada se formira konačna, crna boja čaja. Tokom procesa fermentacije deluju različiti enzimi i dolazi do promene boje, ukusa, mirisa, arome i sastojaka čaja. Formira se mala količina smolastog etarskog ulja koje daje izuzetnu aromu čaju. 
    Iako sve vrste crnih čajeva na tržištu vode poreklo od iste vrste, varijetet, sorta, geografsko poreklo i tehnologija fermentacije čaja, utiču na razlike u aromi kineskog, cejlonskog ili gruzijskog crnog čaja.`
  },
  {
    id: 3,
    title: 'beli čaj',
    img: white,
    text: `Ovaj čaj, od koga se dobija delikatni napitak svetlosmeđe boje koji je gotovo bez ukusa i mirisa, van granica Kine nije dovoljno poznat i retko se koristi. To su sasvim mladi listovi čaja koji su nežni i prekriveni gustim belim, gotovo srebrnkastim svilastim dlačicama. Usled toga, listići imaju beličastu ili srebrnkastu nijansu, pa se zato ovaj čaj i zove beli čaj. 
    Ima najjače antibakterijsko dejstvo među čajevima, jer su listići koji su tek u razvoju bogati različitim enzimima i drugim aktivnim hemijskim jedinjenjima.`
  },
]

// preko firebase
// jedino preko firebase vrsi filtriranje na serveru i vraca samo odredjeni podatak 
export const url = 'https://teashop-ddc14-default-rtdb.europe-west1.firebasedatabase.app';
