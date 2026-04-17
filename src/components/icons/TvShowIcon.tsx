import type { SVGProps } from "react";

const TvShowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 10l4.553-2.069A1 1 0 0121 8.868V15.13a1 1 0 01-1.447.899L15 14M4 8h11a1 1 0 011 1v6a1 1 0 01-1 1H4a2 2 0 01-2-2v-4a2 2 0 012-2z"
    />
  </svg>
);

export default TvShowIcon;
