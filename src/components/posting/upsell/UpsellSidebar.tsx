import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface UpsellSidebarProps {
  /* Add any props here */
}

const UpsellSidebar = ({ /* props */ }: UpsellSidebarProps) => {
  const { t } = useTranslation();
  
  return (
    <aside>
      <h3>{t({
        english: "Premium Features",
        vietnamese: "Tính năng cao cấp"
      })}</h3>
      
      <p>{t({
        english: "Stand out from the crowd",
        vietnamese: "Nổi bật trong đám đông"
      })}</p>
      
      {/* Add any components or content here */}
    </aside>
  );
};

export default UpsellSidebar;
