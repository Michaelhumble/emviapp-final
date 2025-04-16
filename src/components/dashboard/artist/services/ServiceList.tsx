
import React from "react";
import ServiceCard from "./ServiceCard";
import { Service } from "./ServicesManager";

interface ServiceListProps {
  services: Service[];
  onEditService: (service: Service) => void;
  onDeleteService: (id: string) => void;
}

const ServiceList = ({ services, onEditService, onDeleteService }: ServiceListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onEdit={() => onEditService(service)}
          onDelete={() => onDeleteService(service.id)}
        />
      ))}
    </div>
  );
};

export default ServiceList;
