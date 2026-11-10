/** Menu do topo no desktop (rótulos curtos, como no protótipo). */
export const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Materiais", href: "#materiais" },
  { label: "Método", href: "#metodo" },
  { label: "Desafios", href: "#desafios" },
  { label: "Comunidade", href: "#comunidade" },
  { label: "Planos", href: "#planos" },
  { label: "Sobre", href: "#sobre" },
] as const;

/** Menu aberto no celular (rótulos completos, como no protótipo). */
export const mobileNavigation = [
  { label: "Início", href: "#inicio" },
  { label: "Materiais gratuitos", href: "#materiais" },
  { label: "Método", href: "#metodo" },
  { label: "Desafios", href: "#desafios" },
  { label: "Comunidade", href: "#comunidade" },
  { label: "Planos e pacotes", href: "#planos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Dúvidas", href: "#duvidas" },
  { label: "Contato", href: "#contato" },
] as const;

/** Coluna "Navegue" do rodapé. */
export const footerNavigation = [
  { label: "Materiais gratuitos", href: "#materiais" },
  { label: "Método", href: "#metodo" },
  { label: "Desafios", href: "#desafios" },
  { label: "Comunidade", href: "#comunidade" },
  { label: "Planos e pacotes", href: "#planos" },
  { label: "Sobre a Lingship", href: "#sobre" },
  { label: "Perguntas frequentes", href: "#duvidas" },
] as const;
