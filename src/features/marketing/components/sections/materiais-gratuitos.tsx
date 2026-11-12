import { Carousel } from "@/components/ui/carousel";
import { GRID_LG } from "@/components/ui/carousel-grid";
import { cn } from "@/lib/cn";
import { ActionButton, Container, SectionHeading } from "@/components/ui/primitives";
import { materiais, materiaisSection } from "@/features/marketing/content/materiais";
import { MaterialCard } from "./material-card";

export function MateriaisGratuitos() {
  return (
    <section id="materiais" className="py-14 sm:py-24 lg:py-28">
      <Container>
        <SectionHeading
          eyebrow={materiaisSection.eyebrow}
          title={materiaisSection.title}
          description={materiaisSection.description}
        />

        <Carousel
          label="Materiais gratuitos"
          className="mt-10 lg:mt-14"
          trackClassName={cn(GRID_LG, "lg:grid-cols-3")}
        >
          {materiais.map((material) => (
            <MaterialCard key={material.id} material={material} />
          ))}
        </Carousel>

        <div
          data-reveal
          className="glass mt-10 flex flex-col gap-5 rounded-[1.5rem] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8"
        >
          <p className="text-[0.92rem] leading-relaxed text-muted">{materiaisSection.newsletter.text}</p>
          <ActionButton className="shrink-0">{materiaisSection.newsletter.cta}</ActionButton>
        </div>
      </Container>
    </section>
  );
}
