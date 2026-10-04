import React from 'react';
import TvEmulator from '@/components/TvEmulator';

export interface RandomArticle {
  id: number;
  date: string;
  title: string;
  iframe?: React.ReactNode;
  image?: string;
  imagesCount: number;
  content: React.ReactNode;
}

export const randomArticles: RandomArticle[] = [
  {
    id: 0,
    date: "20/09/2026",
    title: "Interactive iPod",
    iframe: (
      <div id="ipod-placeholder" style={{ width: "340px", height: "560px", marginTop: "-80px", opacity: 0 }}></div>
    ),
    imagesCount: 0,
    content: (
      <>
        <p style={{ marginBottom: "15px" }}>
          Widget de iPod interativo, desenvolvido usando React e animações Framer Motion.
        </p>
        <p>
          Permite explorar a interface icónica, selecionar músicas e interagir com o dispositivo de forma autêntica.
        </p>
      </>
    )
  },
  {
    id: 0.5,
    date: "A desenvolver",
    title: "Web PSX Player",
    iframe: (
      <div style={{ marginTop: "-40px" }}>
        <TvEmulator />
      </div>
    ),
    imagesCount: 0,
    content: (
      <>
        <p style={{ marginBottom: "15px" }}>
          Integração de um motor de emulação PS1 diretamente no browser utilizando WebAssembly e React.
        </p>
        <p>
          Permitirá aos utilizadores correrem os seus próprios jogos localmente com alta performance, mapeamento de controlos e sem necessidade de instalações ou servidores.
        </p>
      </>
    )
  },
  {
    id: 1,
    date: "09/11/2026",
    title: "Supreme Seoul - Seongsu",
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="350"><rect width="100%" height="100%" fill="%23d8d8d8"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="20" fill="%23666">Retângulo (Horizontal)</text></svg>',
    imagesCount: 7,
    content: (
      <>
        <p style={{ marginBottom: "15px" }}>
          On Saturday September 12th, Supreme will open its newest location in Seoul.
        </p>
        <p style={{ marginBottom: "15px" }}>The store is located at:</p>
        <p style={{ fontWeight: "bold" }}>22 Seongsui-ro 7-gil</p>
        <p style={{ fontWeight: "bold" }}>Seongdong-gu, Seoul 04781</p>
        <p style={{ fontWeight: "bold" }}>Tel: +82-02-2088-4846</p>
        <p style={{ fontWeight: "bold" }}>11 - 8 Monday - Sunday</p>
      </>
    )
  },
  {
    id: 2,
    date: "09/07/2026",
    title: "Supreme/A.PRESSE",
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="500"><rect width="100%" height="100%" fill="%23e8e8e8"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="16" fill="%23666">Vertical</text></svg>',
    imagesCount: 64,
    content: (
      <>
        <p style={{ marginBottom: "15px" }}>
          A.PRESSE is a Japanese clothing brand founded by Kazuma Shigematsu in 2021. A.PRESSE draws inspiration from classic workwear, military and tailored pieces - reinterpreting these heritage styles with exceptional quality and precise detail. A.PRESSE is highly regarded for its dedication to meticulous craftsmanship, particularly its custom developed fabrics and vintage finishing techniques.
        </p>
        <p>
          Supreme has worked with A.PRESSE on a new collection for Fall 2026. The collection consists of a Leather Jacket in both calfskin and cowhide.
        </p>
      </>
    )
  },
  {
    id: 3,
    date: "08/31/2026",
    title: "Supreme/Larry Clark",
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="%23cccccc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="20" fill="%23666">Quadrado</text></svg>',
    imagesCount: 46,
    content: (
      <>
        <p style={{ marginBottom: "15px" }}>
          Larry Clark is an American photographer and film director who was born in Tulsa, Oklahoma in 1943. Between 1962 and 1971, Clark photographed his friends in their most private moments. Clark made the pictures as a participant rather than a detached observer, and in so doing, pioneered a raw, deeply personal approach to documentary photography.
        </p>
        <p>
          The resulting book, <em>Tulsa</em>, is considered one of the most influential and important collections of American photography.
        </p>
      </>
    )
  },
  {
    id: 99,
    date: "Amanhã",
    title: "Teste do CMS Random",
    image: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect width="100%" height="100%" fill="%23a8ffb2"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="monospace" font-size="20" fill="%23000">Sucesso!</text></svg>',
    imagesCount: 1,
    content: (
      <>
        <p style={{ marginBottom: "15px" }}>
          Se consegues ler isto no teu ecrã, significa que o sistema dinâmico está a funcionar na perfeição!
        </p>
        <p>
          Tudo foi injetado através de um objeto no ficheiro data/random.tsx. Simples, rápido e à prova de bala.
        </p>
      </>
    )
  }
];
