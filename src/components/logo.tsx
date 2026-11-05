import Image from "next/image";
import logo from "../../public/images/autogrande-logo.png";

export function Logo({ className }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="AutoGrande"
      className={className}
      sizes="(min-width: 768px) 176px, 144px"
      quality={85}
      preload
    />
  );
}
