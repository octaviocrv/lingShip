/**
 * Classes da grade que o trilho do Carousel vira a partir de 640px (sm). O carrossel é só do
 * celular; do tablet em diante é a grade do desktop, sem rolagem. Tablet fica em 2 colunas e a
 * seção define as colunas do desktop, ex.: cn(GRID_LG, "lg:grid-cols-4").
 *
 * Fica fora de carousel.tsx de propósito: aquele arquivo é "use client", e uma string exportada
 * de um módulo de cliente chega às seções (componentes de servidor) como referência de cliente,
 * não como texto. A classe virava "function() { throw ... }" e a grade nunca era aplicada.
 */
export const GRID_LG = "sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:snap-none";
