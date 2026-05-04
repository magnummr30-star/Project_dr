import { ServicesShowcasePage } from "@/components/ServicesShowcasePage";
import { companyName } from "@/lib/seo";

export const metadata = {
  title: `استشارات وتأسيس المشاريع | ${companyName}`,
  description:
    "حلول استشارية واستثمارية لتأسيس المشاريع ودراسات الجدوى والتمويل والتراخيص والاستشارات الهندسية والصناعية."
};

export default function HomeNewPage() {
  return <ServicesShowcasePage showParallelAdditions />;
}
