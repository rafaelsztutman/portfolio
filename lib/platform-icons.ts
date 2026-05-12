import type { IconType } from "react-icons";
import {
  SiSubstack,
  SiMedium,
  SiHashnode,
  SiDevdotto,
  SiWordpress,
  SiGhost,
  SiHuggingface,
} from "react-icons/si";

const iconMap: Record<string, IconType> = {
  substack: SiSubstack,
  medium: SiMedium,
  hashnode: SiHashnode,
  "dev.to": SiDevdotto,
  devto: SiDevdotto,
  wordpress: SiWordpress,
  ghost: SiGhost,
  "hugging face": SiHuggingface,
  huggingface: SiHuggingface,
};

export function getPlatformIcon(label: string): IconType | null {
  return iconMap[label.toLowerCase()] ?? null;
}
