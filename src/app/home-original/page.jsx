import { ServicesShowcasePage } from "@/components/ServicesShowcasePage";
import { companyName } from "@/lib/seo";

export const metadata = {
  title: `الصفحة الرئيسية الأصلية | ${companyName}`,
  description: "النسخة الأصلية من صفحة خدمات التطوير الصناعي والاستشارات الخضراء."
};

export default function HomeOriginalPage() {
  return <ServicesShowcasePage />;
}
