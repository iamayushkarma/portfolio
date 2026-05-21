export interface Project {
  id: number;
  num: string;
  title: string;
  subtitle: string;
  tags: {
    label: string;
    variant: "dark" | "yellow" | "green" | "blue" | "cream" | "building";
  }[];
  stats?: {
    label: string;
    value: string;
    color: "blue" | "yellow" | "green" | "dark";
  }[];
  pills: string[];
  desc?: string;
  links: {
    label: string;
    href: string;
    variant: "dark" | "yellow" | "green" | "blue";
    ghost?: boolean;
  }[];
}
