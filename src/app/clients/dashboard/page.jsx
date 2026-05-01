import { ClientDashboardPage } from "@/components/ClientDashboardPage";

export const metadata = {
  title: "لوحة العملاء",
  description: "لوحة تحكم العملاء لمتابعة حالة المشروع والمستندات والرسائل."
};

export default function DashboardPage() {
  return <ClientDashboardPage />;
}
