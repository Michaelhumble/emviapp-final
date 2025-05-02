
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const MissingPieceSection = () => {
  const { t, isVietnamese } = useTranslation();

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-24 text-center">
      <Container>
        <h2 className="text-4xl font-serif font-bold mb-6">
          {t("Find Your Missing Piece", "Tìm Thấy Mảnh Ghép Còn Thiếu")}
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          {t(
            "Connect with salons and artists that match your unique style and vision. Your perfect beauty experience awaits.",
            "Kết nối với các salon và nghệ sĩ phù hợp với phong cách và tầm nhìn độc đáo của bạn. Trải nghiệm làm đẹp hoàn hảo đang chờ đợi bạn."
          )}
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Button size="lg" className="px-8">
            {t("Browse Salons", "Duyệt Qua Salon")}
          </Button>
          <Button size="lg" variant="outline" className="px-8">
            {t("Find Artists", "Tìm Nghệ Sĩ")}
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default MissingPieceSection;
